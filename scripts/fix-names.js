const fs = require('fs');

// 1. suggestions page
let f = fs.readFileSync('src/app/suggestions/page.tsx', 'utf8');
f = f.replace(/Amma-Tested Ratios/g, "Chef-Tested Ratios");
f = f.replace(/Amma calculates/g, "RecipeBox calculates");
f = f.replace(/Amma found/g, "we found");
fs.writeFileSync('src/app/suggestions/page.tsx', f);
console.log('suggestions: done');

// 2. family-preferences page
let fp = fs.readFileSync('src/app/family-preferences/page.tsx', 'utf8');
if (!fp.includes('useAuth')) {
  fp = fp.replace('"use client";', '"use client";\n\nimport { useAuth } from "@/context/AuthContext";');
}
if (!fp.includes('const { profile } = useAuth()')) {
  fp = fp.replace(
    'export default function FamilyPreferencesPage() {',
    'export default function FamilyPreferencesPage() {\n  const { profile } = useAuth();\n  const firstName = profile?.full_name?.split(" ")[0] || "Chef";'
  );
}
fp = fp.replace(/"Amma \(Lakshmi\)"/g, '`${firstName}`');
fp = fp.replace(/Help Amma tailor/g, "Help us tailor");
fp = fp.replace(/Amma's planner/g, "The planner");
fp = fp.replace(/how Amma proportions/g, "how we proportion");
fs.writeFileSync('src/app/family-preferences/page.tsx', fp);
console.log('family: done');

// 3. recipes page author fallback
let rp = fs.readFileSync('src/app/recipes/page.tsx', 'utf8');
rp = rp.replace(/"Amma Lakshmi"/g, '"Community Chef"');
fs.writeFileSync('src/app/recipes/page.tsx', rp);
console.log('recipes: done');

// 4. favourites page author fallback
let fav = fs.readFileSync('src/app/favourites/page.tsx', 'utf8');
fav = fav.replace(/"Amma Lakshmi"/g, '"Community Chef"');
fs.writeFileSync('src/app/favourites/page.tsx', fav);
console.log('favourites: done');

// 5. AiMealGenModal
let ai = fs.readFileSync('src/components/AiMealGenModal.tsx', 'utf8');
ai = ai.replace("Amma's Quick AI Meal Gen", "Quick AI Meal Gen");
ai = ai.replace("Asking Amma for Best Combination...", "Finding Best Combination...");
ai = ai.replace("Generate Amma's Balanced Dish", "Generate Balanced Dish");
ai = ai.replace(/Amma's Top Pick/g, "Top Pick");
fs.writeFileSync('src/components/AiMealGenModal.tsx', ai);
console.log('AiMealGenModal: done');

// 6. Footer
let ft = fs.readFileSync('src/components/Footer.tsx', 'utf8');
ft = ft.replace("Amma's Meal Planner", "RecipeBox Meal Planner");
ft = ft.replace("Amma's Meal Planner", "RecipeBox Meal Planner");
fs.writeFileSync('src/components/Footer.tsx', ft);
console.log('Footer: done');

// 7. Navbar subtitle
let nb = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
nb = nb.replace("Amma&apos;s Meal Planner", "Your Meal Planner");
fs.writeFileSync('src/components/Navbar.tsx', nb);
console.log('Navbar: done');

// 8. page.tsx remaining hardcoded Amma descriptions in meal data
let pg = fs.readFileSync('src/app/page.tsx', 'utf8');
pg = pg.replace("Amma's slow-cooked", "slow-cooked");
pg = pg.replace("Amma's slow-cooked", "slow-cooked");
fs.writeFileSync('src/app/page.tsx', pg);
console.log('page.tsx meal descriptions: done');

// 9. login page placeholder
let lp = fs.readFileSync('src/app/login/page.tsx', 'utf8');
lp = lp.replace(/amma\.lakshmi/g, 'chef');
fs.writeFileSync('src/app/login/page.tsx', lp);
console.log('login: done');

// 10. register page placeholder  
let reg = fs.readFileSync('src/app/register/page.tsx', 'utf8');
reg = reg.replace(/Amma Lakshmi/g, 'Full Name');
reg = reg.replace(/amma\.lakshmi/g, 'you');
fs.writeFileSync('src/app/register/page.tsx', reg);
console.log('register: done');

console.log('\nAll Amma references replaced!');
