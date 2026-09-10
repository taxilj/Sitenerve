'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";

export const About = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const sections = Array.from(container.querySelectorAll<HTMLElement>("[data-progress-reveal]"));
        if (!sections.length) return;

        const handleScroll = () => {
            const viewportHeight = window.innerHeight || 1;
            const startTrigger = viewportHeight; // start when element bottom hits viewport bottom
            const endTrigger = viewportHeight * 0.9; // finish when element center reaches half viewport

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const distance = startTrigger - rect.bottom;
                const range = startTrigger - endTrigger + rect.height;
                const rawProgress = distance / range;
                const progress = Math.max(0, Math.min(rawProgress, 1));
                section.style.setProperty("--scroll-progress", progress.toString());
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full text-[#212121] font-Neue bg-[#f1f1f1] rounded-t-2xl "
                 style={{boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"}}>
            {/* Top Section */}
            <div className="py-16 px-6 md:px-12 lg:px-18">
                <div data-scroll data-scroll-speed=".2" className="max-w-5xl ">
                    <h2
                        data-progress-reveal
                        className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, rgba(0,0,0, calc(var(--scroll-progress, 0))) 0%, rgba(0,0,0, calc(var(--scroll-progress, 0))) 100%)",
                        }}
                    >
                        SiteNerve&#39;s Vision Redefines Digital Possibilities
                    </h2>
                    <p
                        data-progress-reveal
                        className="text-xl text-[#212121] leading-relaxed"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, rgba(0,0,0, calc(var(--scroll-progress, 0))) 0%, rgba(0,0,0, calc(var(--scroll-progress, 0))) 100%)",
                        }}
                    >
                        We are not just building solutions—we’re crafting meaningful digital transformations.
                        As a passionate team with a shared commitment to innovation, we founded <span
                        className="font-semibold">SiteNerve </span>
                        to deliver cutting-edge IT services that blend creativity with modern technology.
                    </p>
                    <button
                        onClick={() => router.push("/Contact#contact-form")}
                        className="mt-10 group relative overflow-hidden px-6 py-3 border border-gray-700 rounded-full transition-colors duration-200 focus:outline-none"
                    >
                        {/* Background animation layer */}
                        <span
                            className="absolute inset-0 bg-black scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus:scale-x-100 group-active:scale-x-100 z-0"
                        ></span>

                        {/* Text layer */}
                        <span
                            className="relative z-10 flex items-center space-x-2 text-[#212121] group-hover:text-white group-focus:text-white group-active:text-white transition-colors duration-300"
                        >
                        <span>Get in Touch Now →</span>
                         <svg
                             width="18"
                             height="18"
                             viewBox="0 0 18 18"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                         >
                          <path
                              d="M9 0L7.4325 1.5675L13.1925 7.335H0V9.665H13.1925L7.4325 15.4325L9 17L17 9L9 0Z"
                              fill="currentColor"
                          />
                         </svg>
                         </span>
                    </button>

                </div>
            </div>

            {/* Feature Section */}
            <div data-scroll data-scroll-speed=".1" className="py-16 px-6 md:px-12 lg:px-10 justify-items-end">
                <div className="max-w-5xl  grid gap-12 md:grid-cols-2">
                    <div data-progress-reveal className="space-y-4" style={{
                        maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0, calc(var(--scroll-progress, 0))) 0%, rgba(0,0,0, calc(var(--scroll-progress, 0))) 100%)",
                    }}>
                        <h3 className="text-3xl md:text-4xl  mb-4">Passion-Driven Team</h3>
                        <p className=" text-base leading-relaxed">
                            We are a team of passionate individuals who believe in building high-quality digital
                            products that are user-first, scalable, and visually impressive.
                            Our dedication to code, design, and strategy drives everything we do at SiteNerve.
                        </p>
                    </div>
                    <div data-progress-reveal style={{
                        maskImage:
                            "linear-gradient(to bottom, rgba(0,0,0, calc(var(--scroll-progress, 0))) 0%, rgba(0,0,0, calc(var(--scroll-progress, 0))) 100%)",
                    }}>
                        <h3 className="text-3xl md:text-4xl  mb-4">What We Deliver</h3>
                        <ul className="list-disc pl-5  text-base leading-loose">
                            <li>Custom Web, Mobile, and Desktop Applications</li>
                            <li>AI-Powered Intelligent Solutions</li>
                            <li>Cloud Services and Scalable Infrastructure</li>
                            <li>UI/UX with Function-Oriented Design</li>
                            <li>Secure, Timely, and Robust Development for Model Price</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Why Choose eMTrix Section */}
            <div data-scroll data-scroll-speed="-.1" className="py-20 px-6 md:px-12 lg:px-18">
                <div className="max-w-6xl mx-auto text-center">
                    <h3
                        data-progress-reveal
                        className="text-4xl md:text-5xl font-bold mb-6"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, rgba(0,0,0, calc(var(--scroll-progress, 0))) 0%, rgba(0,0,0, calc(var(--scroll-progress, 0))) 100%)",
                        }}
                    >
                        Why Choose SiteNerve
                    </h3>
                    <p
                        data-progress-reveal
                        className=" text-xl max-w-3xl mx-auto mb-12"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, rgba(0,0,0, calc(var(--scroll-progress, 0))) 0%, rgba(0,0,0, calc(var(--scroll-progress, 0))) 100%)",
                        }}
                    >
                        We&#39;re not just another IT service provider. We&#39;re your technology partners committed to
                        delivering exceptional results that drive your business forward.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left ">
                    {[
                        {
                            title: "Client-Centric Approach",
                            desc: "We prioritize your business goals and work closely with you throughout the development process."
                        },
                        {
                            title: "Cutting-Edge Technology",
                            desc: "We use the latest technologies and frameworks to ensure your solutions are future-ready."
                        },
                        {
                            title: "Quality Assurance",
                            desc: "Rigorous testing and quality checks ensure that we deliver bug-free, reliable solutions."
                        },
                        {
                            title: "Timely Delivery",
                            desc: "We respect deadlines and deliver projects on time without compromising on quality."
                        },
                        {
                            title: "Expert Team",
                            desc: "Our skilled developers and designers bring years of experience and expertise to every project."
                        },
                        {
                            title: "Long-term Partnership",
                            desc: "We build lasting relationships and provide ongoing support even after project completion."
                        }
                    ].map((item, index) => (
                        <div key={index}
                             data-progress-reveal
                             style={{
                                 maskImage:
                                     "linear-gradient(to bottom, rgba(0,0,0, calc(var(--scroll-progress, 0))) 0%, rgba(0,0,0, calc(var(--scroll-progress, 0))) 100%)",
                             }}
                             className=" p-6 rounded-xl shadow hover:shadow-md  bg-white/10 backdrop-blur-md border border-white/20 transition">
                            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
