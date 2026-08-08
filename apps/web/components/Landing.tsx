import { prisma } from "@repo/db";
import RecipeSandbox from "./RecipeSandbox";

export default async function Landing() {
  type User = Awaited<ReturnType<typeof prisma.user.findMany>>[number];
  let users: User[] = [];
  let isDbOnline = false;

  try {
    users = await prisma.user.findMany();
    isDbOnline = true;
  } catch (error) {
    console.warn("Database is unreachable during pre-rendering. Falling back to empty users list.", error);
  }

  // Pre-configured mock culinary creators in case DB has no users
  const MOCK_CREATORS = [
    { id: 101, name: "Chef Marcus Vance", email: "marcus.v@culinary.io", role: "Head of Culinary Development", avatarBg: "from-brand-500 to-accent-amber" },
    { id: 102, name: "Elena Rostova", email: "elena.r@gourmet.net", role: "Master Pâtissier", avatarBg: "from-pink-500 to-rose-500" },
    { id: 103, name: "Lucas Sterling", email: "sterling.cooks@pantry.org", role: "Artisanal Baker & Saucier", avatarBg: "from-emerald-500 to-teal-600" },
  ];

  // Helper to extract initials safely
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "CU";
    const cleanName = name.trim();
    if (!cleanName) return "CU";
    const parts = cleanName.split(/\s+/);
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    if (first && second) {
      return (first + second).toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  // Roles to cycle through for DB users to make their profiles authentic
  const CHEF_ROLES = [
    "Executive Chef",
    "Sous Chef",
    "Chef de Cuisine",
    "Pastry Specialist",
    "Sommelier",
    "Culinary Explorer",
  ];

  const getChefRole = (id: number) => {
    return CHEF_ROLES[id % CHEF_ROLES.length];
  };

  const getChefAvatarBg = (id: number) => {
    const gradients = [
      "from-brand-500 to-accent-amber",
      "from-purple-500 to-pink-500",
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-indigo-500",
      "from-orange-500 to-red-500",
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors duration-300">
      
      {/* Premium Navbar */}
      <header className="sticky top-0 z-50 w-full glassmorphism-light border-b border-stone-200/50 dark:border-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-amber flex items-center justify-center shadow-md shadow-brand-500/20">
              <span className="text-white text-lg font-bold">🧑‍🍳</span>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-brand-600 to-brand-700 dark:from-brand-500 dark:to-accent-amber bg-clip-text text-transparent">
                RecipeBuilder
              </span>
              <span className="text-[10px] block font-mono text-stone-400 -mt-1 font-semibold">v1.0.0</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-600 dark:text-stone-300">
            <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Features</a>
            <a href="#sandbox" className="hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Builder Sandbox</a>
            <a href="#community" className="hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Culinary Community</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#sandbox"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/10 active:scale-[0.98] transition-all"
            >
              Start Baking
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-stone-250/20 dark:border-stone-900/50">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-amber/5 dark:bg-accent-amber/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-200 border border-brand-500/20 mb-6">
            ✨ Craft Your Perfect Platter
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
            Bake, Mix, and Share Your{" "}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-amber bg-clip-text text-transparent">
              Culinary Magic
            </span>
          </h1>

          <p className="text-stone-650 dark:text-stone-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            The ultimate canvas for home chefs and professional cooks. Design recipes, check ingredients, measure difficulty, and collaborate with culinary creators worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#sandbox"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/15 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Sandbox</span>
              <span>🍲</span>
            </a>
            <a
              href="#community"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-850 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Culinary Guild</span>
              <span>👥</span>
            </a>
          </div>

          {/* Floaters Decoration */}
          <div className="mt-16 relative w-full max-w-3xl mx-auto h-[120px] pointer-events-none hidden md:block">
            <div className="absolute -left-12 top-0 p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-md flex items-center gap-3 animate-float max-w-xs">
              <span className="text-2xl">🍕</span>
              <div className="text-left">
                <p className="text-xs font-bold">Margherita Pizza</p>
                <p className="text-[10px] text-emerald-500 font-semibold">Easy • 8 mins cook</p>
              </div>
            </div>

            <div className="absolute right-0 -top-8 p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-md flex items-center gap-3 animate-float-slow max-w-xs">
              <span className="text-2xl">🍝</span>
              <div className="text-left">
                <p className="text-xs font-bold">Spaghetti Pomodoro</p>
                <p className="text-[10px] text-amber-500 font-semibold">Medium • 15 mins cook</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 bg-stone-50/50 dark:bg-stone-950/20 border-b border-stone-250/20 dark:border-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Designed For Modern Kitchens
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
              Skip complex cookbooks. Get cooking with tools focused on simplicity, scale, and high-fidelity representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Smart Pantry Integration</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Toss ingredients into your digital shelf. Our system auto-calculates available recipes, saving prep time and reducing kitchen waste.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Bake Simulation</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Walk through preparation and oven phases with visual timers, difficulty ratings, and structured kitchen checklists.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 flex items-center justify-center mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Connected Creator Network</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Sync with our live database. View active culinary innovators, share ratings, and inspire other home chefs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Section */}
      <section id="sandbox" className="py-12 border-b border-stone-250/20 dark:border-stone-900/50">
        <RecipeSandbox />
      </section>

      {/* Culinary Community Section (Prisma DB Integration) */}
      <section id="community" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-650 dark:text-brand-300 border border-brand-500/15 mb-3">
                Live Community Feed
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                Our Top Culinary Creators
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mt-2 text-sm sm:text-base max-w-xl">
                Real database profiles synced live. Discover active contributors scaling recipes and building the network.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-850 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isDbOnline ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-stone-650 dark:text-stone-400">
                {isDbOnline ? "Database Online" : "Database Unreachable (Fallback Active)"}
              </span>
            </div>
          </div>

          {/* Creators Layout */}
          {users.length === 0 ? (
            <div>
              {/* If no users in Database, show beautiful mock creators but note that it's empty */}
              <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-650 dark:text-amber-300 text-xs">
                💡 Currently there are no user rows in the PostgreSQL database. Displaying our founding culinary consultants below. Add database records to see them appear live.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_CREATORS.map((c) => (
                  <div key={c.id} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-sm flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.avatarBg} flex items-center justify-center text-white font-extrabold shadow-sm`}>
                      {getInitials(c.name)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-base">{c.name}</h4>
                      <p className="text-xs text-brand-500 font-semibold">{c.role}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-405">{c.email}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-stone-105 dark:bg-stone-950 px-2 py-0.5 rounded-full text-stone-500 mt-2 font-mono">
                        🟢 Founding Chef
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((u) => (
                <div key={u.id} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-sm flex items-start gap-4 hover:-translate-y-0.5 transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getChefAvatarBg(u.id)} flex items-center justify-center text-white font-extrabold shadow-sm`}>
                    {getInitials(u.name)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base">{u.name || "Chef Anonymous"}</h4>
                    <p className="text-xs text-brand-500 font-semibold">{getChefRole(u.id)}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-405">{u.email}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full text-emerald-600 font-mono">
                        🟢 Active Chef
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-stone-100 dark:bg-stone-950 px-2 py-0.5 rounded-full text-stone-500 font-mono">
                        ID: #{u.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Waitlist Call-to-Action Section */}
      <section className="py-20 bg-stone-50/50 dark:bg-stone-950/20 border-t border-b border-stone-250/20 dark:border-stone-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 shadow-xl relative overflow-hidden">
            {/* Background design glow */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent-amber/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-3xl mb-4 inline-block animate-bounce">🚀</span>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Join the Chef Waitlist</h3>
            <p className="text-stone-650 dark:text-stone-400 text-sm md:text-base max-w-md mx-auto mb-8">
              Be the first to know when we deploy social recipe sharing, nutritional telemetry, and offline menu scales.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your chef email..."
                required
                className="flex-1 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 focus:outline-none focus:border-brand-500 text-sm transition-colors"
              />
              <button
                type="button"
                className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md shadow-brand-500/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-stone-200 dark:border-stone-900 bg-white dark:bg-stone-950/60 text-stone-500 dark:text-stone-450 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-base">🧑‍🍳</span>
            <span className="font-extrabold tracking-tight text-stone-850 dark:text-stone-300">
              RecipeBuilder Inc.
            </span>
          </div>

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} RecipeBuilder. Created with precision. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors">Github</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
