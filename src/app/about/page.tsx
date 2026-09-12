"use client";
import { useRef } from "react";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { Navbar } from "@/components/Navbar";
import { About } from "@/page/About";
import { Connect } from "@/page/Connect";
import { Footer } from "@/page/Footer";

export default function AboutPage() {
  
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useLocomotiveScroll(scrollContainerRef);

  return (
    <main
      ref={scrollContainerRef}
      className="min-h-screen w-full overflow-x-hidden font-Neue  text-[#212121]"
    >
      <Navbar />

      <section className="pt-32 pb-44 px-6 md:px-16 lg:px-24 font-Neue">
        <p className="uppercase text-lg tracking-[0.4em] text-emerald-600 mb-6">
          About SiteNerve
        </p>
        <h1 className="text-4xl md:text-8xl font-bold leading-tight max-w-7xl">
          We design and build bold digital products for ambitious teams.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          From strategy to shipped experiences, we align engineering, design,
          and storytelling so brands look premium and feel effortless to use.
        </p>
      </section>

      <About />

      <Connect />
      <Footer />
    </main>
  );
}
