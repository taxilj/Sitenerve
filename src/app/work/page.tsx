
"use client";

import { useRef } from "react";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { Navbar } from "@/components/Navbar";
import { Showcase } from "@/page/Showcase";
import { Ourwork } from "@/page/Ourwork";
import { Connect } from "@/page/Connect";
import { Footer } from "@/page/Footer";

export default function WorkPage() {
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useLocomotiveScroll(scrollContainerRef);

  return (
    <main
      ref={scrollContainerRef}
      className="min-h-screen w-full overflow-x-hidden text-[#212121]"
    >
      <Navbar />

      <section className="pt-32 pb-12 px-6 md:px-16 lg:px-24 font-Neue ">
        <p className="uppercase text-lg tracking-[0.4em] text-emerald-600 mb-6">
          Work
        </p>
        <h1 className="text-4xl md:text-8xl font-bold leading-tight max-w-7xl">
          Launches built for SaaS, consumer brands, and service companies.
        </h1>
        <p className="mt-6 max-w-7xl text-lg text-slate-600">
          A mix of flagship case studies and internal experiments showing how we
          merge strong aesthetics with measurable impact.
        </p>
      </section>

      <Showcase />
      <Ourwork />
      <Connect />
      <Footer />
    </main>
  );
}
