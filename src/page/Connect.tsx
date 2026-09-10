'use client';

import React, { useCallback } from "react";
import EyesFollowCursor from '@/components/EyesFollowCursor';
import { ArrowRight, ArrowUp } from "lucide-react";
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from "next/navigation";

// Memoized icon components to prevent unnecessary re-renders
const ArrowRightIcon = React.memo(() => (
  <ArrowRight className="absolute w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
));

const ArrowUpIcon = React.memo(() => (
  <ArrowUp className="absolute w-2 h-2 text-black opacity-0 group-hover:opacity-200 transition-opacity duration-300" />
));

ArrowRightIcon.displayName = 'ArrowRightIcon';
ArrowUpIcon.displayName = 'ArrowUpIcon';

ArrowRightIcon.displayName = 'ArrowRightIcon';
ArrowUpIcon.displayName = 'ArrowUpIcon';

const ConnectComponent = () => {
  const router = useRouter();
  // Memoized event handlers
  const handleContactClick = useCallback(() => {
    router.push("/Contact");
  }, [router]);

  const handleEmailClick = useCallback(() => {
    // TODO: replace with mailto:<real SiteNerve email> once configured
    router.push("/Contact");
  }, [router]);

  return (
    <section  className="w-full h-[100vh] md:h-[130vh] flex flex-col rounded-t-2xl justify-center items-center bg-emerald-700 text-[#212121] font-FoundersGrotesk font-bold p-[3.8vw] relative overflow-hidden">
      <div data-scroll data-scroll-speed=".1" className="flex flex-col items-center w-full">
            <div data-scroll data-scroll-speed=".2" className="absolute justify-center flex pointer-events-none">
                <EyesFollowCursor/>
            </div>
        <h1 className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-extrabold lg:leading-35 leading-none text-center mb-8 tracking-wide ">
          READY
          <br />
          TO START
          <br />
          THE PROJECT?
        </h1>
     
        <div className="flex flex-col items-center gap-2 w-full max-w-md mt-10 mb-10">
          <div className="flex flex-col items-center justify-center space-y-4 font-Neue tracking-wide ">
          <div className='relative w-full items-center justify-center '>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <a
                      className="group flex items-center justify-center pl-8 pr-6 py-4  bg-[#212121] hover:bg-black text-white rounded-full transition-colors  duration-200 cursor-pointer"
                      onClick={handleContactClick}
                    >
                          let&apos;s talk
                        <div
                            className='relative ml-8 w-2 h-2 group-hover:scale-500 bg-white duration-200 rounded-full'>
                            <ArrowUpRight
                                className="absolute w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </a>
                </div>
            </div>
          </div>
          <span className="text-lg font-bold">OR</span>
          <div className="flex flex-col items-center justify-center space-y-4 font-Neue tracking-wide ">
           <div className='relative w-full items-center justify-center '>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <a
                      className="group flex items-center justify-center pl-8 pr-6 py-4  bg-transparent  border border-black text-black rounded-full transition-colors  duration-200 cursor-pointer"
                      onClick={handleEmailClick}
                    >
                        email us
                        <div
                            className='relative ml-8 w-2 h-2 group-hover:scale-500 bg-black duration-200 rounded-full'>
                            <ArrowUp
                                className="absolute w-2 h-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ConnectComponent.displayName = 'Connect';

export const Connect = React.memo(ConnectComponent);
