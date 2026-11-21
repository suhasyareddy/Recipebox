export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  dietary_preference?: string | null;
  food_preference?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface RecipeIngredient {
  item: string;
  quantity: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Desserts' | 'Traditional';
  prep_time: number; // in minutes
  cook_time: number; // in minutes
  servings: number;
  calories?: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  image_url: string;
  spice_level?: 'Mild' | 'Medium' | 'Spicy';
  dietary_tags?: string[];
  created_at?: string;
  updated_at?: string;
  author_name?: string;
  author_avatar?: string;
}

export interface Favourite {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
  recipe?: Recipe;
}
