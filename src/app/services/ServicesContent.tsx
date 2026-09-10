"use client";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Modelprice } from "@/page/Modelprice";
import { Connect } from "@/page/Connect";
import { Footer } from "@/page/Footer";
import { PerformanceHighlights } from "@/components/PerformanceHighlights";
import ProjectTimeline from "@/components/ProjectTimeline";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiFigma,
  SiElectron,
  SiCanva,
  SiPython,
  SiOpenai,
  SiZapier,
} from "react-icons/si";

const techStack = [
  { label: "Next.js", icon: SiNextdotjs },
  { label: "React", icon: SiReact },
  { label: "Tailwind CSS", icon: SiTailwindcss },
  { label: "TypeScript", icon: SiTypescript },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Figma", icon: SiFigma },
  { label: "Electron", icon: SiElectron },
  { label: "React Native", icon: SiReact },
  { label: "Canva", icon: SiCanva },
  { label: "Python", icon: SiPython },
  { label: "Automation", icon: SiZapier },
  { label: "AI & ML", icon: SiOpenai },
];

export default function ServicesContent() {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  useLocomotiveScroll(scrollContainerRef);

  return (
    <main
      ref={scrollContainerRef}
      className="min-h-screen w-full overflow-x-hidden text-[#212121]"
    >
      <Navbar />
      <section className="pt-32 pb-16 px-6 md:mb-24 md:px-16 lg:px-24 font-Neue ">
        <p className="uppercase text-lg tracking-[0.4em] text-emerald-600 mb-16">
          Services
        </p>
        <h1 className="text-4xl md:text-8xl font-bold leading-tight max-w-7xl">
          Tailored product, branding, and engineering teams on demand.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-slate-600">
          Choose a plan that matches your roadmap. We scale from landing pages
          and brand refreshes to complex SaaS, marketplace, and mobile builds.
        </p>
      </section>
      <PerformanceHighlights />
      <ProjectTimeline />
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16  backdrop-blur border-y border-emerald-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="uppercase text-sm tracking-[0.35em] text-emerald-500 mb-2">
              Technology Stack
            </p>
            <h2 className="text-2xl md:text-4xl font-semibold font-Neue">
              Tools we rely on to build bold products
            </h2>
          </div>
          <div className="overflow-hidden w-full">
            <div className="marquee-track flex items-center gap-10 text-neutral-700 w-max whitespace-nowrap">
              {[...techStack, ...techStack].map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`${tech.label}-${index}`}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="text-3xl text-emerald-600">
                      <Icon aria-hidden />
                    </span>
                    <span className="text-base md:text-lg font-medium">
                      {tech.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Modelprice />
      <Connect />
      <Footer />
    </main>
  );
}
