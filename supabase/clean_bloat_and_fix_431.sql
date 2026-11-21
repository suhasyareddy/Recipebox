-- ==============================================================================
-- CLEAN BLOAT & RESOLVE HTTP 431
-- Run this in your Supabase Project -> SQL Editor -> Run
-- ==============================================================================

-- 1. Reset oversized base64 avatar in public.profiles to a clean hosted image URL
UPDATE public.profiles
SET avatar_url = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
WHERE avatar_url LIKE 'data:%' OR LENGTH(avatar_url) > 2000;

-- 2. Strip the 131KB base64 avatar from auth.users metadata
-- This permanently shrinks the user JWT session token down from 131KB to ~1KB!
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data - 'avatar_url'
WHERE raw_user_meta_data->>'avatar_url' LIKE 'data:%' 
   OR LENGTH(raw_user_meta_data->>'avatar_url') > 2000;

-- 3. Confirm permissions for authenticated and anon roles
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.recipes TO authenticated;
GRANT ALL ON TABLE public.recipes TO anon;
GRANT ALL ON TABLE public.favourites TO authenticated;
GRANT ALL ON TABLE public.favourites TO anon;

SELECT id, email, full_name, LENGTH(avatar_url) as avatar_length FROM public.profiles;
