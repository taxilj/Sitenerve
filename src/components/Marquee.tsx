import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Marquee = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const content = contentRef.current;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const contentWidth = content.scrollWidth;

        gsap.to(content, {
            x: -contentWidth / 2,
            duration: 60,
            ease: 'linear',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % (contentWidth / 2)),
            },
        });
    }, []);

    const marqueeText = `
        Empowering Startups with Next-Gen Technology • 
        Turning Ideas into Scalable Digital Products • 
        Design. Develop. Deliver. • 
        Your Vision, Engineered by SiteNerve •
    `;

    return (
        <div
            ref={containerRef} data-scroll data-scroll-speed=".1"
            className="w-full py-14 md:py-20 bg-emerald-700 rounded-t-2xl overflow-hidden"
        >
            <div
                ref={contentRef}
                className="flex whitespace-nowrap  "
            >
                <h1 className="border-b border-t border-neutral-700 inline-block text-[#373737] text-[29vw] md:text-[16vw] lg:text-[16vw] leading-none pb-3 font-FoundersGrotesk uppercase px-4">
                    {marqueeText}
                </h1>
                <h1 className="border-b border-t border-neutral-700 inline-block text-[#373737] text-[29vw] md:text-[16vw] lg:text-[16vw] leading-none pb-3 font-FoundersGrotesk uppercase px-4">
                    {marqueeText}
                </h1>
            </div>
        </div>
    );
};
