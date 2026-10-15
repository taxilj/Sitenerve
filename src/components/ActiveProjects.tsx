'use client';

import { ExternalLink } from 'lucide-react';
import type { ActiveProject } from '@/data/active-projects';
import { activeProjects } from '@/data/active-projects';
import { ProjectPreviewPanel } from '@/components/ProjectPreviewPanel';

function StatusBadge({ status }: { status: ActiveProject['status'] }) {
  const isPrototype = status.startsWith('Prototype');
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
        isPrototype ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isPrototype ? 'bg-amber-500' : 'bg-emerald-500'} motion-safe:animate-pulse`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

function ProjectCard({ project, index }: { project: ActiveProject; index: number }) {
  return (
    <article
      className="active-project-card group relative flex flex-col rounded-[32px] border border-emerald-900/10 bg-gradient-to-br from-white via-white to-emerald-50 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_120px_rgba(15,23,42,0.18)] md:p-8"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          {project.category}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
        aria-label={`Open live preview of ${project.name} (opens in a new tab)`}
      >
        <ProjectPreviewPanel
          href={project.href}
          screenshot={project.screenshot}
          name={project.name}
          previewLabels={project.previewLabels}
        />
      </a>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-[#212121]">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-1 transition-colors hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            {project.name}
          </a>
        </h3>
        <p className="mt-2 text-sm text-slate-600 md:text-base">{project.description}</p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.features.map((feature) => (
          <li
            key={feature}
            className="rounded-full border border-[#212121]/15 bg-white/80 px-3 py-1 text-xs font-medium text-[#212121]/80 backdrop-blur-sm"
          >
            {feature}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs italic leading-relaxed text-slate-500">{project.disclaimer}</p>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 self-start rounded-full border border-[#212121] bg-[#212121] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        aria-label={`${project.ctaLabel} for ${project.name} (opens in a new tab)`}
      >
        {project.ctaLabel}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

export function ActiveProjects() {
  return (
    <section
      className="w-full bg-[#f1f1f1] px-5 py-12 sm:px-[3.8vw] sm:py-[3.8vw] font-Neue text-[#212121]"
      aria-labelledby="active-projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-emerald-600">Active Projects</p>
        <h2
          id="active-projects-heading"
          className="max-w-4xl text-[32px] font-semibold leading-tight md:text-[44px] lg:text-[52px]"
        >
          Currently building and evolving real digital products.
        </h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 md:text-lg">
          Two active software projects showing how SiteNerve turns complex business workflows into
          usable digital systems.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {activeProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
