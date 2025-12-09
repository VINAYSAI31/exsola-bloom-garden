
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { amount, currency, receipt } = await req.json()

        // These should be set in your Supabase Project Settings -> Edge Functions -> Secrets
        const keyId = Deno.env.get('RAZORPAY_KEY_ID')
        const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

        if (!keyId || !keySecret) {
            console.error("Razorpay keys not found in environment variables")
            throw new Error('Server configuration error: Razorpay keys missing')
        }

        const auth = btoa(`${keyId}:${keySecret}`)

        // Create Razorpay Order
        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: Math.round(amount), // Ensure integer
                currency: currency || 'INR',
                receipt: receipt,
                payment_capture: 1
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.error("Razorpay API Error:", data)
            throw new Error(data.error?.description || 'Failed to create Razorpay order')
        }

        return new Response(
            JSON.stringify(data),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error: any) {
        console.error("Error creating order:", error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
