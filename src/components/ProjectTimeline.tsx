'use client';

const timelineData = [
    {
        step: 1,
        title: "Discovery & Requirements",
        desc: "Understanding goals, business needs, and technical feasibility.",
        duration: "2–5 Days",
    },
    {
        step: 2,
        title: "Planning & Roadmap",
        desc: "Feature planning, milestones, and final timeline approval.",
        duration: "2–4 Days",
    },
    {
        step: 3,
        title: "UI / UX Design",
        desc: "Wireframes, visual design, and limited revisions.",
        duration: "5–10 Days",
    },
    {
        step: 4,
        title: "Development",
        desc: "Frontend, backend, database & API development.",
        duration: "10–40 Days",
    },
    {
        step: 5,
        title: "Testing & QA",
        desc: "Bug fixing, performance & device testing.",
        duration: "3–7 Days",
    },
    {
        step: 6,
        title: "Client Review",
        desc: "Live demo, feedback & refinements.",
        duration: "2–5 Days",
    },
    {
        step: 7,
        title: "Deployment",
        desc: "Server setup, domain, SSL & app publishing.",
        duration: "1–3 Days",
    },
    {
        step: 8,
        title: "Support & Maintenance",
        desc: "Post-launch support & optional AMC.",
        duration: "Ongoing",
    },
];


export default function ProjectTimeline() {



    return (
        <section className="w-full py-20 ">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-4">
                    Project Timeline
                </h2>
                <p className="text-center text-gray-500 mb-16">
                    Clear process. Predictable delivery. Zero confusion.
                </p>

                {/* Desktop Timeline */}
                <div className="hidden md:flex justify-between relative">
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" />

                    {timelineData.map((item) => (
                        <div key={item.step} className="relative w-full text-center px-3">
                            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold z-10 relative">
                                {item.step}
                            </div>

                            <h3 className="mt-6 font-semibold text-lg">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {item.desc}
                            </p>

                            <span className="inline-block mt-3 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                {item.duration}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden space-y-10">
                    {timelineData.map((item) => (
                        <div key={item.step} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                                {item.step}
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {item.desc}
                                </p>
                                <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                    {item.duration}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
