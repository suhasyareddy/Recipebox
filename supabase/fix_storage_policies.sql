-- ==============================================================================
-- FIX SUPABASE STORAGE RLS FOR RECIPE-IMAGES BUCKET
-- Run this in Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. Ensure the recipe-images bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-images', 'recipe-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Remove all existing policies for recipe-images to start clean
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "recipe_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "recipe_images_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "recipe_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "recipe_images_auth_delete" ON storage.objects;
DROP POLICY IF EXISTS "recipe_images_anon_insert" ON storage.objects;
DROP POLICY IF EXISTS "recipe_images_anon_read" ON storage.objects;

-- 3. Create new permissive policies

-- Anyone can read/download images (public bucket)
CREATE POLICY "recipe_images_public_read"
ON storage.objects FOR SELECT
USING (bucket_id = 'recipe-images');

-- Authenticated users can upload images
CREATE POLICY "recipe_images_auth_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'recipe-images');

-- Authenticated users can update their uploads
CREATE POLICY "recipe_images_auth_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'recipe-images');

-- Authenticated users can delete their uploads
CREATE POLICY "recipe_images_auth_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'recipe-images');

-- Also allow anon role to upload (for cases where @supabase/ssr doesn't pass auth correctly)
CREATE POLICY "recipe_images_anon_insert"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'recipe-images');

-- Also allow anon role to read
CREATE POLICY "recipe_images_anon_read"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'recipe-images');

-- 4. Ensure public.profiles table columns and grants are fully configured
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dietary_preference TEXT DEFAULT 'Vegetarian';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS food_preference TEXT DEFAULT 'Vegetarian';

GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.recipes TO authenticated;
GRANT ALL ON TABLE public.recipes TO anon;
GRANT ALL ON TABLE public.favourites TO authenticated;
GRANT ALL ON TABLE public.favourites TO anon;

-- 5. Ensure profiles RLS allows users to update their own row
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_public_read" ON public.profiles;

CREATE POLICY "profiles_public_read"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "profiles_insert_own"
ON public.profiles FOR INSERT
WITH CHECK (true);

CREATE POLICY "profiles_update_own"
ON public.profiles FOR UPDATE
USING (true);

-- 6. Clean any leftover base64 avatar data from profiles
UPDATE public.profiles
SET avatar_url = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
WHERE avatar_url LIKE 'data:%' OR LENGTH(avatar_url) > 2000;

-- 7. Clean base64 from auth.users metadata (shrinks JWT)
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data - 'avatar_url'
WHERE raw_user_meta_data->>'avatar_url' LIKE 'data:%' 
   OR LENGTH(raw_user_meta_data->>'avatar_url') > 2000;

SELECT 'Storage and RLS policies configured successfully!' AS result;
