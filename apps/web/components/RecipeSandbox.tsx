"use client";

import React, { useState, useMemo } from "react";

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgClass: string;
  borderClass: string;
}

const INGREDIENTS: Ingredient[] = [
  { id: "dough", name: "Pizza Dough", emoji: "🍞", color: "text-amber-600", bgClass: "bg-amber-500/10", borderClass: "hover:border-amber-500" },
  { id: "tomato", name: "Ripe Tomato", emoji: "🍅", color: "text-red-500", bgClass: "bg-red-500/10", borderClass: "hover:border-red-500" },
  { id: "mozzarella", name: "Mozzarella", emoji: "🧀", color: "text-yellow-500", bgClass: "bg-yellow-500/10", borderClass: "hover:border-yellow-500" },
  { id: "basil", name: "Fresh Basil", emoji: "🌿", color: "text-emerald-500", bgClass: "bg-emerald-500/10", borderClass: "hover:border-emerald-500" },
  { id: "pasta", name: "Artisanal Pasta", emoji: "🍝", color: "text-amber-500", bgClass: "bg-amber-500/10", borderClass: "hover:border-amber-500" },
  { id: "garlic", name: "Fresh Garlic", emoji: "🧄", color: "text-stone-400", bgClass: "bg-stone-500/10", borderClass: "hover:border-stone-400" },
  { id: "oliveoil", name: "Olive Oil", emoji: "🍾", color: "text-lime-500", bgClass: "bg-lime-500/10", borderClass: "hover:border-lime-500" },
  { id: "mushroom", name: "Mushrooms", emoji: "🍄", color: "text-amber-700", bgClass: "bg-amber-700/10", borderClass: "hover:border-amber-700" },
  { id: "chicken", name: "Chicken Breast", emoji: "🍗", color: "text-orange-400", bgClass: "bg-orange-400/10", borderClass: "hover:border-orange-400" },
];

interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Chef Special";
  steps: string[];
  emoji: string;
}

export default function RecipeSandbox() {
  const [selected, setSelected] = useState<string[]>([]);
  const [cookingState, setCookingState] = useState<"idle" | "prepping" | "sizzling" | "plating" | "done">("idle");
  const [cookingProgress, setCookingProgress] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  const toggleIngredient = (id: string) => {
    if (cookingState !== "idle") return; // Block changes during cooking
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setUserRating(null); // Reset rating on recipe changes
  };

  const clearSelection = () => {
    if (cookingState !== "idle") return;
    setSelected([]);
    setCookingState("idle");
    setCookingProgress(0);
    setUserRating(null);
  };

  // Derive recipe based on selection
  const recipeResult = useMemo<Recipe | null>(() => {
    if (selected.length < 2) return null;

    const has = (id: string) => selected.includes(id);

    if (has("dough") && has("tomato") && has("mozzarella") && has("basil")) {
      return {
        title: "Wood-Fired Margherita Pizza",
        description: "A timeless classic featuring crisp leavened dough, vibrant crushed tomatoes, fresh torn mozzarella, and fragrant garden basil leaves.",
        prepTime: "15 mins",
        cookTime: "8 mins",
        difficulty: "Easy",
        emoji: "🍕",
        steps: [
          "Roll out the artisanal pizza dough on a lightly floured wooden peel.",
          "Spread a thin, even layer of fresh crushed tomato sauce leaving 1/2 inch border.",
          "Tear fresh mozzarella cheese and distribute it evenly across the surface.",
          "Bake in a preheated pizza oven or kitchen oven at 500°F (260°C) for 8 minutes until the crust is blistered.",
          "Garnish with whole fresh basil leaves, a sprinkle of sea salt, and a drizzle of extra virgin olive oil.",
        ],
      };
    }

    if (has("pasta") && has("tomato") && has("garlic") && has("oliveoil")) {
      return {
        title: "Spaghetti al Pomodoro Rustico",
        description: "Simple yet extraordinarily satisfying pasta cooked al dente, tossed in an aromatic slow-simmered garlic and tomato sauce.",
        prepTime: "10 mins",
        cookTime: "15 mins",
        difficulty: "Easy",
        emoji: "🍝",
        steps: [
          "Bring a large pot of salted water to a rolling boil and cook spaghetti until just shy of al dente.",
          "Sauté thin garlic slices in olive oil in a wide pan over medium-low heat until golden and fragrant.",
          "Add hand-crushed tomatoes and a pinch of chili flakes, cooking for 10 minutes to reduce and concentrate.",
          "Transfer pasta directly into the sauce along with a splash of starchy cooking water, tossing vigorously.",
          "Top with freshly grated pecorino or parmesan, and finish with fresh basil.",
        ],
      };
    }

    if (has("tomato") && has("mozzarella") && has("basil") && has("oliveoil")) {
      return {
        title: "Caprese Salad with Basil Infusion",
        description: "A refreshing, colorful Italian salad displaying alternating slices of vine-ripened tomatoes and creamy fresh mozzarella.",
        prepTime: "8 mins",
        cookTime: "0 mins",
        difficulty: "Easy",
        emoji: "🥗",
        steps: [
          "Cut tomatoes and fresh mozzarella logs into even, thick rounds.",
          "Arrange slices on a wide platter, alternating tomato, mozzarella, and large fresh basil leaves.",
          "Whisk together quality olive oil, cracked black pepper, and flakey sea salt.",
          "Drizzle the dressing generously over the salad.",
          "Finish with a light reduction of balsamic vinegar for a modern touch.",
        ],
      };
    }

    if (has("chicken") && has("mushroom") && has("garlic") && has("oliveoil")) {
      return {
        title: "Pan-Seared Garlic Mushroom Chicken",
        description: "Tender pan-seared chicken breasts smothered in a rich, buttery garlic and wild mushroom reduction sauce.",
        prepTime: "12 mins",
        cookTime: "20 mins",
        difficulty: "Medium",
        emoji: "🍗",
        steps: [
          "Butterfly and season the chicken breasts with kosher salt and black pepper.",
          "Sear in a hot pan with olive oil for 5-6 minutes per side until beautifully caramelized; set aside.",
          "In the same pan, toss in sliced mushrooms and sauté until they release moisture and turn deep brown.",
          "Stir in minced garlic, a pat of butter, and a splash of white wine or broth to scrape up the fond.",
          "Return chicken to the pan, coat with the glistening mushroom glaze, and simmer for 2 minutes before serving.",
        ],
      };
    }

    if (has("chicken") && has("pasta") && has("garlic") && has("oliveoil")) {
      return {
        title: "Garlic Chicken Aglio e Olio",
        description: "A rustic fusion recipe combining classic Italian garlic and oil pasta with seasoned pan-grilled chicken strips.",
        prepTime: "10 mins",
        cookTime: "18 mins",
        difficulty: "Medium",
        emoji: "🧑‍🍳",
        steps: [
          "Cook your chosen artisanal pasta in salted water.",
          "Sauté sliced chicken breast in olive oil until fully cooked and golden, then set aside.",
          "Add plenty of minced garlic to the oil over low heat, cooking slowly to prevent burning.",
          "Toss pasta and cooked chicken together with the garlic oil, adding fresh parsley and crushed red pepper.",
          "Plate immediately with a drizzle of premium raw olive oil.",
        ],
      };
    }

    // Dynamic Generic Fusion Recipe
    const nameList = selected.map(id => INGREDIENTS.find(i => i.id === id)?.name || "").filter(Boolean);
    const mainIngredient = nameList[0];
    const secondaryIngredient = nameList[1];

    return {
      title: `${mainIngredient} & ${secondaryIngredient} Fusion`,
      description: `A custom gourmet creation combining ${nameList.join(", ")} into a beautifully balanced, custom-tailored chef plate.`,
      prepTime: "12 mins",
      cookTime: "15 mins",
      difficulty: "Chef Special",
      emoji: "🥘",
      steps: [
        `Prep and portion the active ingredients: ${nameList.join(", ")}.`,
        "Preheat a cast-iron skillet or sauce pan, coated with a drizzle of oil.",
        `Incorporate ${mainIngredient} to build the base flavor profile, sautéing until fragrant.`,
        `Gently fold in ${secondaryIngredient} and the remaining ingredients, keeping textures distinct.`,
        "Simmer over low-medium heat, season with salt and secret spices, and plate with fresh herbs."
      ]
    };
  }, [selected]);

  const handleStartCooking = () => {
    if (!recipeResult) return;
    setCookingState("prepping");
    setCookingProgress(10);
    setUserRating(null);

    const runProgress = (stage: typeof cookingState, start: number, duration: number, nextStage: any) => {
      let current = start;
      const interval = setInterval(() => {
        current += 5;
        if (current >= start + duration) {
          clearInterval(interval);
          nextStage();
        } else {
          setCookingProgress(current);
        }
      }, 80);
    };

    // Phase 1: Prepping (10% - 40%)
    runProgress("prepping", 10, 30, () => {
      setCookingState("sizzling");
      // Phase 2: Sizzling (40% - 70%)
      runProgress("sizzling", 40, 30, () => {
        setCookingState("plating");
        // Phase 3: Plating (70% - 100%)
        runProgress("plating", 70, 30, () => {
          setCookingProgress(100);
          setCookingState("done");
        });
      });
    });
  };

  const getCookingLabel = () => {
    switch (cookingState) {
      case "prepping": return "Chopping & Prepping... 🔪";
      case "sizzling": return "Sautéing & Cooking... 🔥";
      case "plating": return "Plating and Garnishing... 🍽️";
      case "done": return "Served! Bon Appétit! 🎉";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Component Heading */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-200 border border-brand-500/20 mb-3">
          Interactive Sandbox
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Create & Bake Instantly
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mt-2 text-sm md:text-base max-w-xl mx-auto">
          Mix ingredients below to watch our virtual stove-top assemble, scale, and draft cooking instructions in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Ingredients Selection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
            {/* Background design glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span>Pantry Shelf</span>
                <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
                  ({selected.length} active)
                </span>
              </h3>
              {selected.length > 0 && (
                <button
                  onClick={clearSelection}
                  disabled={cookingState !== "idle"}
                  className="text-xs text-brand-500 hover:text-brand-600 font-semibold transition-colors disabled:opacity-50"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-3 gap-3">
              {INGREDIENTS.map((ing) => {
                const isSelected = selected.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    disabled={cookingState !== "idle"}
                    className={`group flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? "bg-brand-500/10 border-brand-500 shadow-sm scale-[1.03]"
                        : "bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800 " + ing.borderClass
                    } ${cookingState !== "idle" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {/* Glowing Accent */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-2 h-2 rounded-bl-lg bg-brand-500" />
                    )}

                    <span className="text-3xl mb-1.5 transition-transform duration-300 group-hover:scale-110">
                      {ing.emoji}
                    </span>
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300 group-hover:text-brand-500 transition-colors">
                      {ing.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Bowl Visualization */}
            <div className="mt-8 border-t border-stone-100 dark:border-stone-850 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                Virtual Mixing Bowl
              </h4>
              <div className="min-h-[80px] rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-dashed border-stone-200 dark:border-stone-800 p-4 flex flex-wrap gap-2 items-center justify-center transition-all">
                {selected.length === 0 ? (
                  <span className="text-xs text-stone-450 dark:text-stone-600 italic">
                    Bowl is empty. Click ingredients above to toss them in.
                  </span>
                ) : (
                  selected.map((id) => {
                    const ing = INGREDIENTS.find((i) => i.id === id);
                    if (!ing) return null;
                    return (
                      <span
                        key={id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${ing.bgClass} border-brand-500/15 animate-float`}
                        style={{
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${4 + Math.random() * 4}s`,
                        }}
                      >
                        <span>{ing.emoji}</span>
                        <span>{ing.name}</span>
                        {cookingState === "idle" && (
                          <button
                            onClick={() => toggleIngredient(id)}
                            className="ml-1 text-[10px] text-stone-400 hover:text-stone-600 transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Generated Recipe Card & Cook Simulation */}
        <div className="lg:col-span-7">
          <div className="min-h-[460px] flex flex-col justify-between rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden relative transition-all duration-300">
            {/* Header Gradient Stripe */}
            <div className="h-2 bg-gradient-to-right from-brand-500 via-accent-amber to-brand-700" />

            {cookingState !== "idle" && cookingState !== "done" ? (
              /* COOKING SIMULATOR STATE */
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center animate-pulse-slow">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-dashed border-brand-500 border-t-transparent animate-spin flex items-center justify-center">
                    <span className="text-4xl">{recipeResult?.emoji || "🍳"}</span>
                  </div>
                  {/* Small steam puffs */}
                  <span className="absolute -top-2 left-6 text-xl animate-bounce" style={{ animationDelay: "0.2s" }}>💨</span>
                  <span className="absolute -top-4 right-6 text-xl animate-bounce" style={{ animationDelay: "0.5s" }}>💨</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-2xl text-brand-500">
                    {getCookingLabel()}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Simulating cooking temperature, texture integration, and plate layout...
                  </p>
                </div>

                {/* Progress bar container */}
                <div className="w-full max-w-sm bg-stone-100 dark:bg-stone-950 rounded-full h-3 overflow-hidden border border-stone-250 dark:border-stone-800">
                  <div
                    className="h-full bg-gradient-to-right from-brand-500 to-accent-amber transition-all duration-300 rounded-full shadow-inner"
                    style={{ width: `${cookingProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-stone-400 font-mono">
                  {cookingProgress}%
                </span>
              </div>
            ) : recipeResult ? (
              /* RECIPE PRESENTATION STATE */
              <div className="flex-1 flex flex-col p-6 md:p-8">
                {/* Meta details & tags */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-850 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{recipeResult.emoji}</span>
                    <div>
                      <h3 className="font-extrabold text-xl md:text-2xl text-stone-900 dark:text-white">
                        {recipeResult.title}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Synthesized Recipe
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      recipeResult.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                      recipeResult.difficulty === "Medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                      "bg-brand-500/10 text-brand-650 dark:text-brand-300"
                    }`}>
                      {recipeResult.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-400 italic mb-6 leading-relaxed">
                  "{recipeResult.description}"
                </p>

                {/* Cook & Prep Specs */}
                <div className="grid grid-cols-2 gap-4 bg-stone-50 dark:bg-stone-950/60 rounded-xl p-4 border border-stone-100 dark:border-stone-850 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-stone-200/50 dark:bg-stone-800 rounded-lg text-stone-650 dark:text-stone-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400">Prep Work</p>
                      <p className="text-sm font-extrabold">{recipeResult.prepTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-stone-200/50 dark:bg-stone-800 rounded-lg text-stone-650 dark:text-stone-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400">Stove Time</p>
                      <p className="text-sm font-extrabold">{recipeResult.cookTime}</p>
                    </div>
                  </div>
                </div>

                {/* Steps Section */}
                <div className="space-y-3 flex-1 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Step-by-step Instructions
                  </h4>
                  <ol className="space-y-3">
                    {recipeResult.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-500/10 text-brand-650 dark:text-brand-400 flex items-center justify-center font-bold text-xs font-mono">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Footer Actions inside card */}
                {cookingState === "done" ? (
                  <div className="border-t border-stone-150 dark:border-stone-850 pt-5 mt-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">
                        How did this dish turn out?
                      </p>
                      {/* Interactive Stars */}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setUserRating(star)}
                            className="text-xl transition-transform hover:scale-125 focus:outline-none"
                          >
                            <span className={userRating !== null && star <= userRating ? "text-amber-400" : "text-stone-300 dark:text-stone-750"}>
                              ★
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={clearSelection}
                      className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold hover:bg-stone-200 dark:hover:bg-stone-750 text-sm transition-all shadow-sm"
                    >
                      Bake Another Recipe
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-stone-100 dark:border-stone-850 pt-5 mt-auto flex justify-end">
                    <button
                      onClick={handleStartCooking}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-right from-brand-550 to-brand-650 text-white font-bold hover:shadow-lg hover:shadow-brand-500/15 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Simulate Bake</span>
                      <span>🔥</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* EMPTY / IDLE STATE */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-950 flex items-center justify-center border border-stone-200 dark:border-stone-850 animate-float">
                  <span className="text-3xl">🍲</span>
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="font-bold text-lg">No Recipe Selected</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    Select 2 or more ingredients from the Pantry Shelf to synthesize a gourmet dish dynamically!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
