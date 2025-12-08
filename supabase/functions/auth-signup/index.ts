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
        const { email, password, full_name, redirectTo } = await req.json()

        if (!email || !password) {
            throw new Error('Email and password are required')
        }

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Create User
        const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: false,
            user_metadata: { full_name }
        })

        if (createError) {
            // If user already exists, we might want to check or throw
            console.error('Create User Error:', createError)
            throw createError
        }

        // 2. Generate Confirmation Link
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'signup', // or 'email_change_current' etc, but 'signup' verifies the user
            email: email,
            password: password, // Sometimes needed to ensure auth matches? 
            // Actually 'signup' type in generateLink creates a confirmation link. 
            options: {
                redirectTo: redirectTo || `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.supabase.co/auth/v1/callback')}`
            }
        })

        if (linkError) {
            console.error('Generate Link Error:', linkError)
            throw new Error('Failed to generate confirmation link')
        }

        const actionLink = linkData.properties?.action_link

        if (!actionLink) {
            throw new Error('No action link returned')
        }

        // 3. Send Email using Resend
        const resendApiKey = Deno.env.get('RESEND_API_KEY')

        if (!resendApiKey) {
            console.error('RESEND_API_KEY not set')
            // Don't fail the signup, just return success but warn? 
            // Or fail? Better fail so dev knows.
            throw new Error('Resend API Key not configured')
        }

        const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
                from: 'Exsola Team <onboarding@resend.dev>',
                to: [email],
                subject: 'Welcome to Exsola! Please verify your email.',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #166534;">Welcome to Exsola!</h1>
                        <p>Hi ${full_name || 'there'},</p>
                        <p>Thanks for signing up. Please verify your email address to get started.</p>
                        
                        <div style="margin: 30px 0;">
                            <a href="${actionLink}" style="background-color: #166534; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email</a>
                        </div>
                        
                        <p>If you didn't create an account, you can safely ignore this email.</p>
                        
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
            JSON.stringify({ success: true, message: 'User created and verification email sent' }),
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
