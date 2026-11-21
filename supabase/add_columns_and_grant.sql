-- ==============================================================================
-- Run this in your Supabase Dashboard > SQL Editor:
-- 1. Adds 'bio', 'dietary_preference', and helper columns to 'profiles' & 'recipes'
-- 2. Grants table permissions to anon & authenticated roles so RLS policies work
-- 3. Reloads the PostgREST schema cache
-- ==============================================================================

-- 1. Add columns to 'profiles' table if they don't already exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT 'Passionate home cook exploring traditional and modern Indian flavours.';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dietary_preference TEXT DEFAULT 'Vegetarian';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Add columns to 'recipes' table if they don't already exist
ALTER TABLE public.recipes ADD COLUMN IF NOT EXISTS calories INTEGER DEFAULT 350;
ALTER TABLE public.recipes ADD COLUMN IF NOT EXISTS spice_level TEXT DEFAULT 'Medium';
ALTER TABLE public.recipes ADD COLUMN IF NOT EXISTS dietary_tags TEXT[] DEFAULT ARRAY['Vegetarian']::TEXT[];
ALTER TABLE public.recipes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Grant schema usage and table privileges to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.recipes TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.favourites TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 4. Reload PostgREST schema cache immediately
NOTIFY pgrst, 'reload schema';
