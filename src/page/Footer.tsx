import React, { useMemo } from 'react'
import Link from 'next/link'

// Memoized social links component
const SocialLinks = React.memo(() => {
  const socialLinks = useMemo(() => [
    { href: "https://www.instagram.com/qalamwebstudio?igsh=cXRvazZzajd6ZGJv&utm_source=qr", label: "Instagram" },
    { href: "https://www.behance.net/qalamwebstudio", label: "Behance" },
    { href: "https://www.linkedin.com/company/qalam-web-studio/", label: "LinkedIn" },
    { href: "https://wa.me/918141875116", label: "WhatsApp" },
  ], []);

  return (
    <>
      {socialLinks.map((link) => (
        <a 
          key={link.href}
          href={link.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-600 hover:text-emerald-700 underline transition-colors duration-200"
          aria-label={`Follow us on ${link.label}`}
        >
          {link.label}
        </a>
      ))}
    </>
  );
});
SocialLinks.displayName = 'SocialLinks';

// Memoized quick links component
const QuickLinks = React.memo(() => {
  const quickLinks = useMemo(() => [
    { href: "/", label: "Home", isInternal: true },
    { href: "/services", label: "Services", isInternal: true },
    { href: "/work", label: "Our work", isInternal: true },
    { href: "/about", label: "About us", isInternal: true },
    { href: "/Contact", label: "Contact us", isInternal: true },
  ], []);

  return (
    <>
      {quickLinks.map((link) => 
        link.isInternal ? (
          <Link 
            key={link.href}
            href={link.href} 
            className="text-gray-600 hover:text-emerald-800 underline transition-colors duration-200"
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </Link>
        ) : (
          <a 
            key={link.href}
            href={link.href} 
            className="text-gray-600 hover:text-emerald-700 underline transition-colors duration-200"
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </a>
        )
      )}
    </>
  );
});
QuickLinks.displayName = 'QuickLinks';

const FooterComponent = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer data-scroll data-scroll-speed="-.2" className="w-full h-[100vh] flex flex-col rounded-t-2xl bg-white text-[#212121] font-Neue p-[3.8vw] relative overflow-hidden">
      <div className="flex-grow pt-20 px-2">
        <h1 className="text-3xl font-bold font-Neue">
          <span className="text-emerald-700 text-[8vw] lg:text-[3vw]">SiteNerve</span>
          <br />
          Empowering Startups and Growing Businesses
        </h1>
      </div>

      <div className="flex-grow mt-5">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col space-y-4 px-4">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <address className="text-gray-600 not-italic">
              Ahmedabad, Gujarat,<br />
               India 380001
            </address>
            {/* TODO: add real SiteNerve contact email here once available */}
          </div>

          {/* Mobile: row for Follow Us and Quick Links */}
          <div className="flex flex-row w-full justify-between md:hidden mt-8 px-4">
            <div className="flex flex-col space-y-2 items-start">
              <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
              <SocialLinks />
            </div>
            <div className="flex flex-col space-y-2 items-end">
              <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
              <QuickLinks />
            </div>
          </div>

          {/* Desktop: columns for Follow Us and Quick Links */}
          <div className="hidden md:flex flex-row gap-8">
            <div className="flex flex-col space-y-4 items-end md:items-start lg:mr-36">
              <h2 className="text-xl font-semibold">Follow Us</h2>
              <div className="flex flex-col space-y-2 text-right md:text-left">
                <SocialLinks />
              </div>
            </div>
            <div className="flex flex-col space-y-4 items-end md:items-start">
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <div className="flex flex-col space-y-2 text-right md:text-left">
                <QuickLinks />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <div className="text-center text-sm text-gray-500">
          &copy; {currentYear}  SiteNerve. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

FooterComponent.displayName = 'Footer';

export const Footer = React.memo(FooterComponent);