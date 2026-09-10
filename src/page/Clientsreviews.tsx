import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";

const testimonials = [
  {
    text: "SiteNerve delivered the Immersive Photography Portfolio with buttery-smooth 3D transitions and optimized media. The site now feels cinematic and converts more portfolio inquiries.",
    initials: "IP",
    name: "PATEL TIRTH MANHARBHAI",
    EmailID: "hello@immersivephoto.com",
  },
  {
    text: "For RedSky Placement & Security, the team shipped a trust-first website with clear service flows and fast performance. Our inbound client inquiries and credibility both went up.",
    initials: "RS",
    name: "JITENDRAKUMAR",
    EmailID: "contact@redskysecurity.com",
  },
  {
    text: "The team delivered a beautiful and functional website. Extra line: Clean code and great design.",
    initials: "RS",
    name: "Rahul Singh",
    EmailID: "rahul.singh@email.com",
  },
  {
    text: "Great communication and attention to detail. Extra line: Always kept me updated on progress.",
    initials: "SP",
    name: "Sneha Patel",
    EmailID: "sneha.patel@email.com",
  },
  {
    text: "I am very happy with the final result. Thank you! Extra line: The project was completed before deadline.",
    initials: "VJ",
    name: "Vikram Joshi",
    EmailID: "vikram.joshi@email.com",
  },
  {
    text: "Outstanding work quality and professional service. SiteNerve delivered exactly what we needed for our business. Highly recommended!",
    initials: "AP",
    name: "Aashish Pande",
    EmailID: "aashishpande@wyomb.com",
  },
  {
    text: "Excellent development team with great technical expertise. They completed our project on time and exceeded our expectations.",
    initials: "UP",
    name: "Utsav Patel",
    EmailID: "up81151@gmail.com",
  },
  {
    text: "Professional approach and quality work. The team was responsive and delivered a fantastic website.",
    initials: "VS",
    name: "Virendra Singh",
    EmailID: "svirendra1052@gmail.com",
  },
];


type Testimonial = {
  text: string;
  initials?: string;
  name: string;
  EmailID: string;
};

const TestimonialCard = ({
  text,
  initials = "",
  name,
  EmailID,
}: Testimonial) => (
  <div className="card">
    <div>{text}</div>
    <div className="flex items-center gap-2 mt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
          {initials.toUpperCase()}
        </span>
      <div className="flex flex-col">
        <div className="font-medium tracking-tight leading-5">{name}</div>
        <a className="leading-5 tracking-tight" href={`mailto:${EmailID}`}>
          {EmailID}
        </a>
      </div>
    </div>
  </div>
);

interface ClientsReviewsProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

const ClientsReviews = ({
  className,
  testimonials,
  duration = 10,
}: ClientsReviewsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin();
    const el = scrollRef.current;
    if (!el) return;

    const totalHeight = el.scrollHeight / 2;
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(el, {
      y: -totalHeight,
      duration,
      ease: "linear",
      modifiers: { y: gsap.utils.unitize(v => parseFloat(v) % totalHeight) },
    });

    return () => { tl.kill(); };
  }, [duration]);

  // Duplicate data for infinite scroll
  const duplicatedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  return (
    <div className={`${className} overflow-hidden`}>
      <div ref={scrollRef} className="flex flex-col gap-6 pb-6">
        {duplicatedTestimonials.map((t, i) => (
          <TestimonialCard key={`${t.EmailID}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
};

export const Clientsreviews = () => {
  const firstColumn = useMemo(() => testimonials.slice(0, 3), []);
  const secondColumn = useMemo(() => testimonials.slice(3, 6), []);
  const thirdColumn = useMemo(() => testimonials.slice(6, 9), []);

  return (
    <section className="w-full text-[#212121] font-Neue p-[3.8vw]">
      <div className="w-full justify-center flex items-center">
        <h1 className="text-[40px] md:text-[48px] lg:text-[52px] py-4">
          Clients’ reviews
        </h1>
      </div>

      <div className="flex justify-center gap-6 px-[5.8vw] mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[80vh] overflow-hidden">
        <ClientsReviews testimonials={firstColumn} duration={18} />
        <ClientsReviews testimonials={secondColumn} className="hidden md:block" duration={22} />
        <ClientsReviews testimonials={thirdColumn} className="hidden lg:block" duration={20} />
      </div>
    </section>
  );
};
