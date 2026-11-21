-- ==============================================================================
-- Run this in your Supabase Dashboard > SQL Editor:
-- 1. Instantly confirms your email so you don't need verification emails
-- 2. Unblocks any rate-limited signups immediately
-- ==============================================================================

-- Auto-confirm all unconfirmed users (including suhasyareddy8a80105@gmail.com):
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW() 
WHERE email_confirmed_at IS NULL;

-- Also verify that the profiles table has a row for all auth users:
INSERT INTO public.profiles (id, full_name, avatar_url)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
  COALESCE(raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80')
FROM auth.users
ON CONFLICT (id) DO NOTHING;
