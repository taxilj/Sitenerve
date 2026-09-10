'use client';
import React, { Suspense, useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  workLibraryProjects,
  workLibraryTabs,
  WorkLibraryProject,
} from "@/data/work-library";
import { Navbar } from "@/components/Navbar";
import { Connect } from "@/page/Connect";
import { Footer } from "@/page/Footer";

type TabId = (typeof workLibraryTabs)[number]["id"];

const tabMessaging: Record<
  TabId,
  {
    title: string;
    description: string;
  }
> = {
  all: {
    title: "Every project, launch, and system we've shipped recently.",
    description:
      "Browse work by track and see how our delivery squads handle web, mobile, desktop, automation, and branding missions. Each card outlines stack, scope, and the measurable impact.",
  },
  website: {
    title: "High-converting websites crafted for real businesses.",
    description:
      "Explore company sites, landing funnels, and marketing hubs where performance, storytelling, and SEO-backed delivery drove measurable impact.",
  },
  mobileApp: {
    title: "Mobile apps engineered for daily use and growth.",
    description:
      "From social utility to on-demand services, see React Native and native-first builds that pair smooth UX with realtime functionality.",
  },
  desktopBusiness: {
    title: "Desktop & business software that powers operations.",
    description:
      "Offline-first desktop tools, ERPs, and automation stacks built for finance, retail, and ops teams who need reliability and control.",
  },
  Graphicdesign: {
    title: "Branding, UI/UX, and marketing systems with intent.",
    description:
      "Identity kits, design systems, and campaign-ready assets that give founders and growth teams a unified visual language.",
  },
  startupKit: {
    title: "Startup kits and MVPs ready for investor demos.",
    description:
      "See turnkey product foundations—admin portals, multi-tenant SaaS shells, and white-label kits that helped teams launch faster.",
  },
};

// LibraryCard remains same
const LibraryCard = ({ project }: { project: WorkLibraryProject }) => (
  <article className="group flex flex-col rounded-[32px] border border-slate-200 from-white via-white to-emerald-50 shadow-[0_25px_70px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_35px_120px_rgba(15,23,42,0.14)]">
    <div className="relative m-5 mb-4 aspect-[4/2] overflow-hidden rounded-2xl">
      <Image
        src={project.heroImage}
        alt={`${project.title} preview`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="flex flex-1 flex-col gap-5 px-6 pb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">
          {project.stats.scope} • {project.stats.timeline}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-[#212121]">
          {project.title}
        </h2>
        <p className="mt-2 text-sm text-[#212121]/80 leading-relaxed">
          {project.summary}
        </p>
      </div>
      <ul className="grid gap-2 text-sm text-[#212121]">
        {project.deliverables.map((deliverable) => (
          <li
            key={deliverable}
            className="flex items-center gap-2 rounded-2xl border border-[#212121]/10 bg-[#f7f7f7] px-3 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            {deliverable}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm font-medium text-emerald-600">
          Impact: {project.stats.impact}
        </p>
      </div>
    </div>
  </article>
);

// Fallback remains same
function LibraryPageFallback() {
  return (
    <main className="min-h-screen bg-white text-[#212121]">
      <Navbar />
      <section className="px-6 pt-28 pb-12 md:px-16 lg:px-24 font-Neue">
        <p className="uppercase text-xs font-semibold tracking-[0.55em] text-emerald-600">
          Loading Work Library
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
          Gathering recent work…
        </h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg text-[#212121]/80">
          Hang tight while we load case studies and delivery tracks.
        </p>
      </section>
      <Footer />
    </main>
  );
}

export default function WorkLibraryPage() {
  return (
    <Suspense fallback={<LibraryPageFallback />}>
      <WorkLibraryContent />
    </Suspense>
  );
}

function WorkLibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // ✅ Yeh line sabse important hai — initial state query se set karo
  const initialTab: TabId = (() => {
    const tabParam = searchParams.get("tab");
    if (!tabParam) return "all";
    const isValid = workLibraryTabs.some((tab) => tab.id === tabParam);
    return isValid ? (tabParam as TabId) : "all";
  })();

  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  // Optional: Agar URL change ho externally (e.g. back button), toh sync karo
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const validTab = tabParam && workLibraryTabs.some((t) => t.id === tabParam)
      ? (tabParam as TabId)
      : "all";

    if (validTab !== activeTab) {
      setActiveTab(validTab);
    }
  }, [searchParams, activeTab]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return workLibraryProjects;
    return workLibraryProjects.filter((project) => project.category === activeTab);
  }, [activeTab]);

  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);

    const params = new URLSearchParams(searchParams.toString());
    if (tabId === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tabId);
    }

    const queryString = params.toString();
    router.replace(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false }
    );
  };

  useLocomotiveScroll(scrollContainerRef);

  return (
    <main ref={scrollContainerRef} className="min-h-screen text-[#212121]">
      <Navbar />

      <section className="px-6 pt-28 pb-12 md:px-16 lg:px-24 font-Neue">
        <p className="uppercase text-xs font-semibold tracking-[0.55em] text-emerald-600">
          Work Library
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
          {tabMessaging[activeTab].title}
        </h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg text-[#212121]/80">
          {tabMessaging[activeTab].description}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {workLibraryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-slate-300/60"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-neutral-900"
                }`}
                aria-label={`Filter work by ${tab.name}`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-16 lg:px-24">
        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center text-slate-600">
            No work published under this category yet. Ping us for a tailored
            case study.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <LibraryCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <Connect />
      <Footer />
    </main>
  );
}