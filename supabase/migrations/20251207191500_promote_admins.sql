-- Promote users to admin (Run this AFTER creating the accounts)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email IN ('admin2@gmail.com', 'admin3@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;
