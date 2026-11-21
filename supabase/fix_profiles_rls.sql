-- ==============================================================================
-- Run this in Supabase Dashboard > SQL Editor
-- Fixes Row-Level Security (RLS) on public.profiles so users can insert & update
-- ==============================================================================

-- 1. Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Clean up any existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;

-- 3. Policy: Anyone can view profiles
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT 
  USING (true);

-- 4. Policy: Authenticated users can insert their own profile
CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);

-- 5. Policy: Authenticated users can update their own profile
CREATE POLICY "Users can update their own profile." 
  ON public.profiles FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 6. Insert row for existing auth users into public.profiles
INSERT INTO public.profiles (id, full_name, email, dietary_preference, avatar_url)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
  email,
  COALESCE(raw_user_meta_data->>'dietary_preference', 'Non-Vegetarian'),
  COALESCE(raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80')
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  dietary_preference = EXCLUDED.dietary_preference;

-- 7. Reload schema cache
NOTIFY pgrst, 'reload schema';

