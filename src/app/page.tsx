'use client'
import { useEffect, useCallback, useRef } from 'react';
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/page/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/page/About";
import { Showcase } from "@/page/Showcase";
import { Ourwork } from "@/page/Ourwork";
import { Clientsreviews } from "@/page/Clientsreviews";
import { Modelprice } from "@/page/Modelprice";
import { Connect } from '@/page/Connect';
import { Footer } from '@/page/Footer';
import LocomotiveScroll from 'locomotive-scroll';
import { PerformanceHighlights } from '@/components/PerformanceHighlights';

export default function Home() {
    // Memoized event handler to prevent unnecessary re-renders
    const handleRightClick = useCallback((e: MouseEvent) => {
        e.preventDefault();
    }, []);

    const scrollContainerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        document.addEventListener('contextmenu', handleRightClick);

        return () => {
            document.removeEventListener('contextmenu', handleRightClick);
        };
    }, [handleRightClick]);

    

      useEffect(() => {
        if (!scrollContainerRef.current) return;

        const locomotiveScroll = new LocomotiveScroll({
            el: scrollContainerRef.current,
            smooth: true,
        });

        return () => {
            locomotiveScroll.destroy();
        };
    }, []);


    return (
        <main
            ref={scrollContainerRef}
            className='w-full min-h-screen overflow-x-hidden overflow-y-auto scrollbar-hide text-[#212121]'
        >
            <Navbar />
            <Hero />
            <Marquee  />
            <About />
            <div className='hidden md:block'>
               <Showcase />
            </div>
            <Ourwork />
            <PerformanceHighlights />   
            <Clientsreviews />
            <Modelprice />
            <Connect />
            <Footer />
        </main>
    );
}
