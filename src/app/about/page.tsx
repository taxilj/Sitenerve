"use client";
import Image from "next/image";
import { useRef } from "react";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { Navbar } from "@/components/Navbar";
import { About } from "@/page/About";
import { Connect } from "@/page/Connect";
import { Footer } from "@/page/Footer";

type CoreTeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const coreTeam: CoreTeamMember[] = [
  {
    id: 1,
    name: "Sarbaz Malek",
    role: ", strategy, decision-making, and scalable system architecture and Graphic designer",
    image: "/sarbaz.jpg",
  },
  {
    id: 2,
    name: "Parihar Madhukar",
    role: "Owns frontend architecture, scalable system design, API integration & performance",
    image: "/madhukar.png",
  },
  {
    id: 3,
    name: "Virpal Sinh",
    role: "Leads AI strategy, machine learning architecture, and intelligent automation systems",
    image: "/virpal.png",
  },
  {
    id: 4,
    name: "Taxil Prajapati",
    role: "Drives marketing strategy, brand growth, and operational execution",
    image: "/takshil.png",
  },
];

type CardInfoProps = {
  member: CoreTeamMember;
};

function CardInfo({ member }: CardInfoProps) {
  return (
    <div className="bg-white border border-emerald-50 shadow-[0_20px_50px_rgba(15,23,42,0.08)] relative h-[160px] rounded-2xl flex items-center px-4 transition-transform duration-300 hover:-translate-y-1">
      <p className="text-[#212121] font-Neue text-2xl p-4 leading-tight">
        {member.name}
        <span className="mt-2 block text-sm text-[#4e4e4e]">
          {member.role}
        </span>
      </p>
    </div>
  );
}

type CardImageProps = {
  member: CoreTeamMember;
};

function CardImage({ member }: CardImageProps) {
  return (
    <div className="group shadow-[0_25px_60px_rgba(15,23,42,0.12)] relative h-[320px] rounded-2xl border border-slate-200 overflow-hidden">
      <Image
        src={member.image}
        alt={`${member.name} portrait`}
        width={220}
        height={280}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
      />
    </div>
  );
}

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

      <section className="py-44 px-6 md:px-16 lg:px-24 font-Neue">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-12">
          <div>
            <p className="uppercase text-sm tracking-[0.4em] text-emerald-600 mb-4">
              Core Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              People behind the studio
            </h2>
          </div>
          <p className="max-w-xl text-slate-600">
            Every launch is crafted by founders who stay hands-on—from first
            Figma frames to production deploys—so you always work with decision
            makers.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {coreTeam.map((member, idx) => {
            const isOdd = idx % 2 !== 0;
            return (
              <div key={member.id} className="flex flex-col gap-6">
                <div
                  className={`order-1 ${
                    isOdd ? "sm:order-2" : "sm:order-1"
                  }`}
                >
                  <CardImage member={member} />
                </div>
                <div
                  className={`order-2 ${
                    isOdd ? "sm:order-1" : "sm:order-2"
                  }`}
                >
                  <CardInfo member={member} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Connect />
      <Footer />
    </main>
  );
}
