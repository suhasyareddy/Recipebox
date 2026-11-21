export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  category: "gravy" | "dairy" | "spices" | "produce" | "staples";
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  instructions: string;
  tips?: string[];
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cuisine: string;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  prepTime: string;
  cookTime: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  spiceLevel: "Mild" | "Mild/Med" | "Medium" | "Spicy";
  rating: number;
  reviewsCount: number;
  image: string;
  imageAlt: string;
  dietaryTags: string[];
  regionalTag: string;
  heritageBatch?: string;
  secretTip: string;
  ammaQuote: string;
  ingredients: Ingredient[];
  steps: CookingStep[];
}

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "paneer-butter-masala",
    title: "Amma’s Homestyle Paneer Butter Masala",
    subtitle: "Silky, rich tomato gravy with hand-churned butter, tender malai paneer, and aromatic kasuri methi",
    description: "Naturally fermented lentil batter steamed to pillowy perfection, served with Amma's slow-cooked drumstick & shallot sambar.",
    cuisine: "North Indian",
    mealType: "Lunch",
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: 4,
    calories: 420,
    protein: 18,
    carbs: 22,
    fat: 28,
    fiber: 4,
    spiceLevel: "Mild/Med",
    rating: 4.8,
    reviewsCount: 84,
    heritageBatch: "Mastered Batch #84",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Rich, vibrant reddish-orange homestyle Paneer Butter Masala in a hammered brass degchi pot garnished with fresh malai cream and kasuri methi",
    dietaryTags: ["100% Pure Veg", "Makhani Heritage", "Calcium Rich", "Family Favorite"],
    regionalTag: "Punjab Inspired",
    secretTip: "Always soak paneer cubes in lukewarm water with a tiny pinch of salt for 10 minutes before sliding into the simmering gravy. This keeps the paneer melt-in-the-mouth velvety soft without turning chewy or rubbery!",
    ammaQuote: "Made best for special Sunday lunches or family gatherings. Pair with warm Phulkas, Garlic Butter Naan, or Jeera Rice.",
    ingredients: [
      { name: "Large Ripe Red Tomatoes", amount: 4, unit: "pieces", notes: "Roughly chopped; use hybrid or desi mix for balanced tang", category: "gravy" },
      { name: "Soaked Cashews (Kaju)", amount: 12, unit: "pieces", notes: "Soaked in warm water for 20 mins for silk-smooth texture", category: "gravy" },
      { name: "Ginger-Garlic Paste", amount: 1, unit: "tbsp", notes: "Freshly stone-ground or crushed preferred", category: "gravy" },
      { name: "Kashmiri Lal Mirch", amount: 1, unit: "tsp", notes: "Provides fiery red hue without excessive heat", category: "spices" },
      { name: "Garam Masala & Kasuri Methi", amount: 1, unit: "tbsp", notes: "Amma’s ground garam masala and toasted fenugreek", category: "spices" },
      { name: "Fresh Malai Paneer", amount: 350, unit: "g", notes: "Cut into 1-inch uniform cubes; warm water soaked", category: "dairy" },
      { name: "Pure Desi Ghee & White Butter", amount: 3, unit: "tbsp", notes: "Desi cow ghee gives signature nostalgic aroma", category: "dairy" },
      { name: "Fresh Malai (Heavy Cream)", amount: 3, unit: "tbsp", notes: "Whipped lightly for silk velvet swirl at the end", category: "dairy" },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Simmer Tomatoes & Cashews",
        subtitle: "Base Puree Preparation • 10 Mins",
        duration: "10 mins",
        instructions: "In a saucepan, bring 1.5 cups of water to a rolling boil. Add roughly chopped tomatoes, soaked cashews, sliced ginger, 2 cloves, and mild spices. Simmer for 10 minutes until tomato skins curl and soften. Let cool slightly, then blend in a high-speed mixer into a satin-smooth puree. Strain through a fine sieve for that signature restaurant velvet texture.",
        tips: ["Blend fine & Strain", "No artificial colors needed"]
      },
      {
        stepNumber: 2,
        title: "Tadka & Aromatics",
        subtitle: "Tempering the Kadai • 4 Mins",
        duration: "4 mins",
        instructions: "Melt 2 tbsp desi ghee in a heavy-bottomed kadai or cast iron pan over medium heat. Add 1 bay leaf (tej patta) and 2 cracked green cardamoms. Slide in 1 tbsp of fresh ginger-garlic paste and sauté for 1 to 2 minutes until the raw edge mellows into a rich, sweet aroma. Sprinkle the Kashmiri lal mirch directly into the warm ghee for 5 seconds to wake up its vibrant crimson hue.",
        tips: ["Medium Low Heat", "Don't burn mirch"]
      },
      {
        stepNumber: 3,
        title: "Simmer the Makhani Gravy",
        subtitle: "Reduction & Butter Emulsion • 12 Mins",
        duration: "12 mins",
        instructions: "Pour the strained tomato-cashew puree into the sizzling aromatic kadai. Stir thoroughly to emulsify with the ghee. Add salt to taste, 1/2 tsp sugar to counter acidity, and cover with a heavy lid. Cook on medium-low flame for 10-12 minutes, stirring intermittently until droplets of fragrant orange ghee naturally separate along the sides of the pan.",
        tips: ["Simmer 12 mins", "Ghee separation indicator"]
      },
      {
        stepNumber: 4,
        title: "Add Paneer & Finishing Touch",
        subtitle: "Mellow Infusion • 3 Mins",
        duration: "3 mins",
        instructions: "Drain the soaked paneer cubes and gently slide them into the simmering gravy. Rub kasuri methi between your palms to release the essential oils and scatter across the surface, along with garam masala and 1 tbsp of cold white butter. Drizzle 3 tbsp fresh malai. Swirl gently once without breaking the paneer. Turn off flame and let rest covered for 2 minutes before serving.",
        tips: ["Gentle swirl only", "Serve steaming hot"]
      }
    ]
  },
  {
    id: "soft-idlis-sambar",
    title: "Soft Idlis & Vegetable Sambar with Fresh Coconut Chutney",
    subtitle: "Steamed fluffy fermented rice-lentil cakes with drumstick shallot sambar",
    description: "Naturally fermented lentil batter steamed to pillowy perfection, served with Amma's slow-cooked drumstick & shallot sambar.",
    cuisine: "South Indian",
    mealType: "Breakfast",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: 4,
    calories: 320,
    protein: 12,
    carbs: 58,
    fat: 6,
    fiber: 6,
    spiceLevel: "Mild",
    rating: 4.9,
    reviewsCount: 112,
    heritageBatch: "Mastered Batch #102",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "South Indian breakfast with soft steaming idlis on a banana leaf, vegetable sambar, and fresh coconut chutney",
    dietaryTags: ["Pure Veg", "South Indian", "High Protein", "Gut Friendly"],
    regionalTag: "Tamil Nadu Tradition",
    secretTip: "Add a pinch of fenugreek seeds (methi dana) to the urad dal while soaking. It enhances natural fermentation and guarantees marshmallow-soft idlis even in cooler weather.",
    ammaQuote: "Serve piping hot straight from the cooker plates with a generous drizzle of hot ghee over the sambar.",
    ingredients: [
      { name: "Idli Rice & Urad Dal Batter", amount: 4, unit: "cups", notes: "Fermented for 12 hours", category: "staples" },
      { name: "Toor Dal (Cooked & Mashed)", amount: 1, unit: "cup", notes: "Boiled with turmeric", category: "staples" },
      { name: "Madras Small Shallots (Sambar Onions)", amount: 10, unit: "pieces", notes: "Peeled whole", category: "produce" },
      { name: "Drumsticks & Carrots", amount: 1.5, unit: "cups", notes: "Chopped in 2-inch sticks", category: "produce" },
      { name: "Amma's Sambar Powder", amount: 2, unit: "tbsp", notes: "Freshly roasted coriander, chana dal & chillies", category: "spices" },
      { name: "Fresh Grated Coconut", amount: 1, unit: "cup", notes: "For tempered chutney", category: "produce" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Steam the Idlis",
        subtitle: "10 Mins Steam",
        duration: "10 mins",
        instructions: "Grease idli molds with sesame oil or ghee. Pour ladlefuls of airy fermented batter. Steam in a whistle-free cooker or idli pot for 10-12 minutes on medium flame. Let rest for 2 minutes before unmolding with a wet butter knife.",
        tips: ["Do not over-steam", "Wet spoon prevents sticking"]
      },
      {
        stepNumber: 2,
        title: "Simmer the Sambar",
        subtitle: "Aromatic Tamarind Boil",
        duration: "15 mins",
        instructions: "Cook shallots, drumsticks, and tomatoes in tamarind water with turmeric and sambar powder until tender. Pour in mashed toor dal, add salt, and bring to a rolling boil.",
        tips: ["Simmer till veggies are soft"]
      },
      {
        stepNumber: 3,
        title: "Ghee Tadka & Coconut Chutney",
        subtitle: "Final Tempering",
        duration: "5 mins",
        instructions: "Splutter mustard seeds, curry leaves, hing, and dry red chillies in hot ghee. Pour over sambar. Grind fresh coconut, roasted gram, and green chillies into smooth chutney and temper with mustard and curry leaves.",
        tips: ["Serve with hot ghee"]
      }
    ]
  },
  {
    id: "vegetable-khichdi",
    title: "Light Vegetable Khichdi with Roasted Papad, Pickle & Curd",
    subtitle: "Soothing yellow moong dal & rice infused with ginger, cumin and vegetables",
    description: "Wholesome yellow moong dal and rice infused with cumin, ginger, turmeric and garden vegetables. Easy on digestion for restful sleep.",
    cuisine: "Homestyle",
    mealType: "Dinner",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
    calories: 380,
    protein: 14,
    carbs: 62,
    fat: 9,
    fiber: 5,
    spiceLevel: "Mild",
    rating: 4.8,
    reviewsCount: 76,
    heritageBatch: "Comfort Routine #42",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Steaming hot yellow moong dal khichdi with mixed vegetables and ghee, served with roasted papad and curd",
    dietaryTags: ["Gut Friendly", "Homestyle", "Light & Easy", "Low Sodium"],
    regionalTag: "All-India Comfort",
    secretTip: "Dry-roast the moong dal on low flame for 2 minutes before washing and cooking with rice. It gives a wonderful nutty aroma that elevates simple khichdi to soul food.",
    ammaQuote: "When the mind is tired and the stomach needs healing, nothing compares to fresh khichdi and homemade dahi.",
    ingredients: [
      { name: "Yellow Moong Dal", amount: 0.5, unit: "cup", notes: "Lightly dry roasted", category: "staples" },
      { name: "Short Grain Rice / Kolam", amount: 0.75, unit: "cup", notes: "Rinsed and soaked 15 mins", category: "staples" },
      { name: "Finely Chopped Carrots, Peas & Beans", amount: 1, unit: "cup", notes: "Mixed garden veggies", category: "produce" },
      { name: "Desi Cow Ghee", amount: 2, unit: "tbsp", notes: "For tempering and top drizzle", category: "dairy" },
      { name: "Cumin Seeds & Asafoetida (Hing)", amount: 1, unit: "tsp", notes: "Aromatic digestive tempering", category: "spices" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Pressure Cook Dal & Rice",
        subtitle: "3 Whistles • 15 Mins",
        duration: "15 mins",
        instructions: "Heat 1 tbsp ghee in a pressure cooker. Add cumin, grated ginger, and green chilli. Sauté mixed vegetables for 1 minute. Add soaked dal, rice, turmeric, salt, and 4 cups of water. Pressure cook for 3 to 4 whistles until soft and porridge-like.",
        tips: ["4:1 water ratio for melt-in-mouth texture"]
      },
      {
        stepNumber: 2,
        title: "Ghee Finishing",
        subtitle: "Rest & Temper",
        duration: "5 mins",
        instructions: "Let steam release naturally. Stir gently. Pour a fresh tadka of cumin and hing in sizzling ghee over the top. Serve piping hot with roasted cumin papad and set curd.",
        tips: ["Serve immediately"]
      }
    ]
  },
  {
    id: "crispy-medu-vada",
    title: "Crispy Medu Vada with Sambhar",
    subtitle: "Golden spiced urad dal fritters with crushed black pepper and fresh curry leaves",
    description: "Fluffy urad dal fritters infused with crushed black pepper, fresh curry leaves, and ginger. Paired with tangy drumstick sambhar.",
    cuisine: "South Indian",
    mealType: "Breakfast",
    prepTime: "20 mins",
    cookTime: "25 mins",
    servings: 4,
    calories: 340,
    protein: 14,
    carbs: 42,
    fat: 14,
    fiber: 5,
    spiceLevel: "Medium",
    rating: 4.9,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Golden crisp South Indian medu vada on a banana leaf with sambar and fresh coconut chutney",
    dietaryTags: ["Gluten-Free", "Traditional", "Weekend Breakfast"],
    regionalTag: "South Indian",
    secretTip: "Grind soaked urad dal with minimal ice-cold water in a wet grinder or blender until the batter becomes airy like meringue. Drop a small ball into water—if it floats, your vadas will be exceptionally crisp outside and light inside!",
    ammaQuote: "Crisp outside, cloud-soft inside. The secret is aerating the batter well.",
    ingredients: [
      { name: "Whole White Urad Dal", amount: 1.5, unit: "cups", notes: "Soaked for 4 hours", category: "staples" },
      { name: "Crushed Black Peppercorns", amount: 1, unit: "tsp", notes: "Coarsely pounded", category: "spices" },
      { name: "Fresh Curry Leaves & Ginger", amount: 2, unit: "tbsp", notes: "Finely minced", category: "produce" },
      { name: "Oil for Frying", amount: 2, unit: "cups", notes: "Cold pressed groundnut oil", category: "staples" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Aerating the Batter",
        subtitle: "Fluffy Whipping",
        duration: "10 mins",
        instructions: "Grind dal adding spoonfuls of ice water. Whisk with fingers in one direction for 3 minutes until voluminous. Fold in pepper, ginger, and curry leaves.",
        tips: ["Water test ensures floatiness"]
      },
      {
        stepNumber: 2,
        title: "Golden Frying",
        subtitle: "Crisp Crust",
        duration: "15 mins",
        instructions: "Wet fingers, take a lime-sized ball, make a hole in center, and slide gently into hot oil. Fry on medium heat until golden brown on both sides.",
        tips: ["Maintain medium heat for cooked center"]
      }
    ]
  },
  {
    id: "lemon-rice-chitranna",
    title: "Lemon Rice with Roasted Peanuts & Papad",
    subtitle: "Zesty turmeric Chitranna effortlessly cooked with crunchy peanuts & curry leaves",
    description: "Zesty, comforting Chitranna that effortlessly revives yesterday's cooked rice with nutty tempering and lemon juice.",
    cuisine: "South Indian",
    mealType: "Lunch",
    prepTime: "5 mins",
    cookTime: "15 mins",
    servings: 4,
    calories: 360,
    protein: 7,
    carbs: 64,
    fat: 9,
    fiber: 3,
    spiceLevel: "Mild/Med",
    rating: 4.7,
    reviewsCount: 68,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bright golden turmeric lemon rice chitranna studded with fried peanuts, curry leaves, and mustard seeds",
    dietaryTags: ["Uses Leftover Rice", "Kid Friendly", "Speedy 15m"],
    regionalTag: "Karnataka & Andhra",
    secretTip: "Turn off the heat before squeezing fresh lemon juice! Cooking lemon juice over direct flame turns it bitter. Stir into warm rice away from heat.",
    ammaQuote: "Whenever there is leftover rice in the fridge, lemon rice brings instant joy in 15 minutes flat.",
    ingredients: [
      { name: "Cooked Basmati or Sona Masoori Rice", amount: 3, unit: "cups", notes: "Cooled or refrigerated", category: "staples" },
      { name: "Fresh Lemon Juice", amount: 3, unit: "tbsp", notes: "From 2 juicy lemons", category: "produce" },
      { name: "Raw Peanuts (Groundnuts)", amount: 0.33, unit: "cup", notes: "Roasted in oil till crunchy", category: "staples" },
      { name: "Mustard Seeds, Chana Dal & Urad Dal", amount: 1.5, unit: "tbsp", notes: "Crunchy tempering", category: "spices" },
      { name: "Turmeric Powder & Green Chillies", amount: 1, unit: "tsp", notes: "Golden hue and subtle zing", category: "spices" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Tempering the Grains",
        subtitle: "Nutty Crunch",
        duration: "5 mins",
        instructions: "Heat sesame oil in a wok. Fry peanuts on low heat until golden. Add mustard seeds, chana dal, urad dal, green chillies, ginger, turmeric, and fresh curry leaves until fragrant.",
        tips: ["Fry peanuts slowly so they stay crisp"]
      },
      {
        stepNumber: 2,
        title: "Tossing the Rice",
        subtitle: "Golden Coat",
        duration: "5 mins",
        instructions: "Add cooled rice and salt. Toss gently using a flat spatula so rice grains remain intact and take on a bright saffron-yellow color.",
        tips: ["Use cooled rice to avoid mushiness"]
      },
      {
        stepNumber: 3,
        title: "Lemon Infusion",
        subtitle: "Zesty Finish",
        duration: "2 mins",
        instructions: "Turn off heat. Pour fresh lemon juice over the warm rice and give a final gentle fold. Garnish with chopped coriander.",
        tips: ["Never boil lemon juice"]
      }
    ]
  },
  {
    id: "amritsari-rajma-chawal",
    title: "Amritsari Rajma Masala & Jeera Rice",
    subtitle: "Slow-simmered kidney beans in thick spiced gravy paired with cumin rice",
    description: "Slow-simmered red kidney beans infused with roasted spices, garlic, ginger and tomatoes, cooked till tender and melting.",
    cuisine: "North Indian",
    mealType: "Lunch",
    prepTime: "15 mins",
    cookTime: "40 mins",
    servings: 4,
    calories: 520,
    protein: 20,
    carbs: 84,
    fat: 11,
    fiber: 14,
    spiceLevel: "Medium",
    rating: 4.9,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Slow cooked Punjabi Rajma Masala in rustic clay bowl with fragrant steaming jeera rice",
    dietaryTags: ["High Fiber", "Family Favorite", "Protein Packed"],
    regionalTag: "Punjabi Classic",
    secretTip: "Mash 2 tablespoons of cooked rajma beans against the side of the pot with a ladle. This naturally thickens the gravy into a rich sauce without adding excess cornstarch or heavy cream.",
    ammaQuote: "Sunday lunch without Rajma Chawal feels incomplete. Cooked slow, eaten with family.",
    ingredients: [
      { name: "Kashmiri Chitra Rajma", amount: 1.5, unit: "cups", notes: "Soaked overnight for 8 hours", category: "staples" },
      { name: "Finely Chopped Red Onions", amount: 2, unit: "pieces", notes: "Browned thoroughly", category: "produce" },
      { name: "Fresh Tomato Puree", amount: 1.5, unit: "cups", notes: "Ripe tomatoes", category: "produce" },
      { name: "Ginger, Garlic & Green Chilli Paste", amount: 2, unit: "tbsp", notes: "Pounded", category: "produce" },
      { name: "Amma's Garam Masala & Kasuri Methi", amount: 1.5, unit: "tbsp", notes: "Warm spices", category: "spices" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Pressure Cook the Beans",
        subtitle: "Melt-in-Mouth Beans",
        duration: "25 mins",
        instructions: "Cook soaked rajma with black cardamom, bay leaf, salt, and water in a pressure cooker for 5 to 6 whistles until completely soft when pressed.",
        tips: ["Do not undercook the beans"]
      },
      {
        stepNumber: 2,
        title: "Bhuna Masala",
        subtitle: "Caramelized Gravy",
        duration: "15 mins",
        instructions: "Heat ghee and oil. Sauté onions until deep golden brown. Add ginger-garlic paste and tomato puree. Cook until oil separates.",
        tips: ["Brown onions well for authentic color"]
      },
      {
        stepNumber: 3,
        title: "Simmer & Mash",
        subtitle: "Thick Velvety Sauce",
        duration: "10 mins",
        instructions: "Add boiled rajma with cooking liquid. Mash a ladleful of beans. Simmer for 10 minutes until thick and glossy. Finish with garam masala and ghee.",
        tips: ["Serve with hot Jeera Rice and sliced onions"]
      }
    ]
  }
];

export const WEEKLY_SCHEDULE_DATA = [
  {
    day: "Mon",
    date: "Oct 21",
    mealsCount: 3,
    isToday: false,
    breakfast: {
      title: "Kanda Batata Poha",
      subtitle: "With roasted peanuts & nimbu",
      time: "15m",
      tag: "Light Carbs",
      image: "https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80",
      recipeId: "soft-idlis-sambar"
    },
    lunch: {
      title: "Dal Tadka & Jeera Rice",
      subtitle: "Plus crispy Bhindi Masala fry",
      time: "35m",
      tag: "Dal & Bhindi",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      recipeId: "vegetable-khichdi"
    },
    dinner: {
      title: "Phulka & Aloo Gobi",
      subtitle: "3 Rotis each with fresh cucumber raita",
      time: "25m",
      tag: "Roti Subzi",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      recipeId: "paneer-butter-masala"
    }
  },
  {
    day: "Tue",
    date: "Oct 22",
    mealsCount: 3,
    isToday: false,
    breakfast: {
      title: "Vegetable Rava Upma",
      subtitle: "Coconut chutney & filter coffee",
      time: "20m",
      tag: "High Fiber",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      recipeId: "soft-idlis-sambar"
    },
    lunch: {
      title: "Gujarati Kadhi Khichdi",
      subtitle: "Ghee-laden Khichdi + fried papad",
      time: "40m",
      tag: "Comfort Food",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      recipeId: "vegetable-khichdi"
    },
    dinner: {
      title: "Paneer Butter Masala",
      subtitle: "Warm tawa kulchas & sirka onion",
      time: "30m",
      tag: "Kids Choice",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
      recipeId: "paneer-butter-masala"
    }
  },
  {
    day: "Wed",
    date: "Oct 23",
    mealsCount: 3,
    isToday: false,
    breakfast: {
      title: "Methi Thepla",
      subtitle: "Served with sweet chunda & tea",
      time: "15m",
      tag: "Travel Friendly",
      image: "https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80",
      recipeId: "soft-idlis-sambar"
    },
    lunch: {
      title: "Sambar Sadam & Poriyal",
      subtitle: "Small shallots sambar + beans carrot",
      time: "30m",
      tag: "Immunity Boost",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      recipeId: "soft-idlis-sambar"
    },
    dinner: {
      title: "Dal Makhani & Jeera Rice",
      subtitle: "Creamy slow cooked black lentils",
      time: "35m",
      tag: "Swap Suggestion",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      recipeId: "vegetable-khichdi"
    }
  },
  {
    day: "Thu",
    date: "Oct 24",
    mealsCount: 3,
    isToday: true,
    breakfast: {
      title: "Soft Idlis & Vegetable Sambar",
      subtitle: "With fresh grated coconut chutney",
      time: "25m",
      tag: "Today's Special",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      recipeId: "soft-idlis-sambar"
    },
    lunch: {
      title: "Phulkas & Paneer Butter Masala",
      subtitle: "With Tadka Dal and Mint Raita",
      time: "40m",
      tag: "Chef Highlight",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
      recipeId: "paneer-butter-masala"
    },
    dinner: {
      title: "Moong Dal Khichdi & Papad",
      subtitle: "Restful gut-friendly warm supper",
      time: "20m",
      tag: "Satvik Supper",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      recipeId: "vegetable-khichdi"
    }
  },
  {
    day: "Fri",
    date: "Oct 25",
    mealsCount: 3,
    isToday: false,
    breakfast: {
      title: "Methi Paratha with White Butter",
      subtitle: "Fresh fenugreek spiced flatbread",
      time: "20m",
      tag: "Quick 20m",
      image: "https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80",
      recipeId: "soft-idlis-sambar"
    },
    lunch: {
      title: "Amritsari Rajma Masala & Chawal",
      subtitle: "Slow-simmered kidney beans & jeera rice",
      time: "45m",
      tag: "Family Fav",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
      recipeId: "amritsari-rajma-chawal"
    },
    dinner: {
      title: "Crispy Masala Dosa & Tomato Chutney",
      subtitle: "Spiced potato stuffing & tangy dip",
      time: "30m",
      tag: "Weekend Eve",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
      recipeId: "crispy-medu-vada"
    }
  },
  {
    day: "Sat",
    date: "Oct 26",
    mealsCount: 3,
    isToday: false,
    breakfast: {
      title: "Crispy Medu Vada & Sambhar",
      subtitle: "Fluffy urad dal fritters",
      time: "25m",
      tag: "Weekend Brunch",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
      recipeId: "crispy-medu-vada"
    },
    lunch: {
      title: "Lemon Rice & Roasted Peanuts",
      subtitle: "Served with potato roast & curd",
      time: "20m",
      tag: "Zesty & Fast",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      recipeId: "lemon-rice-chitranna"
    },
    dinner: {
      title: "Pav Bhaji with Butter Toasted Ladi Pav",
      subtitle: "Mashed vegetable spiced medley",
      time: "35m",
      tag: "Saturday Special",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      recipeId: "vegetable-khichdi"
    }
  },
  {
    day: "Sun",
    date: "Oct 27",
    mealsCount: 3,
    isToday: false,
    breakfast: {
      title: "Aloo Poori & Halwa",
      subtitle: "Sunday celebratory breakfast",
      time: "35m",
      tag: "Festive Joy",
      image: "https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80",
      recipeId: "soft-idlis-sambar"
    },
    lunch: {
      title: "Royal Vegetable Dum Biryani",
      subtitle: "With Garlicky Burani Raita & Mirchi Salan",
      time: "50m",
      tag: "Family Feast",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      recipeId: "paneer-butter-masala"
    },
    dinner: {
      title: "Moong Dal Chilla & Green Chutney",
      subtitle: "High-protein light wrap before Monday",
      time: "20m",
      tag: "Light Reset",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
      recipeId: "vegetable-khichdi"
    }
  }
];

export interface GroceryItem {
  id: string;
  name: string;
  sub: string;
  quantity: string;
  category: "veggies" | "dals" | "dairy" | "spices";
  purchased: boolean;
  highlightTag?: string;
}

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  // Veggies
  { id: "g-1", name: "Tomatoes (Tamatar - Local Desi)", sub: "Used in: Sambar, Dal Tadka, Paneer Masala", quantity: "1.5 kg", category: "veggies", purchased: true },
  { id: "g-2", name: "Potatoes (Aloo - New Crop)", sub: "Used in: Aloo Gobi, Paratha, Samosa Chaat", quantity: "2 kg", category: "veggies", purchased: true },
  { id: "g-3", name: "Fresh Spinach (Palak)", sub: "Used in: Palak Paneer (Wed Dinner), Dal Palak", quantity: "2 bunches", category: "veggies", purchased: false },
  { id: "g-4", name: "Ladyfinger (Bhindi)", sub: "Used in: Kurkuri Bhindi Masala (Fri Lunch)", quantity: "500 g", category: "veggies", purchased: false },
  { id: "g-5", name: "Coriander & Fresh Curry Leaves", sub: "Essential for daily tadka, chutney & garnish", quantity: "1 bunch ea", category: "veggies", purchased: false },
  { id: "g-6", name: "Ginger (Adrak) & Green Chillies (Hari Mirch)", sub: "Fresh spicy ginger-chilli paste", quantity: "250 g", category: "veggies", purchased: false },
  // Dals
  { id: "g-7", name: "Toor Dal (Arhar - Oodani Variety)", sub: "For daily South Indian Sambar & Gujarati Khatti Dal", quantity: "1 kg", category: "dals", purchased: true },
  { id: "g-8", name: "Moong Dal (Yellow Split)", sub: "Used in: Moong Dal Khichdi & Halwa Sunday special", quantity: "500 g", category: "dals", purchased: false },
  { id: "g-9", name: "Rajma (Chitra Kashmiri)", sub: "For classic Sunday Rajma Chawal feast", quantity: "500 g", category: "dals", purchased: false, highlightTag: "Soaking tonight!" },
  { id: "g-10", name: "Basmati Rice (Aged Long Grain)", sub: "Daily steamed rice, jeera rice & pulao", quantity: "5 kg bag", category: "dals", purchased: false },
  { id: "g-11", name: "Whole Wheat Chakki Atta (MP Sharbati)", sub: "Freshly ground roti, phulka, and stuffed parathas", quantity: "10 kg", category: "dals", purchased: false },
  // Dairy
  { id: "g-12", name: "Fresh Malai Paneer", sub: "Store fresh or make at home for Palak Paneer", quantity: "500 g", category: "dairy", purchased: true, highlightTag: "Pure Cow Milk" },
  { id: "g-13", name: "Thick Curd / Set Dahi", sub: "For cooling Boondi Raita, Chaas & Kadhi Pakora", quantity: "2 pkts (1 kg)", category: "dairy", purchased: false },
  { id: "g-14", name: "Desi Cow Ghee (Bilona Churned)", sub: "Warm tadkas, khichdi dollop & paratha brushing", quantity: "500 ml jar", category: "dairy", purchased: false },
  // Spices
  { id: "g-15", name: "Mustard Seeds & Cumin (Rai-Jeera Combo)", sub: "Core tempering for all daily dals & dry vegetables", quantity: "250 g", category: "spices", purchased: false },
  { id: "g-16", name: "Kashmiri Degi Mirch Powder", sub: "Provides deep rich red gravy color with gentle warmth", quantity: "100 g", category: "spices", purchased: false },
  { id: "g-17", name: "Kasuri Methi (Toasted Fenugreek Leaves)", sub: "The aromatic finishing touch for Paneer Butter Masala", quantity: "1 box", category: "spices", purchased: false },
  { id: "g-18", name: "Amma's Stone-Ground Garam Masala", sub: "Cardamom, clove, cinnamon & mace blend", quantity: "100 g", category: "spices", purchased: false }
];
