-- ==============================================================================
-- RecipeBox ("Amma's Indian Meal Planner") Supabase Schema & Security Setup
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Profiles Table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT DEFAULT 'Passionate home cook exploring traditional and modern Indian flavours.',
  dietary_preference TEXT DEFAULT 'Vegetarian',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 3. Trigger to auto-create Profile on auth.users sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Create Recipes Table
CREATE TABLE IF NOT EXISTS public.recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Dinner', -- Breakfast, Lunch, Dinner, Snacks, Desserts, Traditional
  prep_time INTEGER NOT NULL DEFAULT 15,   -- in minutes
  cook_time INTEGER NOT NULL DEFAULT 30,   -- in minutes
  servings INTEGER NOT NULL DEFAULT 4,
  calories INTEGER DEFAULT 350,
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { item: string, quantity: string, notes?: string }
  instructions JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of string steps
  image_url TEXT,
  spice_level TEXT DEFAULT 'Medium', -- Mild, Medium, Spicy
  dietary_tags TEXT[] DEFAULT ARRAY['Vegetarian']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on recipes
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Recipes Policies
CREATE POLICY "Recipes are viewable by everyone." 
  ON public.recipes FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create recipes." 
  ON public.recipes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes." 
  ON public.recipes FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes." 
  ON public.recipes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- 5. Create Favourites Table
CREATE TABLE IF NOT EXISTS public.favourites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, recipe_id)
);

-- Enable RLS on favourites
ALTER TABLE public.favourites ENABLE ROW LEVEL SECURITY;

-- Favourites Policies
CREATE POLICY "Users can view their own favourites." 
  ON public.favourites FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favourites." 
  ON public.favourites FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their favourites." 
  ON public.favourites FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- 6. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON public.recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON public.recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON public.recipes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipes_prep_time ON public.recipes(prep_time ASC);
CREATE INDEX IF NOT EXISTS idx_favourites_user_id ON public.favourites(user_id);
CREATE INDEX IF NOT EXISTS idx_favourites_recipe_id ON public.favourites(recipe_id);

-- 7. Storage Bucket Setup
-- In Supabase Dashboard > Storage:
-- Create a public bucket called 'recipe-images'
-- Enable public read:
--   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'recipe-images');
-- Enable authenticated uploads:
--   CREATE POLICY "Authenticated users can upload recipe images" 
--     ON storage.objects FOR INSERT 
--     TO authenticated 
--     WITH CHECK (bucket_id = 'recipe-images');
