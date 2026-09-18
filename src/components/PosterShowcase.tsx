"use client";

import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { posterProjects, type PosterProject } from "@/data/poster-projects";

type PosterShowcaseProps = {
  placement: "home" | "work";
};

function PosterPreview({ project, onOpen }: { project: PosterProject; onOpen: () => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.1)]">
      <button
        type="button"
        onClick={onOpen}
        className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
        aria-label={`Preview ${project.title}`}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
        />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
          {project.category}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-[#212121]">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-xs font-medium text-slate-500">
          <span>{project.clientLabel}</span>
          {project.year ? <span>{project.year}</span> : null}
        </div>
        {project.externalLink ? (
          <a
            href={project.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#212121] underline decoration-emerald-500 underline-offset-4 transition-colors hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
          >
            {project.externalLink.label}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function PosterLightbox({
  project,
  onClose,
  returnFocus,
}: {
  project: PosterProject;
  onClose: () => void;
  returnFocus: HTMLElement | null;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocus?.focus();
    };
  }, [onClose, returnFocus]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="poster-preview-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close poster preview"
        tabIndex={-1}
      />
      <div ref={dialogRef} className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#101916] shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">{project.category}</p>
            <h2 id="poster-preview-title" className="mt-1 text-lg font-semibold">{project.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            aria-label="Close poster preview"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="relative min-h-0 flex-1 bg-black/20">
          <Image
            src={project.image}
            alt={project.alt}
            width={1600}
            height={2000}
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="mx-auto max-h-[72vh] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function PosterShowcase({ placement }: PosterShowcaseProps) {
  const [activePoster, setActivePoster] = useState<PosterProject | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const isHome = placement === "home";

  const handleOpen = (project: PosterProject) => {
    lastFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActivePoster(project);
  };

  return (
    <section
      className={`w-full px-[3.8vw] font-Neue text-[#212121] ${isHome ? "bg-[#f1f1f1] py-[3.8vw]" : "bg-white py-16 md:py-24"}`}
      aria-labelledby={`${placement}-poster-showcase-heading`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-emerald-600">Poster Design</p>
          <h2 id={`${placement}-poster-showcase-heading`} className="mt-4 text-[32px] font-semibold leading-tight md:text-[44px] lg:text-[52px]">
            Selected Poster &amp; Campaign Creatives
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Campaign posters and social media creatives for business offers, announcements, events, and brand communication.
          </p>
        </div>

        {posterProjects.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posterProjects.map((project) => (
              <PosterPreview key={project.image} project={project} onOpen={() => handleOpen(project)} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[28px] border border-dashed border-emerald-900/25 bg-gradient-to-br from-white via-white to-emerald-50/60 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Selected Work</p>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
              Poster previews will appear here when owner-provided assets are identified and cleared for display. No placeholder artwork has been used.
            </p>
          </div>
        )}
      </div>

      {activePoster ? (
        <PosterLightbox
          project={activePoster}
          onClose={() => setActivePoster(null)}
          returnFocus={lastFocusedElement.current}
        />
      ) : null}
    </section>
  );
}
