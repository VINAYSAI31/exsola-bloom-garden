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
        const { email, redirectTo } = await req.json()

        if (!email) {
            throw new Error('Email is required')
        }

        // Initialize Supabase Admin Client
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Generate Recovery Link using Admin API
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'recovery',
            email: email,
            options: {
                redirectTo: redirectTo || `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.supabase.co/auth/v1/callback')}` // Default fallback or strictly follow passed redirect
            }
        })

        if (linkError) {
            console.error('Generate Link Error:', linkError)
            throw new Error('Failed to generate reset link')
        }

        const actionLink = linkData.properties?.action_link

        if (!actionLink) {
            throw new Error('No action link returned')
        }

        // Send Email using Resend
        const resendApiKey = Deno.env.get('RESEND_API_KEY')

        if (!resendApiKey) {
            throw new Error('Resend API Key not configured')
        }

        const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
                from: 'Exsola Support <onboarding@resend.dev>',
                to: [email],
                subject: 'Reset Your Exsola Password',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #166534;">Password Reset Request</h1>
                        <p>Hello,</p>
                        <p>We received a request to reset the password for your Exsola account associated with ${email}.</p>
                        
                        <div style="margin: 30px 0;">
                            <a href="${actionLink}" style="background-color: #166534; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
                        </div>
                        
                        <p>If you didn't request this change, you can safely ignore this email.</p>
                        <p>This link will expire in 24 hours.</p>
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">Exsola Team</p>
                    </div>
                `
            })
        })

        if (!emailRes.ok) {
            const errorText = await emailRes.text()
            console.error('Resend API Error:', errorText)
            throw new Error(`Failed to send email: ${errorText}`)
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Password reset email sent' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error('Error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
