"use client";
import Link from "next/link";
import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Logo = forwardRef<HTMLAnchorElement, { fill?: string; className?: string }>(
  ({ fill = "#212121", className = "" }, ref) => (
    <Link ref={ref} href="/" className={`logo ${className}`} aria-label="Go to homepage">
      <svg
        width="260"
        height="50"
        viewBox="0 0 260 50"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SiteNerve Logo"
      >
        <defs>
          <filter id={`shadow-${fill.replace("#", "")}`} x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="1" dy="1" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <text
          x="0"
          y="35"
          style={{
            fontWeight: "600",
            fontFamily: "Neue",
            fontSize: "clamp(24px, 5vw, 32px)",
            letterSpacing: "1px",
          }}
          fill={fill}
        >
          SiteNerve
        </text>
      </svg>
    </Link>
  )
);

Logo.displayName = "Logo";

// Single source of truth for navigation items
const navItems = [
  { label: "Services", href: "/services" },
  { label: "Our work", href: "/work" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/Contact" },
];

let navbarAnimationPlayed = false;

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(navbarAnimationPlayed);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const createHoverHandler = useCallback((isEnter: boolean) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget;
      const textWrap = target.querySelector<HTMLElement>(".text-wrap");
      const underline = target.querySelector<HTMLSpanElement>(".underline");

      if (!textWrap || !underline) return;

      if (isEnter) {
        gsap.to(textWrap, { y: "-50%", duration: 0.4, ease: "power2.out" });
        gsap.to(underline, { width: "100%", duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(textWrap, { y: "0%", duration: 0.4, ease: "power2.out" });
        gsap.to(underline, { width: "0%", duration: 0.4, ease: "power2.out" });
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    navbarAnimationPlayed = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      tl.from(navBarRef.current, {
        y: -30,
        opacity: 0,
      })
        .from(
          logoRef.current,
          {
            y: -20,
            opacity: 0,
          },
          "-=0.2"
        )
        .from(
          navLinksRef.current?.children || [],
          {
            y: -20,
            opacity: 0,
            stagger: 0.15, // 🔥 one by one
          },
          "-=0.1"
        );
    });

    return () => ctx.revert();
  }, []);


  useLayoutEffect(() => {
    if (!menuRef.current || !menuOverlayRef.current || !menuContentRef.current) return;

    const ctx = gsap.context(() => {
      if (mobileMenuOpen) {
        gsap.set(menuRef.current, { display: "block" });

        const tl = gsap.timeline();
        tl.to(menuOverlayRef.current, {
          clipPath: "circle(150% at center)",
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        }).to(
          menuContentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.5"
        );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(menuRef.current, { display: "none" });
          },
        });
        tl.to(menuOverlayRef.current, {
          clipPath: "circle(0% at top center)",
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
        }).to(
          menuContentRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        );
      }
    });

    return () => ctx.revert();
  }, [mobileMenuOpen]);

  return (
    <div ref={navBarRef} className="w-full px-8 md:px-10 lg:px-16 py-2 bg-transparent backdrop-blur-sm flex flex-row items-center justify-between font-Neue fixed z-50">
      {/* Logo */}
      <Logo ref={logoRef} />

      {/* Desktop Navigation */}
      <div ref={navLinksRef} className="nav-links gap-10 hidden md:flex">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative cursor-pointer overflow-hidden h-6 ${index === 3 ? "lg:ml-60" : ""}`}
            onMouseEnter={createHoverHandler(true)}
            onMouseLeave={createHoverHandler(false)}
          >
            <div className="text-wrap flex flex-col">
              <span className="inline-block text-[17px] font-Neue">{item.label}</span>
              <span className="inline-block text-[17px] font-Neue">{item.label}</span>
            </div>
            <span className="underline absolute bottom-0 left-0 h-[1px] bg-[#212121]" style={{ width: "0%" }} />
          </Link>
        ))}
      </div>
      {/* Mobile Menu */}
      <div className="mobile md:hidden">
        <div
          className="menu-icon flex justify-end cursor-pointer z-50 relative"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-200"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </div>

        {/* Fullscreen Overlay Mobile Menu */}
        <div
          ref={menuRef}
          className="fixed inset-0 w-full min-h-screen z-40"
          style={{ display: "none" }}
        >
          <div ref={menuOverlayRef} className="absolute inset-0 bg-[#212121]" style={{ clipPath: "circle(0% at top center)" }} />

          <div ref={menuContentRef} className="relative h-full w-full px-10 py-3 text-white" style={{ opacity: 0, transform: "translateY(-30px)" }}>
            <div className="text-white text-3xl font-bold mb-8 flex-1">
              <Logo fill="#f1f1f1" className="inline-block" />
            </div>

            <div className="flex flex-col font-FoundersGrotesk cursor-pointer">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[62px] md:text-6xl leading-[0.9] hover:text-gray-300 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  {item.label.toUpperCase()}
                </Link>
              ))}
            </div>

            <div className="mt-24">
              <p className="text-gray-400 mb-2">S:</p>
              <div className="flex flex-col gap-2 text-blue-400 underline">
                <a href="https://www.instagram.com/sitenerve.online/" className="hover:text-blue-300">Instagram</a>
                <a href="https://www.linkedin.com/in/site-nerve-656145421" className="hover:text-blue-300">LinkedIn</a>
                <a href="https://wa.me/919104980549" className="hover:text-green-700">WhatsApp</a>
                <a href="https://www.behance.net/qalamwebstudio" className="hover:text-blue-300">Behance</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};