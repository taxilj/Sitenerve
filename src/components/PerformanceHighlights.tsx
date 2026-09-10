'use client';

const performanceStats = [
  {
    label: "Average Rating",
    value: "4.9 / 5",
    detail: "Compiled from 120 partner retrospectives since 2021.",
  },
  {
    label: "Project Success",
    value: "98%",
    detail: "Launch milestones shipped on time with QA sign-off.",
  },
  {
    label: "Repeat Engagements",
    value: "82%",
    detail: "Most collaborators extend into multi-quarter retainers.",
  },
];

export function PerformanceHighlights() {
  return (
    <section className="px-6 md:px-16 lg:px-24 pb-16 md:pb-20 font-Neue">
      <div className="rounded-[40px] border border-white/40 bg-gradient-to-br from-white via-white to-emerald-50 shadow-[0_30px_90px_rgba(15,23,42,0.12)] p-8 md:p-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="uppercase text-sm tracking-[0.4em] text-emerald-600">
              Proof of execution
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
              Outcomes that keep founders, CMOs, and venture partners coming back.
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Every engagement is scored on velocity, quality, and collaboration.
              These metrics reflect the last 24 months of ship-room retros.
            </p>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-200 to-transparent md:hidden" />
          <div className="grid flex-1 gap-4 md:grid-cols-3">
            {performanceStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-emerald-100/60 bg-white px-6 py-7 shadow-[0_16px_30px_rgba(15,23,42,0.08)]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 text-4xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
