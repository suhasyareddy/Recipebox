-- ==============================================================================
-- RecipeBox: Supabase Permissions & RLS Fix Script
-- Run this in your Supabase Dashboard > SQL Editor
-- ==============================================================================

-- 1. Grant schema usage and table privileges to anon and authenticated roles
-- (RLS policies will safely govern row-level read/write permissions)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.recipes TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.favourites TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 2. Ensure Row Level Security (RLS) is active
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favourites ENABLE ROW LEVEL SECURITY;

-- 3. Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 4. Recipes Policies
DROP POLICY IF EXISTS "Recipes are viewable by everyone." ON public.recipes;
CREATE POLICY "Recipes are viewable by everyone." 
  ON public.recipes FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create recipes." ON public.recipes;
CREATE POLICY "Authenticated users can create recipes." 
  ON public.recipes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own recipes." ON public.recipes;
CREATE POLICY "Users can update their own recipes." 
  ON public.recipes FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own recipes." ON public.recipes;
CREATE POLICY "Users can delete their own recipes." 
  ON public.recipes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- 5. Favourites Policies
DROP POLICY IF EXISTS "Users can view their own favourites." ON public.favourites;
CREATE POLICY "Users can view their own favourites." 
  ON public.favourites FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can add favourites." ON public.favourites;
CREATE POLICY "Users can add favourites." 
  ON public.favourites FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their favourites." ON public.favourites;
CREATE POLICY "Users can remove their favourites." 
  ON public.favourites FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- 6. Storage Bucket Permissions for 'recipe-images'
-- Make sure the bucket exists and is public:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('recipe-images', 'recipe-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public can view recipe images" ON storage.objects;
CREATE POLICY "Public can view recipe images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'recipe-images');

DROP POLICY IF EXISTS "Authenticated users can upload recipe images" ON storage.objects;
CREATE POLICY "Authenticated users can upload recipe images" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'recipe-images');
