-- ==============================================================================
-- Run this in Supabase Dashboard > SQL Editor:
-- 1. Fixes Storage bucket policies so uploads never fail
-- 2. Fixes Profiles RLS policies
-- ==============================================================================

-- 1. Ensure 'recipe-images' bucket is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('recipe-images', 'recipe-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Policies for recipe-images
DROP POLICY IF EXISTS "Public View recipe-images" ON storage.objects;
CREATE POLICY "Public View recipe-images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'recipe-images');

DROP POLICY IF EXISTS "Allow uploads to recipe-images" ON storage.objects;
CREATE POLICY "Allow uploads to recipe-images" 
  ON storage.objects FOR INSERT 
  TO public
  WITH CHECK (bucket_id = 'recipe-images');

DROP POLICY IF EXISTS "Allow updates to recipe-images" ON storage.objects;
CREATE POLICY "Allow updates to recipe-images" 
  ON storage.objects FOR UPDATE 
  TO public
  USING (bucket_id = 'recipe-images');

-- 3. Profiles Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." 
  ON public.profiles FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. Reload Schema
NOTIFY pgrst, 'reload schema';
