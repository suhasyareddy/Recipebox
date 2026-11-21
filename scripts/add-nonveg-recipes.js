const fs = require('fs');

const nonVegRecipes = `  {
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
  },`;

let fileContent = fs.readFileSync('src/data/recipes.ts', 'utf8');

// Insert nonVegRecipes before the closing bracket of SAMPLE_RECIPES
const target = '    ]\n  }\n];\n\nexport const WEEKLY_SCHEDULE_DATA';
const replacement = '    ]\n  },\n' + nonVegRecipes + '\n];\n\nexport const WEEKLY_SCHEDULE_DATA';

if (fileContent.includes(target)) {
  fileContent = fileContent.replace(target, replacement);
  fs.writeFileSync('src/data/recipes.ts', fileContent, 'utf8');
  console.log('SUCCESS: Non-veg recipes added to SAMPLE_RECIPES!');
} else {
  console.error('Target not found in recipes.ts');
}
