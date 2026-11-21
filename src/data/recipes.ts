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
  },
  {
    id: "hyderabadi-chicken-dum-biryani",
    title: "Royal Hyderabadi Chicken Dum Biryani",
    subtitle: "Fragrant basmati rice layered with saffron, marinated chicken, caramelised onions & mint",
    description: "Authentic slow-dum-cooked long grain basmati rice infused with golden saffron milk, deep fried brown onions (birista), fresh mint, and bone-in tender chicken.",
    cuisine: "Hyderabadi / South Indian",
    mealType: "Lunch",
    prepTime: "30 mins",
    cookTime: "45 mins",
    servings: 6,
    calories: 620,
    protein: 34,
    carbs: 68,
    fat: 22,
    fiber: 4,
    spiceLevel: "Spicy",
    rating: 4.9,
    reviewsCount: 142,
    heritageBatch: "Nizami Dum Batch #142",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Steaming aromatic Hyderabadi Chicken Dum Biryani garnished with boiled egg, brown onions and coriander in a handi",
    dietaryTags: ["Non-Veg", "Chicken", "High Protein", "Royal Heritage"],
    regionalTag: "Hyderabad Nizami",
    secretTip: "Marinate chicken in thick sour curd, fried onions, and raw papaya paste for at least 3 hours. Seal the heavy handi with wheat dough (dum) on low flame over an iron tawa to prevent burning!",
    ammaQuote: "The crown jewel of Sunday family feasts. Serve with fiery Mirchi Ka Salan and chilled cucumber raita.",
    ingredients: [
      { name: "Curry Cut Fresh Chicken (Bone-in)", amount: 750, unit: "g", notes: "Bone-in pieces release rich natural juices into rice", category: "produce" },
      { name: "Aged Long Grain Basmati Rice", amount: 500, unit: "g", notes: "Soaked for 45 mins; cooked 70% in whole-spiced boiling water", category: "staples" },
      { name: "Crispy Fried Brown Onions (Birista)", amount: 1.5, unit: "cups", notes: "Deep fried thin sliced onions", category: "produce" },
      { name: "Fresh Thick Curd (Dahi)", amount: 1, unit: "cup", notes: "Whisked smooth for marinade base", category: "dairy" },
      { name: "Pure Cow Ghee & Saffron Milk", amount: 4, unit: "tbsp", notes: "Kesar strands bloomed in warm milk", category: "dairy" },
      { name: "Ginger-Garlic Paste", amount: 2, unit: "tbsp", notes: "Fresh stone ground", category: "spices" },
      { name: "Shahi Biryani Garam Masala", amount: 1.5, unit: "tbsp", notes: "Shahi jeera, star anise, mace and green cardamom", category: "spices" },
      { name: "Fresh Mint (Pudina) & Coriander", amount: 1, unit: "cup", notes: "Finely chopped fresh leaves for layering", category: "produce" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Marinate the Chicken",
        subtitle: "Flavor Infusion • 30 Mins (Rest 3 hrs)",
        duration: "30 mins",
        instructions: "Combine chicken with curd, ginger-garlic paste, red chilli powder, turmeric, shahi garam masala, half the fried onions, mint, coriander, and 2 tbsp ghee. Rub thoroughly into cuts and let rest in refrigerator.",
        tips: ["Marinate minimum 2 hours", "Do not skip mint and fried onions"]
      },
      {
        stepNumber: 2,
        title: "Parboil Basmati Rice",
        subtitle: "Aromatic 70% Cook • 8 Mins",
        duration: "8 mins",
        instructions: "Boil 3 litres of water with whole spices (bay leaf, cloves, cardamom, cinnamon, shahi jeera) and salt. Add soaked basmati rice. Boil vigorously until rice is 70% done (firm core). Drain immediately.",
        tips: ["Water must taste salty like soup", "Drain promptly to avoid mushy rice"]
      },
      {
        stepNumber: 3,
        title: "Layering & Dum Cooking",
        subtitle: "Slow Dum Infusion • 45 Mins",
        duration: "45 mins",
        instructions: "Place marinated chicken at the bottom of a heavy handi. Layer parboiled hot rice on top. Drizzle saffron milk, remaining ghee, fried onions, and mint. Seal lid with dough or foil. Cook on high for 10 mins, then transfer onto an iron tawa on low flame for 35 mins.",
        tips: ["Let rest 15 mins before fluffing with a flat saucer"]
      }
    ]
  },
  {
    id: "andhra-chicken-curry",
    title: "Andhra Homestyle Spicy Chicken Curry (Kodi Kura)",
    subtitle: "Tender chicken simmered in a roasted poppy seed, coconut & Guntur chilli masala",
    description: "Fiery, full-flavored Andhra homestyle chicken curry packed with freshly roasted coriander, poppy seeds (gasagasalu), dry coconut, and red-hot Guntur chillies.",
    cuisine: "Andhra / South Indian",
    mealType: "Lunch",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    calories: 480,
    protein: 36,
    carbs: 12,
    fat: 26,
    fiber: 3,
    spiceLevel: "Spicy",
    rating: 4.8,
    reviewsCount: 96,
    heritageBatch: "Guntur Heritage #96",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Rustic brass bowl filled with red spicy Andhra Kodi Kura chicken curry with fresh curry leaves",
    dietaryTags: ["Non-Veg", "Chicken", "Spicy Delight", "Homestyle Kodi Kura"],
    regionalTag: "Rayalaseema / Coastal Andhra",
    secretTip: "Dry roast coriander seeds, cinnamon, cloves, poppy seeds, and desiccated coconut on low heat until aromatic before grinding into the wet masala paste. Temper generously with fresh green chillies and curry leaves in sesame/groundnut oil!",
    ammaQuote: "Pairs heavenly with hot steamed sona masoori rice, ghee, or hot soft rotis on rainy afternoons.",
    ingredients: [
      { name: "Fresh Country/Broiler Chicken", amount: 600, unit: "g", notes: "Medium curry cut with bones", category: "produce" },
      { name: "Finely Chopped Red Onions", amount: 3, unit: "medium", notes: "Sauteed to translucent golden brown", category: "produce" },
      { name: "Guntur Red Chilli Powder", amount: 2, unit: "tsp", notes: "Adds signature Andhra heat and rich hue", category: "spices" },
      { name: "Poppy Seeds (Khus Khus) & Coconut", amount: 2, unit: "tbsp", notes: "Stone ground with warm water into smooth masala", category: "spices" },
      { name: "Fresh Curry Leaves & Green Chillies", amount: 4, unit: "sprigs", notes: "Slit green chillies and fragrant kadi patta", category: "produce" },
      { name: "Groundnut Oil", amount: 3, unit: "tbsp", notes: "Traditional Andhra cooking medium", category: "staples" },
      { name: "Fresh Coriander Leaves", amount: 0.5, unit: "cup", notes: "Finely chopped for garnish", category: "produce" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare Andhra Masala Paste",
        subtitle: "Roasted Aromatic Paste • 10 Mins",
        duration: "10 mins",
        instructions: "Dry roast poppy seeds, dry coconut, cloves, cinnamon, and whole coriander seeds until fragrant. Blend with a splash of water into a satin smooth wet paste.",
        tips: ["Do not burn the poppy seeds", "Grind ultra-smooth"]
      },
      {
        stepNumber: 2,
        title: "Sauté Aromatics & Sear Chicken",
        subtitle: "High Heat Searing • 10 Mins",
        duration: "10 mins",
        instructions: "Heat groundnut oil in a heavy kadai. Add curry leaves and slit green chillies. Sauté onions until golden. Add ginger-garlic paste and chicken pieces. Sauté on high heat for 6 minutes until chicken turns white and locks in juices.",
        tips: ["High heat keeps chicken juicy"]
      },
      {
        stepNumber: 3,
        title: "Simmer in Andhra Gravy",
        subtitle: "Rich Simmer • 15 Mins",
        duration: "15 mins",
        instructions: "Stir in the ground masala paste, Guntur chilli powder, turmeric, and salt. Cook for 4 minutes until oil begins to separate. Pour 1.5 cups water, cover, and simmer for 15 minutes until chicken is tender. Garnish with chopped cilantro.",
        tips: ["Simmer till gravy is thick and oil glazes surface"]
      }
    ]
  },
  {
    id: "chettinad-pepper-chicken",
    title: "Chettinad Pepper Chicken Fry (Kozhi Varuval)",
    subtitle: "Pan-roasted country chicken tossed with freshly cracked black pepper, shallots & curry leaves",
    description: "Iconic Tamil Chettinad dish featuring succulent chicken pieces dry-roasted in freshly ground Tellicherry black peppercorns, roasted fennel, small sambar onions, and garlic.",
    cuisine: "Chettinad / South Indian",
    mealType: "Dinner",
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: 4,
    calories: 410,
    protein: 38,
    carbs: 8,
    fat: 20,
    fiber: 3,
    spiceLevel: "Spicy",
    rating: 4.9,
    reviewsCount: 118,
    heritageBatch: "Chettinad Heritage #118",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dry roasted dark peppery Chettinad Chicken in cast iron skillet with crispy curry leaves",
    dietaryTags: ["Non-Veg", "Chicken", "Pepper Roast", "Protein Rich"],
    regionalTag: "Karaikudi Chettinad",
    secretTip: "Never use pre-powdered black pepper! Roast whole black peppercorns, cumin, and fennel seeds on low flame and coarsely crush them in a mortar and pestle just before adding.",
    ammaQuote: "Unbeatable cold-weather comfort food. The black pepper clears the sinuses and pairs magically with hot rasam rice or curd rice.",
    ingredients: [
      { name: "Boneless or Curry Cut Chicken", amount: 500, unit: "g", notes: "Small bite-sized pieces for quick pan-roasting", category: "produce" },
      { name: "Whole Black Peppercorns", amount: 2, unit: "tbsp", notes: "Freshly roasted and coarsely cracked", category: "spices" },
      { name: "Small Sambar Shallots (Chinna Vengayam)", amount: 15, unit: "pieces", notes: "Sliced thin; imparts authentic Chettinad sweetness", category: "produce" },
      { name: "Fennel Seeds (Saunf) & Cumin", amount: 1, unit: "tbsp", notes: "Adds floral herbal undertone", category: "spices" },
      { name: "Curry Leaves", amount: 3, unit: "stems", notes: "Generous handful for crisp frying", category: "produce" },
      { name: "Gingelly / Sesame Oil", amount: 3, unit: "tbsp", notes: "Pure cold-pressed sesame oil", category: "staples" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Roast Pepper-Fennel Spice",
        subtitle: "Hand-ground Chettinad Pepper • 5 Mins",
        duration: "5 mins",
        instructions: "Dry roast whole peppercorns, fennel seeds, and cumin seeds on low flame until fragrant and crackling. Coarsely crush in a mortar or spice grinder.",
        tips: ["Coarse texture is key; do not make a fine powder"]
      },
      {
        stepNumber: 2,
        title: "Pan Sauté Aromatics",
        subtitle: "Shallots & Curry Leaves • 8 Mins",
        duration: "8 mins",
        instructions: "Heat gingelly oil in an iron skillet. Crackle fennel seeds and curry leaves. Add sliced shallots and crushed garlic; sauté until golden caramelised.",
        tips: ["Iron skillet gives best pan-roasted flavor"]
      },
      {
        stepNumber: 3,
        title: "Toss & Dry Roast Chicken",
        subtitle: "Pepper Glaze Finish • 15 Mins",
        duration: "15 mins",
        instructions: "Add chicken, turmeric, and salt. Cook on medium-high heat until chicken releases its moisture and turns tender. Sprinkle the freshly cracked pepper-fennel powder and roast continuously on high heat until the gravy coats the meat and turns deep roasted brown.",
        tips: ["Roast dry until edges are lightly crisped"]
      }
    ]
  },
  {
    id: "punjabi-butter-chicken",
    title: "Classic Murgh Makhani (Butter Chicken)",
    subtitle: "Tandoori chicken pieces in a silky, mildly spiced buttery tomato-fenugreek gravy",
    description: "The timeless Punjabi culinary legend: chargrilled marinated chicken cooked in a velvety, buttery tomato-cashew makhani gravy finished with fresh cream, kasuri methi, and honey.",
    cuisine: "North Indian",
    mealType: "Dinner",
    prepTime: "20 mins",
    cookTime: "30 mins",
    servings: 4,
    calories: 520,
    protein: 35,
    carbs: 18,
    fat: 32,
    fiber: 3,
    spiceLevel: "Mild/Med",
    rating: 4.9,
    reviewsCount: 165,
    heritageBatch: "Old Delhi Makhani #165",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Creamy reddish-orange butter chicken in bowl garnished with fresh cream swirl and green chillies",
    dietaryTags: ["Non-Veg", "Chicken", "Makhani Heritage", "Crowd Pleaser"],
    regionalTag: "Punjab / Old Delhi",
    secretTip: "Pan-sear the marinated chicken in butter on high heat until charred before adding to the gravy. Strain the boiled tomato-cashew puree through a fine sieve for that signature silky velvet finish!",
    ammaQuote: "A festive family favorite. Serve with hot butter naan, garlic parathas, or jeera rice with sliced pickled onions.",
    ingredients: [
      { name: "Boneless Chicken Thighs", amount: 600, unit: "g", notes: "Cut into bite-sized pieces for juicy results", category: "produce" },
      { name: "Ripe Red Plum Tomatoes", amount: 6, unit: "pieces", notes: "Boiled and blended with soaked cashews", category: "produce" },
      { name: "Unsalted Butter & Desi Ghee", amount: 4, unit: "tbsp", notes: "For rich authentic makhani flavor", category: "dairy" },
      { name: "Heavy Whipping Cream", amount: 3, unit: "tbsp", notes: "Swirled into gravy at the end", category: "dairy" },
      { name: "Kasuri Methi (Crushed)", amount: 1, unit: "tbsp", notes: "Dry roasted and rubbed between palms", category: "spices" },
      { name: "Kashmiri Degi Mirch", amount: 1.5, unit: "tbsp", notes: "Imparts brilliant natural red color", category: "spices" },
      { name: "Honey or Jaggery", amount: 1, unit: "tsp", notes: "Balances tomato tang gently", category: "staples" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Marinate & Char Chicken",
        subtitle: "Yogurt Spice Sear • 15 Mins",
        duration: "15 mins",
        instructions: "Marinate chicken in hung curd, ginger-garlic paste, Kashmiri mirch, and garam masala. Sear in a hot buttered pan for 8 minutes until edges develop charred tandoori spots. Set aside.",
        tips: ["Chicken thighs stay far juicier than chicken breasts"]
      },
      {
        stepNumber: 2,
        title: "Velvet Makhani Puree",
        subtitle: "Silky Smooth Base • 12 Mins",
        duration: "12 mins",
        instructions: "Simmer tomatoes, cashews, cardamoms, and sliced ginger in water for 10 minutes. Cool, blend thoroughly, and strain through a sieve into a velvety smooth sauce.",
        tips: ["Straining ensures authentic restaurant silky texture"]
      },
      {
        stepNumber: 3,
        title: "Combine & Simmer",
        subtitle: "Cream & Fenugreek Finish • 10 Mins",
        duration: "10 mins",
        instructions: "Melt butter in a pan. Add the smooth tomato puree and Kashmiri mirch. Simmer for 5 minutes. Slide in the charred chicken pieces, cream, kasuri methi, and honey. Simmer 5 minutes until glossy and fragrant.",
        tips: ["Do not boil after adding cream; keep on gentle simmer"]
      }
    ]
  },
  {
    id: "malabar-fish-curry",
    title: "Kerala Malabar Fish Curry with Kudampuli",
    subtitle: "Fresh kingfish steaks in a velvety spiced coconut milk gravy with cocum & curry leaves",
    description: "Coastal Kerala heirloom seafood curry prepared in an authentic clay manchatti. Kingfish steaks bathed in a fragrant, tangy gravy made with shallots, ginger, green chillies, coconut milk, and malabar tamarind (kudampuli).",
    cuisine: "Kerala / Coastal South",
    mealType: "Lunch",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 4,
    calories: 390,
    protein: 32,
    carbs: 9,
    fat: 24,
    fiber: 2,
    spiceLevel: "Medium",
    rating: 4.9,
    reviewsCount: 88,
    heritageBatch: "Malabar Coastal #88",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Authentic Kerala clay pot filled with rich orange coconut fish curry garnished with curry leaves and green chillies",
    dietaryTags: ["Non-Veg", "Seafood / Fish", "Omega-3 Rich", "Coastal Classic"],
    regionalTag: "Malabar Coast Kerala",
    secretTip: "Cook in an earthen clay pot (manchatti) and use soaked kudampuli (cambodge). Allow the curry to rest for 3 to 4 hours before serving — fish curry always tastes ten times better as the spices absorb into the fish steaks!",
    ammaQuote: "Serve hot with Kerala red matta rice, tapioca (kappa vevichathu), or steamed idiyappam.",
    ingredients: [
      { name: "Fresh Seer Fish / Kingfish Steaks", amount: 500, unit: "g", notes: "Cleaned and sliced into 1-inch steaks", category: "produce" },
      { name: "Malabar Tamarind (Kudampuli)", amount: 3, unit: "pieces", notes: "Soaked in 1/2 cup warm water", category: "produce" },
      { name: "Fresh Coconut Milk (First & Second Extract)", amount: 1.5, unit: "cups", notes: "Thick first extract and thin second extract", category: "dairy" },
      { name: "Shallots (Small Red Onions)", amount: 10, unit: "pieces", notes: "Thinly sliced", category: "produce" },
      { name: "Ginger & Garlic (Julienned)", amount: 2, unit: "tbsp", notes: "Fresh ginger slices and whole garlic pods", category: "spices" },
      { name: "Pure Coconut Oil", amount: 2.5, unit: "tbsp", notes: "Adds quintessential Kerala coastal fragrance", category: "staples" },
      { name: "Fresh Curry Leaves & Green Chillies", amount: 3, unit: "stems", notes: "Fragrant tempering aromatics", category: "produce" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Sauté Aromatics in Clay Pot",
        subtitle: "Coconut Oil Tempering • 5 Mins",
        duration: "5 mins",
        instructions: "Heat coconut oil in a clay pot. Add mustard seeds and fenugreek seeds. Once they crackle, add sliced shallots, ginger, garlic, green chillies, and curry leaves. Sauté until translucent.",
        tips: ["Use clay pot for authentic earthy taste"]
      },
      {
        stepNumber: 2,
        title: "Spice Blend & Thin Coconut Milk",
        subtitle: "Base Curry Simmer • 7 Mins",
        duration: "7 mins",
        instructions: "Add turmeric, Kashmiri chilli powder, and coriander powder on low heat. Pour in the soaked kudampuli with its water and the second (thin) coconut milk. Bring to a gentle rolling boil.",
        tips: ["Swirl the pot gently; do not use heavy spoons to avoid breaking fish"]
      },
      {
        stepNumber: 3,
        title: "Simmer Fish & Thick Coconut Milk",
        subtitle: "Delicate Fish Cook • 8 Mins",
        duration: "8 mins",
        instructions: "Slide in the fresh fish steaks. Simmer gently for 6 minutes until the fish is cooked through and flaky. Pour the thick first coconut milk, swirl the pan, and take off the flame. Drizzle fresh coconut oil and raw curry leaves on top.",
        tips: ["Never vigorously boil after adding thick coconut milk"]
      }
    ]
  },
  {
    id: "kolkata-egg-curry",
    title: "Dhaba Style Masala Egg Curry with Potatoes",
    subtitle: "Golden shallow-fried boiled eggs in a robust onion-tomato gravy with whole spices",
    description: "Comforting homestyle Indian egg curry featuring hard-boiled eggs scored and turmeric-fried until blistered golden, cooked alongside tender baby potatoes in a savory onion, tomato, cumin and ginger sauce.",
    cuisine: "Homestyle / Bengali",
    mealType: "Dinner",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
    calories: 340,
    protein: 22,
    carbs: 16,
    fat: 18,
    fiber: 3,
    spiceLevel: "Medium",
    rating: 4.8,
    reviewsCount: 79,
    heritageBatch: "Dhaba Classic #79",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Golden blistered eggs in rich red tomato-onion curry garnished with coriander and ginger matchsticks",
    dietaryTags: ["Non-Veg", "Eggetarian", "Quick 20m", "Budget Friendly"],
    regionalTag: "Grand Trunk Road / Bengal",
    secretTip: "Make 3 shallow lengthwise slits on each boiled egg and fry in mustard oil with a pinch of turmeric and Kashmiri mirch until the exterior skin forms a crisp golden web. This locks in the curry flavor!",
    ammaQuote: "The ultimate weekday lifesaver dinner when pantry is low. Pair with hot phulkas, parathas, or plain basmati rice.",
    ingredients: [
      { name: "Farm Fresh Eggs (Hard Boiled)", amount: 6, unit: "pieces", notes: "Peeled and lightly scored with knife", category: "produce" },
      { name: "Potatoes (Aloo)", amount: 2, unit: "medium", notes: "Halved and boiled", category: "produce" },
      { name: "Finely Chopped Onions", amount: 2, unit: "large", notes: "Caramelized deeply for rich color", category: "produce" },
      { name: "Tomato Puree", amount: 1, unit: "cup", notes: "Fresh country tomatoes pureed", category: "produce" },
      { name: "Ginger-Garlic Paste", amount: 1, unit: "tbsp", notes: "Freshly ground", category: "spices" },
      { name: "Mustard Oil / Sunflower Oil", amount: 2.5, unit: "tbsp", notes: "Mustard oil gives authentic dhaba pungency", category: "staples" },
      { name: "Garam Masala & Roasted Cumin", amount: 1, unit: "tsp", notes: "Finished at the end", category: "spices" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Golden Blister the Eggs & Potatoes",
        subtitle: "Turmeric Fry • 5 Mins",
        duration: "5 mins",
        instructions: "Heat mustard oil to smoking point, then reduce heat. Add turmeric and red chilli powder. Shallow fry the boiled eggs and halved potatoes until golden blistered. Remove and set aside.",
        tips: ["Score eggs so spices seep deep into whites"]
      },
      {
        stepNumber: 2,
        title: "Caramelize Gravy Base",
        subtitle: "Slow Onion Sauté • 8 Mins",
        duration: "8 mins",
        instructions: "In the remaining oil, add bay leaf, cardamom, and cumin seeds. Add onions and sauté until dark golden. Add ginger-garlic paste and tomato puree with coriander powder, turmeric, and salt. Cook until oil glazes the edges.",
        tips: ["Dark golden onions give deep gravy color"]
      },
      {
        stepNumber: 3,
        title: "Simmer Eggs & Finish",
        subtitle: "Rich Sauce Glaze • 7 Mins",
        duration: "7 mins",
        instructions: "Add 1 cup warm water, bring to boil. Slide in the golden eggs and potatoes. Simmer covered for 6 minutes. Sprinkle garam masala and freshly chopped coriander before serving.",
        tips: ["Serve piping hot with warm phulkas or parathas"]
      }
    ]
  },
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
