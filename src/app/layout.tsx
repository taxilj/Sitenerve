import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Optimize font loading with display swap for better performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sitenerve.online"),
  title: "SiteNerve - IT Services & Digital Solutions",
  description: "Empowering startups and growing businesses with cutting-edge web development, mobile apps, and digital solutions. Transform ideas into scalable products.",
  keywords: ["web development", "mobile app development"," Desktop Software. development"," Business custom Software development"," Startup kit", "Logo & branding", "Brand cards & marketing", "White-label services", "IT services", "digital solutions", "startup", "business"],
  authors: [{ name: "SiteNerve Team" }],
  creator: "SiteNerve",
  publisher: "SiteNerve",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sitenerve.online',
    title: 'SiteNerve - IT Services & Digital Solutions',
    description: 'Empowering startups and growing businesses with cutting-edge web development, mobile apps, and digital solutions.',
    siteName: 'SiteNerve',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'SiteNerve Logo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiteNerve - IT Services & Digital Solutions',
    description: 'Empowering startups and growing businesses with cutting-edge web development, mobile apps, and digital solutions.',
    images: ['/logo.jpeg'],
  },
  icons: {
    icon: [
      { url: '/logo.jpeg', sizes: '16x16 32x32', type: 'image/jpeg' },
      { url: '/logo.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.jpeg', sizes: '16x16', type: 'image/jpeg' },
    ],
    shortcut: '/logo.jpeg',
    apple: [
      { url: '/logo.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/logo.jpeg',
        type: 'image/jpeg',
      },
      {
        rel: 'icon',
        url: '/logo.jpeg',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
        <meta name="msapplication-TileImage" content="/logo.jpeg" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hide`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SiteNerve",
            url: "https://sitenerve.online",
            logo: "https://sitenerve.online/logo.jpeg",
            sameAs: [
              "https://www.instagram.com/qalamweb.studio",
              "https://www.linkedin.com/company/qalam-web-studio/",
              "https://wa.me/918141875116",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-81418-75116",
              contactType: "customer support",
              areaServed: "IN",
              availableLanguage: ["en", "hi"],
            },
          })}
        </Script>
        {children}
      </body>
    </html>
  );
}
