import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import type { WorkLibraryCategory } from "@/data/work-library";

type LibraryTabId = WorkLibraryCategory;

type ShowcaseProject = {
  id: number;
  label: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  libraryTab: LibraryTabId;
};

const projects: ShowcaseProject[] = [
  {
    id: 1,
    label: "WEBSITE",
    title: "Website Projects",
    description:
      "A curated set of website projects including business sites, landing pages, and internal dashboards built for real use cases.",
    image: "https://drive.google.com/uc?export=view&id=1ROAwLfoDhSMaX8SS6ANp9dVo5biUt2C7",
    details: [
      "Business websites",
      "Landing pages",
      "Admin dashboards",
    ],
    libraryTab: "website",
  },
  {
    id: 2,
    label: "MOBILE APP",
    title: "Mobile App Projects",
    description:
      "Mobile application projects focused on usability, performance, and real-world problem solving across platforms.",
    image: "https://drive.google.com/uc?export=view&id=1QbAAVt-4yvAR-dhUbJBvzADtYCT3hwou",
    details: [
      "Android apps",
      "Booking & tracking apps",
      "Payment-based apps",
    ],
    libraryTab: "mobileApp",
  },
  {
    id: 3,
    label: "GRAPHIC DESIGN",
    title: "Graphic Case Studies",
    description:
      "Design-focused projects showcasing user flows, wireframes, and scalable interface systems for digital products.",
    image: "https://drive.google.com/uc?export=view&id=1qTQ7Sc3mjri3k6_Xc73n-1FSBOmSyEWW",
    details: [
      "Wireframes & flows",
      "Design systems",
      "Prototype case studies",
    ],
libraryTab: "Graphicdesign",
  },
  {
    id: 4,
    label: "DESKTOP APP",
    title: "Desktop Application Projects",
    description:
      "Desktop software projects built to manage operations, data, and workflows in a reliable offline-first environment.",
    image: "https://drive.google.com/uc?export=view&id=1SjpyyDhqWKW1mn8nPUfw0Mlgp_WsS6L5",
    details: [
      "Business desktop apps",
      "Inventory & billing tools",
      "Offline-capable systems",
    ],
    libraryTab: "desktopBusiness",
  },
  {
    id: 5,
    label: "CUSTOM BUSINESS SOFTWARE",
    title: "Custom Software Projects",
    description:
      "Tailored software solutions developed to automate business processes and support long-term scalability.",
    image: "https://drive.google.com/uc?export=view&id=1OKyuNUye5CbKJGuHKWDx7XGnGM3mvZKc",
    details: [
      "Workflow automation",
      "Role-based systems",
      "Custom admin tools",
    ],
    libraryTab: "desktopBusiness",
  },
  {
    id: 6,
    label: "STARTUP KIT",
    title: "Startup MVP Projects",
    description:
      "Early-stage startup projects covering MVP builds, admin panels, and core product foundations.",
    image: "https://drive.google.com/uc?export=view&id=1j4LADvaYXyXMomcA1zl58M1A0bLgkZZw",
    details: [
      "MVP applications",
      "Founder dashboards",
      "Startup-ready systems",
    ],
 libraryTab: "startupKit",
  },
  {
    id: 7,
    label: "WHITE-LABEL SERVICES",
    title: "White-Label Projects",
    description:
      "White-label development projects delivered for agencies and partners under NDA-secured collaboration.",
    image: "https://drive.google.com/uc?export=view&id=1s3eO-BnRIxLSxksbJzSga2PmNP64RImc",
    details: [
      "Agency partnerships",
      "NDA-based delivery",
      "Long-term collaborations",
    ],
    libraryTab: "desktopBusiness",
  },
];



export const Ourwork = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize GSAP animations
    gsap.set(".project-label", { opacity: 0, scale: 0.5 });
  }, []);

  const handleProjectHover = (label: string, isEntering: boolean) => {
    if (isEntering) {
      setHoveredProject(label);
      gsap.to(".project-label", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      setHoveredProject(null);
      gsap.to(".project-label", {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  };

  const handleViewProject = (tab: LibraryTabId) => {
    router.push(`/work/library?tab=${tab}`);
  };

  return (
    <section
      className="w-full bg-[#f1f1f1] text-[#212121] font-Neue p-[3.8vw] relative overflow-hidden"
      style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="w-full">
        <h1 className="text-[40px] md:text-[48px] lg:text-[52px] py-4">
          Our Work
        </h1>
      </div>
      <div className="w-full h-[1px] bg-gray-400 mb-8"></div>

      {/* Floating project label - only show on desktop */}
      <div
        className="project-label fixed inset-0 pointer-events-none items-center justify-center z-50 hidden md:flex"
        style={{
          display: hoveredProject ? "flex" : "none",
          textAlign: "center",
        }}
      >
        <h2 className="text-[120px] font-bold text-black/10 m-auto hidden md:block">
          {hoveredProject}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-full group"
              onMouseEnter={() => handleProjectHover(project.label, true)}
              onMouseLeave={() => handleProjectHover(project.label, false)}
            >
              <div className="flex items-center mb-4 text-sm font-semibold text-gray-800 tracking-wider uppercase">
                <span className="dot mr-2 w-2 h-2 bg-gray-700 rounded-full inline-block"></span>
                {project.label}
              </div>
              <div
                className="group from-white/80 via-white/60 to-emerald-50/60  min-h-[26rem] rounded-2xl border border-gray-300 overflow-hidden 
                transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl flex flex-col"
              >
                {/* Project Image */}
                <div className="relative m-4 mb-3 rounded-xl overflow-hidden aspect-[4/2]">
                  <Image
                    src={project.image}
                    alt={`${project.label} preview`}
                    fill
                    priority={project.id === 1}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Project Details */}
                <div className="flex-1 px-4 flex flex-col gap-3 pb-5">
                  <div>
                    <h3 className="text-lg font-semibold text-[#212121]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#212121] line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2 text-xs text-[#212121]/80 font-medium">
                    {project.details.map((detail) => (
                      <li
                        key={detail}
                        className="px-3 py-1 border border-[#212121]/15 rounded-full bg-white/80 backdrop-blur-sm"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleViewProject(project.libraryTab)}
                    className="mt-auto inline-flex items-center justify-center gap-2 self-end rounded-full border border-[#212121] bg-[#212121] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-x-1 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    aria-label={`View details for ${project.title}`}
                  >
                    View project
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full items-center justify-center my-10 mt-24 ">
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            onClick={() => router.push("/work/library")}
            className="overflow-hidden group flex items-center justify-center pl-8 pr-6 py-4 border bg-[#212121] hover:bg-black text-white rounded-full transition-colors  duration-200 cursor-pointer "
          >
            <span className="z-10">View all our work</span> 
            <div className="relative ml-8 w-2 h-2 group-hover:scale-500 bg-white duration-200 rounded-full">
              <ArrowUpRight className="absolute w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
