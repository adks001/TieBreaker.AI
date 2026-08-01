export const DOMAIN_AGENTS = [
  {
    id: "auto-sports",
    name: "Auto & Sports Specialist",
    icon: "Car",
    domain: "Automotive & Sports",
    tagline: "Performance, ROI, specs, stats, and durability analysis.",
    badgeColor: "from-amber-500 to-red-600",
    themeBg: "rgba(245, 158, 11, 0.1)",
    accentColor: "#f59e0b",
    description: "Evaluates vehicles, motor sports, athletic gear, team performance, and sports strategy."
  },
  {
    id: "lifestyle-wellness",
    name: "Lifestyle & Everyday Wellness",
    icon: "HeartPulse",
    domain: "Lifestyle & Wellness",
    tagline: "Gym memberships, health insurance plans, diets, wearable trackers.",
    badgeColor: "from-teal-400 to-emerald-600",
    themeBg: "rgba(20, 184, 166, 0.1)",
    accentColor: "#14b8a6",
    subCategories: ["Gym Memberships", "Health Insurance Plans", "Diets & Nutrition", "Wearable Health Trackers"],
    description: "Evaluates gym memberships, health insurance plans, diets, wearable trackers, and everyday lifestyle decisions."
  },
  {
    id: "health-medical",
    name: "Health & Medical Advisor",
    icon: "Stethoscope",
    domain: "Health & Medical",
    tagline: "Lifestyle trade-offs, ergonomic choices, and medical guidance.",
    badgeColor: "from-emerald-400 to-teal-600",
    themeBg: "rgba(16, 185, 129, 0.1)",
    accentColor: "#10b981",
    disclaimer: "Informational only. Always consult a certified healthcare professional for medical emergencies.",
    description: "Assesses wellness programs, ergonomics, fitness routines, and health-conscious decisions."
  },
  {
    id: "career-edu",
    name: "Career & Education Counselor",
    icon: "GraduationCap",
    domain: "Career & Education",
    tagline: "Skill trajectories, college majors, job offers, and salary growth.",
    badgeColor: "from-blue-500 to-indigo-600",
    themeBg: "rgba(99, 102, 241, 0.1)",
    accentColor: "#6366f1",
    description: "Helps navigate career changes, degree programs, job offers, upskilling, and education paths."
  },
  {
    id: "tech-products",
    name: "Tech & Consumer Electronics",
    icon: "Smartphone",
    domain: "Tech & Products",
    tagline: "Gadgets, smartphones, laptops, software, and hardware comparison.",
    badgeColor: "from-cyan-400 to-blue-600",
    themeBg: "rgba(6, 182, 212, 0.1)",
    accentColor: "#06b6d4",
    description: "Deep dive into tech specs, ecosystem lock-in, battery life, performance benchmarks, and value for money."
  },
  {
    id: "finance-invest",
    name: "Finance & Investment Analyst",
    icon: "TrendingUp",
    domain: "Finance & Economy",
    tagline: "Rent vs Buy, expenditure priority, risk assessment, and ROI.",
    badgeColor: "from-green-500 to-emerald-700",
    themeBg: "rgba(34, 197, 94, 0.1)",
    accentColor: "#22c55e",
    description: "Analyzes financial trade-offs, budgeting options, capital expenditure, and asset decisions."
  },
  {
    id: "universal-agent",
    name: "Universal AI Agent Router",
    icon: "Sparkles",
    domain: "Universal / Dynamic Topic",
    tagline: "Dynamic domain expert auto-routing for ANY custom query or wildcard tie.",
    badgeColor: "from-purple-500 to-pink-600",
    themeBg: "rgba(168, 85, 247, 0.1)",
    accentColor: "#a855f7",
    description: "Dynamically adapts to any topic, niche interest, or wildcard dilemma across all fields."
  }
];

export const DOMAIN_PRIORITIES = {
  "universal-agent": [
    { key: "cost", label: "Cost & Budget", defaultVal: 50, color: "text-amber-400", accent: "accent-amber-500" },
    { key: "performance", label: "Performance & Quality", defaultVal: 75, color: "text-cyan-400", accent: "accent-cyan-500" },
    { key: "longevity", label: "Long-Term Value", defaultVal: 70, color: "text-emerald-400", accent: "accent-emerald-500" },
    { key: "convenience", label: "Convenience & Ease", defaultVal: 60, color: "text-indigo-400", accent: "accent-indigo-500" }
  ],
  "lifestyle-wellness": [
    { key: "healthOutcomes", label: "Health Outcomes", defaultVal: 85, color: "text-teal-400", accent: "accent-teal-500" },
    { key: "longevity", label: "Long-Term Sustainability", defaultVal: 80, color: "text-emerald-400", accent: "accent-emerald-500" },
    { key: "cost", label: "Out-of-Pocket Expense", defaultVal: 65, color: "text-amber-400", accent: "accent-amber-500" },
    { key: "convenience", label: "Accessibility & Ease", defaultVal: 75, color: "text-cyan-400", accent: "accent-cyan-500" },
    { key: "coverage", label: "Coverage & Benefits Limits", defaultVal: 70, color: "text-indigo-400", accent: "accent-indigo-500" }
  ],
  "auto-sports": [
    { key: "cost", label: "Fuel & Upfront Cost", defaultVal: 60, color: "text-amber-400", accent: "accent-amber-500" },
    { key: "performance", label: "Power & Speed/Specs", defaultVal: 80, color: "text-cyan-400", accent: "accent-cyan-500" },
    { key: "longevity", label: "Reliability & Resale", defaultVal: 75, color: "text-emerald-400", accent: "accent-emerald-500" },
    { key: "convenience", label: "Safety & Maintenance", defaultVal: 70, color: "text-indigo-400", accent: "accent-indigo-500" }
  ],
  "health-medical": [
    { key: "cost", label: "Treatment / Gear Cost", defaultVal: 50, color: "text-amber-400", accent: "accent-amber-500" },
    { key: "performance", label: "Proven Effectiveness", defaultVal: 85, color: "text-cyan-400", accent: "accent-cyan-500" },
    { key: "longevity", label: "Long-Term Wellness Impact", defaultVal: 90, color: "text-emerald-400", accent: "accent-emerald-500" },
    { key: "convenience", label: "Safety & Ease of Habit", defaultVal: 80, color: "text-indigo-400", accent: "accent-indigo-500" }
  ],
  "career-edu": [
    { key: "cost", label: "Tuition / Opportunity Cost", defaultVal: 60, color: "text-amber-400", accent: "accent-amber-500" },
    { key: "performance", label: "Salary & Growth Potential", defaultVal: 85, color: "text-cyan-400", accent: "accent-cyan-500" },
    { key: "longevity", label: "Future-Proofing & Prestige", defaultVal: 80, color: "text-emerald-400", accent: "accent-emerald-500" },
    { key: "convenience", label: "Work-Life Balance", defaultVal: 65, color: "text-indigo-400", accent: "accent-indigo-500" }
  ],
  "tech-products": [
    { key: "cost", label: "Price / Value for Money", defaultVal: 65, color: "text-amber-400", accent: "accent-amber-500" },
    { key: "performance", label: "Speed & Processing Specs", defaultVal: 90, color: "text-cyan-400", accent: "accent-cyan-500" },
    { key: "longevity", label: "Battery & Build Quality", defaultVal: 80, color: "text-emerald-400", accent: "accent-emerald-500" },
    { key: "convenience", label: "Ecosystem & Ease of Use", defaultVal: 75, color: "text-indigo-400", accent: "accent-indigo-500" }
  ],
  "finance-invest": [
    { key: "cost", label: "Initial Capital Outlay", defaultVal: 70, color: "text-amber-400", accent: "accent-amber-500" },
    { key: "performance", label: "Expected Yield / ROI", defaultVal: 85, color: "text-cyan-400", accent: "accent-cyan-500" },
    { key: "longevity", label: "Capital Security & Risk", defaultVal: 90, color: "text-emerald-400", accent: "accent-emerald-500" },
    { key: "convenience", label: "Liquidity & Tax Flexibility", defaultVal: 65, color: "text-indigo-400", accent: "accent-indigo-500" }
  ]
};

export const PRESET_DILEMMAS = [
  {
    title: "Comprehensive PPO vs High-Deductible HSA Plan",
    domainId: "lifestyle-wellness",
    category: "Health Insurance & Wellness",
    options: ["Comprehensive PPO Health Plan", "High-Deductible Plan + HSA"],
    question: "Comparing family health insurance plans: Should I pick a Comprehensive PPO Plan with higher monthly premiums or a High-Deductible Plan with a Tax-Advantaged HSA?",
    priorities: { healthOutcomes: 85, longevity: 80, cost: 70, convenience: 75, coverage: 90 }
  },
  {
    title: "Apple Watch Ultra 2 vs Garmin Fenix 7 Pro",
    domainId: "lifestyle-wellness",
    category: "Wearable Trackers",
    options: ["Apple Watch Ultra 2", "Garmin Fenix 7 Pro"],
    question: "Looking for a health & fitness tracker for marathon training and sleep tracking: Apple Watch Ultra 2 or Garmin Fenix 7 Pro?",
    priorities: { healthOutcomes: 90, longevity: 90, cost: 60, convenience: 85, coverage: 70 }
  },
  {
    title: "iPhone 16 Pro vs Samsung Galaxy S24 Ultra",
    domainId: "tech-products",
    category: "Consumer Tech",
    options: ["iPhone 16 Pro", "Samsung Galaxy S24 Ultra"],
    question: "Should I upgrade to iPhone 16 Pro or Samsung Galaxy S24 Ultra for long-term photography, battery, and AI productivity?",
    priorities: { cost: 40, performance: 90, longevity: 85, convenience: 80 }
  },
  {
    title: "Electric SUV vs Plug-in Hybrid Sedan",
    domainId: "auto-sports",
    category: "Automotive",
    options: ["Pure Electric SUV", "Plug-in Hybrid Sedan"],
    question: "I commute 40km daily and take 600km road trips twice a month. Should I buy a Pure EV SUV or Plug-in Hybrid Sedan?",
    priorities: { cost: 70, performance: 75, longevity: 80, convenience: 90 }
  },
  {
    title: "Data Science Degree vs Full-Stack Web Bootcamp",
    domainId: "career-edu",
    category: "Career & Education",
    options: ["Master's in Data Science", "Full-Stack Web Dev Bootcamp"],
    question: "I have a non-CS background. Should I enroll in a 2-year Master's in Data Science or a 6-month Full-Stack Web Development Bootcamp for fastest ROI & career transition?",
    priorities: { cost: 85, performance: 80, longevity: 90, convenience: 60 }
  },
  {
    title: "Buying a House vs Investing in Index Funds & Renting",
    domainId: "finance-invest",
    category: "Personal Finance",
    options: ["Buy Primary Residence (Mortgage)", "Rent & Invest Surplus in Index Funds"],
    question: "In the current market, is it financially wiser to buy a home with a 20% down payment or rent modestly and invest the difference into low-cost index funds?",
    priorities: { cost: 90, performance: 80, longevity: 95, convenience: 70 }
  }
];
