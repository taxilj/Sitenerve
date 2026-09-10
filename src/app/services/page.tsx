import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | SiteNerve",
  description:
    "Explore SiteNerve's on-demand product, branding, and engineering teams. We craft SaaS, marketplaces, mobile apps, and custom platforms tailored to your roadmap.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | SiteNerve",
    description:
      "Choose a SiteNerve plan that matches your roadmap—from brand refreshes to large-scale SaaS builds.",
    url: "https://sitenerve.online/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
