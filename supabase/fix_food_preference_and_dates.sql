-- ==============================================================================
-- RecipeBox Migration: Food Preference, Avatar & Storage Setup
-- Run this script in your Supabase Dashboard > SQL Editor > Run
-- ==============================================================================

-- 1. Ensure columns exist on profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dietary_preference TEXT DEFAULT 'Vegetarian';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS food_preference TEXT DEFAULT 'Vegetarian';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT 'Passionate home cook exploring traditional and modern Indian flavours.';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Synchronize dietary_preference and food_preference columns
UPDATE public.profiles
SET food_preference = dietary_preference
WHERE food_preference IS NULL AND dietary_preference IS NOT NULL;

UPDATE public.profiles
SET dietary_preference = food_preference
WHERE dietary_preference IS NULL AND food_preference IS NOT NULL;

-- 2. Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.recipes TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.favourites TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 3. Ensure Row-Level Security (RLS) is active
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

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
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. Update the Trigger Function to capture dietary_preference / food_preference on sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    dietary_preference,
    food_preference
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'),
    COALESCE(NEW.raw_user_meta_data->>'dietary_preference', NEW.raw_user_meta_data->>'food_preference', 'Vegetarian'),
    COALESCE(NEW.raw_user_meta_data->>'food_preference', NEW.raw_user_meta_data->>'dietary_preference', 'Vegetarian')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    dietary_preference = COALESCE(EXCLUDED.dietary_preference, profiles.dietary_preference),
    food_preference = COALESCE(EXCLUDED.food_preference, profiles.food_preference),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Storage Bucket Setup for 'recipe-images'
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-images', 'recipe-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Allow public view on recipe-images" ON storage.objects;
CREATE POLICY "Allow public view on recipe-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'recipe-images');

DROP POLICY IF EXISTS "Allow authenticated uploads to recipe-images" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to recipe-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'recipe-images');

DROP POLICY IF EXISTS "Allow authenticated updates to recipe-images" ON storage.objects;
CREATE POLICY "Allow authenticated updates to recipe-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'recipe-images')
  WITH CHECK (bucket_id = 'recipe-images');

DROP POLICY IF EXISTS "Allow anon uploads to recipe-images" ON storage.objects;
CREATE POLICY "Allow anon uploads to recipe-images"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'recipe-images');

-- 6. Clean legacy local relative paths that 404 in production
UPDATE public.profiles
SET avatar_url = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
WHERE avatar_url LIKE '/uploads/%';

-- 7. Reload schema cache
NOTIFY pgrst, 'reload schema';

SELECT 'RecipeBox database schema, food preferences, and storage configured successfully!' AS status;
