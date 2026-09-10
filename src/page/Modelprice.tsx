import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowRight } from "lucide-react";
import type { WorkLibraryCategory } from "@/data/work-library";

type PricingPlan = {
  name: string;
  price: string;
  details?: string | string[];
  popular?: boolean;
};

type PricingCategory = {
  title: string;
  description: string;
  note?: string;
  features: string[];
  plans: PricingPlan[];
};

type PricingCategoryKey =
  | "websiteDevelopment"
  | "mobileApps"
  | "desktopSoftware"
  | "redesign"
  | "Graphicdesign"
  | "startupKit"
  | "whiteLabel";

type PricingTab = {
  id: PricingCategoryKey;
  name: string;
};

const tabs: PricingTab[] = [
  { id: "mobileApps", name: "Mobile Apps" },
  { id: "websiteDevelopment", name: "Websites" },
  { id: "desktopSoftware", name: "Desktop Software" },
  { id: "redesign", name: "Website Redesign" },
  { id: "Graphicdesign", name: "Graphic design" },
  { id: "startupKit", name: "Startup Kit" },
  { id: "whiteLabel", name: "White Label" },
];

const pricingData: Record<PricingCategoryKey, PricingCategory> = {
  websiteDevelopment: {
    title: "Website Development",
    description:
      "High-performance, responsive, and SEO-ready websites built to represent your brand professionally.",
    note: "Perfect for serious commerce teams that need storefront, payments and fulfillment baked in.",
    plans: [
      {
        name: "Static Website (3–5 Pages)",
        price: "₹2,500 – ₹8,000",
        details: [
          "3–5 responsive pages with clean layout",
          "Mobile, tablet & desktop friendly design",
          "Contact form with basic validation",
          "Fast loading and simple navigation",
          "Best for small businesses and local services",
        ],
      },
      {
        name: "Business Website",
        price: "₹8,000 – ₹15,000",
        details: [
          "Up to 8 professionally designed pages",
          "Modern animations and smooth transitions",
          "SEO-ready structure for better search ranking",
          "Optimized performance and loading speed",
          "Designed to convert visitors into leads",
        ],
        popular: true,
      },
      {
        name: "Portfolio / Personal Website",
        price: "₹4,000 – ₹10,000",
        details: [
          "Modern and personal branding-focused design",
          "Showcase skills, projects, or personal brand",
          "Clean UI with smooth scrolling experience",
          "Fully responsive across all devices",
          "Ideal for freelancers, creators, and professionals",
        ],
      },
      {
        name: "Custom Website",
        price: "₹15,000+",
        details: [
          "Fully custom UI/UX tailored to business needs",
          "Advanced features and custom functionality",
          "Scalable structure for future growth",
          "High-performance and security-focused setup",
          "Perfect for startups and growing brands",
        ],
      },
    ],
    features: [
      "High-performance storefront built with modern frameworks",
      "Secure checkout, payments, and order management",
      "Inventory, fulfillment, and admin dashboard integration",
      "SEO, speed, and conversion optimization",
      "Post-launch monitoring, analytics, and growth support",
    ],
  },

  mobileApps: {
    title: "Mobile App Development",
    description:
      "Reliable and scalable mobile applications with clean UI and strong backend support.",
    features: [
      "High-quality UI/UX crafted for Android & iOS platforms",
      "Scalable backend integration with Firebase or RESTful APIs",
      "Secure authentication, data storage, and app workflows",
      "Performance optimization and device-level testing",
      "End-to-end Play Store / App Store deployment with analytics",
    ],
    plans: [
      {
        name: "Basic Android App",
        price: "₹10,000 – ₹20,000",
        details: [
          "3–5 essential app screens with clean and modern UI",
          "Firebase backend setup (Auth + Database)",
          "Basic user authentication (Login / Signup)",
          "Smooth performance with standard testing",
          "Best suited for MVPs and early-stage startups",
        ],
        popular: true,
      },
      {
        name: "Business Mobile App",
        price: "₹20,000 – ₹40,000",
        details: [
          "Complete business-ready mobile application",
          "Secure authentication & role-based access",
          "REST API integration with database",
          "Admin panel for content & user management",
          "Push notifications & basic analytics",
          "Play Store deployment support",
        ],
      },
      {
        name: "Custom App",
        price: "₹40,000+",
        details: [
          "Fully custom, feature-rich mobile application",
          "Scalable and future-ready architecture",
          "Advanced integrations (APIs, payments, third-party tools)",
          "Performance optimization & security best practices",
          "Custom UI/UX tailored to business goals",
          "Long-term scalability and upgrade support",
        ],
      },
    ],
  },

  desktopSoftware: {
    title: "Desktop Software",
    description:
      "Lightweight to enterprise-grade desktop applications built for productivity and control.",
    features: [
      "Offline-first workflows with local database support",
      "Secure installers with auto-update pipelines",
      "Optimized performance for heavy business operations",
      "Cross-platform support (Windows / macOS)",
      "Long-term maintainability and data security",
    ],
    plans: [
      {
        name: "Mini Desktop Tool",
        price: "₹8,000 – ₹18,000",
        details: [
          "Lightweight utility built using Python or Electron",
          "Local database with offline access",
          "Simple workflows and focused functionality",
          "Low system resource usage",
          "Ideal for internal tools and automation",
        ],
      },
      {
        name: "Business Desktop Software",
        price: "₹20,000 – ₹40,000",
        details: [
          "Business-grade desktop application",
          "Advanced workflows and reporting",
          "Role-based access and data security",
          "Designed for long-term business use",
        ],
        popular: true,
      },
      {
        name: "Custom Desktop ERP Software",
        price: "₹60,000+",
        details: [
          "Fully customized ERP tailored to business processes",
          "Modules for inventory, billing, accounts, and reports",
          "Offline-first architecture with secure local storage",
          "User roles, permissions, and audit logs",
          "Scalable system with future module expansion",
        ],
      },
    ],
  },


  redesign: {
    title: "Website Redesign",
    description:
      "Upgrade outdated websites with modern UI, speed, and usability improvements.",
    features: [
      "Figma-first redesign with collaborative reviews and iterations",
      "UI/UX, accessibility, SEO, and conversion-focused audits",
      "Performance optimization and Core Web Vitals improvements",
      "Migration and redesign without downtime or SEO loss",
      "Modern design aligned with current brand and user behavior",
    ],
    plans: [
      {
        name: "UI Refresh",
        price: "₹4,000 – ₹8,000",
        details: [
          "Visual design improvements and layout refinement",
          "Modern colors, typography, and spacing updates",
          "Minor UI fixes without changing core structure",
          "Best for websites that look outdated but function well",
        ],
      },
      {
        name: "Full Redesign",
        price: "₹10,000 – ₹20,000",
        details: [
          "Complete UI/UX redesign based on modern standards",
          "Performance and loading speed optimization",
          "SEO fixes and structural improvements",
          "Better usability and conversion-focused layouts",
          "Ideal for businesses planning growth or rebranding",
        ],
        popular: true,
      },
    ],
  },


  startupKit: {
    title: "Startup Kit",
    description:
      "Everything a startup needs to launch fast and look professional.",
    features: [
      "Conversion-focused marketing website with startup-ready copy",
      "Complete brand identity including logo and visual guidelines",
      "Pitch deck slides and basic investor-ready assets",
      "Automation setup for CRM, email workflows, and analytics",
      "Launch-ready setup to save time and early-stage costs",
    ],
    plans: [
      {
        name: "Basic Startup Kit",
        price: "₹15,000 – ₹25,000",
        details: [
          "Professional startup website (static or basic dynamic)",
          "Custom logo design with brand colors",
          "Domain and hosting setup guidance",
          "Basic SEO and performance optimization",
          "Ideal for early-stage or idea-stage startups",
        ],
      },
      {
        name: "Pro Startup Kit",
        price: "₹30,000 – ₹50,000",
        details: [
          "Complete startup website with advanced UI and structure",
          "Custom logo and full branding assets",
          "Mobile or desktop billing application setup",
          "Marketing creatives (banners, visiting cards, pitch visuals)",
          "Designed for startups preparing for growth or funding",
        ],
        popular: true,
      },
    ],
  },


  whiteLabel: {
    title: "White-Label Services",
    description:
      "Fully built, customizable solutions ready for resale or quick deployment.",
    features: [
      "Complete source code ownership with clear documentation",
      "Multi-tenant architecture with easy branding switches",
      "Customizable UI, logos, and color themes",
      "Resale-ready setup with deployment guidance",
      "Team training and handover for smooth client delivery",
    ],
    plans: [
      {
        name: "Delivery App Template",
        price: "₹30,000 – ₹50,000",
        details: [
          "Ready-to-use delivery app with full source code",
          "Firebase backend for authentication and data handling",
          "Order management and basic admin panel",
          "Easily rebrandable for multiple clients",
          "Ideal for agencies and food delivery startups",
        ],
        popular: true,
      },
      {
        name: "POS System",
        price: "₹25,000 – ₹45,000",
        details: [
          "Complete POS software with billing system",
          "Inventory management and stock tracking",
          "Multi-store and multi-user support",
          "Custom branding for different businesses",
          "Suitable for retail, restaurants, and franchises",
        ],
      },
      {
        name: "Agency Website",
        price: "₹20,000 – ₹40,000",
        details: [
          "Modern agency website with CMS integration",
          "SEO-optimized pages for better visibility",
          "Reusable structure for multiple client projects",
          "Easy content updates and branding changes",
          "Perfect for agencies reselling websites to clients",
        ],
      },
    ],
  },


  Graphicdesign: {
    title: "Branding & Marketing",
    description:
      "Identity, collateral, and campaign assets crafted to keep your brand consistent everywhere.",
    features: [
      "Multiple logo concepts with structured feedback and revisions",
      "Complete brand guidelines for color, typography, and usage",
      "Print and digital-ready exports for all platforms",
      "Fast creative turnaround with direct collaboration",
      "Consistent branding across online and offline touchpoints",
    ],
    plans: [
      {
        name: "Logo Design",
        price: "₹1,500 – ₹5,000",
        details: [
          "Custom logo concepts based on brand understanding",
          "Multiple revisions for final refinement",
          "Source files and high-resolution exports",
          "Usable across web, print, and social media",
        ],
      },
      {
        name: "Brand Identity Kit",
        price: "₹6,000 – ₹12,000",
        details: [
          "Custom logo with brand-aligned design",
          "Defined color palette and typography system",
          "Brand usage guidelines for consistency",
          "Assets ready for web, print, and marketing",
          "Ideal for startups and growing brands",
        ],
        popular: true,
      },
      {
        name: "Visiting / Brand Card Design",
        price: "₹1,000 – ₹3,000",
        details: [
          "Professional visiting or brand card design",
          "Print-ready files with proper bleed and margins",
          "Digital formats for sharing online",
          "Design aligned with overall brand identity",
        ],
      },
      {
        name: "Social Media Creatives",
        price: "₹2,000 – ₹6,000",
        details: [
          "Custom-designed social media posts and banners",
          "Campaign-ready creatives for promotions",
          "Consistent branding across all designs",
          "Formats optimized for major social platforms",
        ],
      },
    ],
  },

};

const libraryTabByPricing: Record<PricingCategoryKey, WorkLibraryCategory> = {
  mobileApps: "mobileApp",
  websiteDevelopment: "website",
  desktopSoftware: "desktopBusiness",
  redesign: "website",
  Graphicdesign: "Graphicdesign",
  startupKit: "startupKit",
  whiteLabel: "desktopBusiness",
};

// Memoized CheckIcon to prevent unnecessary re-renders
const CheckIcon = React.memo(() => (
  <svg
    className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const PricingCardComponent = ({
  plan,
  onSelectPlan,
}: {
  plan: PricingPlan;
  onSelectPlan: (plan: PricingPlan) => void;
}) => {
  return (
    <div
      className={`relative rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] ring-1 ring-transparent  px-7 py-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:ring-emerald-600`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-semibold tracking-wide px-4 py-1 rounded-full shadow-lg">
          Most Picked
        </span>
      )}

      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          {plan.name}
        </p>
        <p className="text-3xl md:text-3xl font-bold mt-3 text-[#212121]">
          {plan.price}
        </p>
      </div>

      {Array.isArray(plan.details) ? (
        <ul className="text-sm text-slate-600 flex-1 list-disc space-y-1 pl-5">
          {plan.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-600 flex-1">{plan.details}</p>
      )}

      <button
        onClick={() => onSelectPlan(plan)}
        className="mt-2 w-full inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:bg-[#212121f2] hover:text-white"
        aria-label={`Select ${plan.name} plan`}
      >
        Choose plan
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

PricingCardComponent.displayName = "PricingCard";

const PricingCard = React.memo(PricingCardComponent);

const FeaturesList = React.memo(({ features }: { features: string[] }) => (
  <div className="mt-5 grid gap-4 md:grid-cols-2">
    {features.map((feature) => (
      <div key={feature} className="flex items-start text-sm text-[#212121]">
        <CheckIcon />
        <span>{feature}</span>
      </div>
    ))}
  </div>
));
FeaturesList.displayName = "FeaturesList";

const ModelpriceComponent = () => {
  const [activeTab, setActiveTab] = useState<PricingCategoryKey>(
    "mobileApps"
  );
  const router = useRouter();

  const activeData = useMemo(() => pricingData[activeTab], [activeTab]);

  const handleTabChange = useCallback((tabId: PricingCategoryKey) => {
    setActiveTab(tabId);
  }, []);

  const handleViewWork = useCallback(() => {
    const targetTab = libraryTabByPricing[activeTab];
    router.push(`/work/library?tab=${targetTab}`);
  }, [activeTab, router]);

  const handlePlanSelect = useCallback(
    (plan: PricingPlan) => {
      const params = new URLSearchParams();
      params.set("service", plan.name);
      params.set("budget", plan.price);
      router.push(`/Contact?${params.toString()}#contact-form`);
    },
    [router]
  );

  const tabButtons = useMemo(
    () =>
      tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive
              ? "border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-slate-300/60"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-neutral-900"
              }`}
            aria-label={`Switch to ${tab.name} pricing`}
          >
            {tab.name}
          </button>
        );
      }),
    [activeTab, handleTabChange]
  );

  return (
    <section
      id="modelprice"
      className="relative isolate overflow-hidden py-8 md:py-24 bg-[radial-gradient(circle_at_30%_20%,rgba(33,33,33,0.05),transparent_45%),radial-gradient(circle_at_80%_0,rgba(0,0,0,0.04),transparent_50%),#f8f8f8]"
    >
      <div className="relative mx-auto max-w-6xl px-4">
        <header className="text-center">
          <p className="inline-flex items-center rounded-full border border-slate-200 bg-[#f1f1f1] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            SiteNerve pricing
          </p>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-[#212121]">
            Build, launch & grow with confidence
          </h1>
          <p className="mt-4 text-lg text-[#212121]">
            Website, mobile app, SaaS & more — pick a track above and explore
            curated plans.
          </p>
        </header>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {tabButtons}
        </div>

        <article className="mt-14 rounded-[40px] border border-slate-100 bg-gradient-to-br from-white via-white to-emerald-50  shadow-[0_35px_120px_rgba(15,23,42,0.15)] backdrop-blur-xl  p-6 lg:p-10  ">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                {activeData.title}
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                {activeData.description}
              </h2>
              {activeData.note && (
                <p className="mt-3 rounded-2xl bg-slate-900/5 px-4 py-2 text-sm text-slate-600">
                  {activeData.note}
                </p>
              )}
            </div>
            <div className="flex shrink-0">
              <button
                onClick={handleViewWork}
                className="overflow-hidden group flex items-center justify-center pl-8 pr-6 py-4 border bg-[#212121] hover:bg-black text-white rounded-full transition-colors  duration-200 cursor-pointer"
              >
                <span className="z-10">View recent work</span>
                <div className="relative ml-8 w-2 h-2 group-hover:scale-500 bg-white duration-200 rounded-full">
                  <ArrowUp className="absolute w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {activeData.plans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                onSelectPlan={handlePlanSelect}
              />
            ))}
          </div>

          <div className="mt-12 rounded-3xl  bg-transparent px-6 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#212121]">
              In every package, inclusive
            </p>
            <FeaturesList features={activeData.features} />
          </div>
        </article>
      </div>
    </section>
  );
};

ModelpriceComponent.displayName = "Modelprice";

export const Modelprice = React.memo(ModelpriceComponent);
