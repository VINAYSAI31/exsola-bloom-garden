import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { order_id, payment_id, payment_method } = await req.json()

        // 1. Verify Payment (if online)
        let paymentStatus = 'pending_payment';

        if (payment_method === 'cod') {
            paymentStatus = 'pending'; // Or whatever status means "Confirmed but not paid"
            // Skip Razorpay check
        } else if (payment_id) {
            const keyId = Deno.env.get('RAZORPAY_KEY_ID')
            const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

            if (!keyId || !keySecret) {
                console.error('Razorpay keys missing in Edge Function secrets')
                throw new Error('Server configuration error')
            }

            const auth = btoa(`${keyId}:${keySecret}`)
            const rzpResponse = await fetch(`https://api.razorpay.com/v1/payments/${payment_id}`, {
                headers: {
                    'Authorization': `Basic ${auth}`
                }
            })

            if (!rzpResponse.ok) {
                console.error('Razorpay API Error:', await rzpResponse.text())
                throw new Error('Failed to verify payment with Razorpay')
            }

            const paymentData = await rzpResponse.json()

            if (paymentData.status !== 'captured' && paymentData.status !== 'authorized') {
                throw new Error(`Invalid payment status: ${paymentData.status}`)
            }
            paymentStatus = 'paid';
        } else {
            // No payment method specified or invalid state
            throw new Error('Invalid payment information')
        }


        // 2. Initialize Supabase Client (Admin context to update orders securely)
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 3. Update Order Status
        const { data: order, error: updateError } = await supabaseAdmin
            .from('orders')
            .update({
                status: paymentStatus,
                payment_id: payment_id || null
            })
            .eq('id', order_id)
            .select('*, profiles(email, full_name), order_items(*, products(*))')
            .single()

        if (updateError) {
            console.error('Database Update Error:', updateError)
            throw new Error('Failed to update order status')
        }

        // 4. Send Confirmation Email (Resend)
        const resendApiKey = Deno.env.get('RESEND_API_KEY')
        if (resendApiKey) {
            const emailRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`
                },
                body: JSON.stringify({
                    from: 'Exsola Orders <onboarding@resend.dev>', // Use verified domain in prod
                    to: [order.profiles.email],
                    subject: `Order Confirmation #${order_id.slice(0, 8)}`,
                    html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #166534;">Order Confirmed!</h1>
                        <p>Hi ${order.profiles.full_name},</p>
                        <p>Thank you for your purchase. ${paymentStatus === 'paid' ? `We have received your payment of <strong>$${order.total}</strong>.` : `Your order has been placed successfully.`}</p>
                        
                        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0;">Order Details:</h3>
                            <ul style="padding-left: 20px;">
                                ${order.order_items.map((item: any) => `
                                    <li style="margin-bottom: 10px;">
                                        ${item.products.name} (x${item.quantity}) - $${item.price}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <p>We will ship your items shortly!</p>
                        <p style="color: #6b7280; font-size: 14px;">Order ID: ${order_id}</p>
                    </div>
                `
                })
            })

            if (!emailRes.ok) {
                console.error('Failed to send email:', await emailRes.text())
            }
        } else {
            console.log('Skipping email: RESEND_API_KEY not set')
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Order processed successfully' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error('Edge Function Error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
