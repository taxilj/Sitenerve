'use client';

import { useState } from 'react';
import Image from 'next/image';

type ProjectPreviewPanelProps = {
  href: string;
  screenshot: string;
  name: string;
  previewLabels: string[];
};

function CssPreviewFallback({ previewLabels }: { previewLabels: string[] }) {
  return (
    <div className="bg-gradient-to-br from-[#212121] via-[#173229] to-emerald-900 p-5">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/50">
        Live Preview
      </p>
      <div className="grid grid-cols-2 gap-3">
        {previewLabels.map((label) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-4 text-xs font-medium text-white/70 backdrop-blur-sm"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectPreviewPanel({ href, screenshot, name, previewLabels }: ProjectPreviewPanelProps) {
  const domain = new URL(href).hostname;
  const [screenshotFailed, setScreenshotFailed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1210]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/60">
          {domain}
        </span>
      </div>
      {!screenshotFailed ? (
        <div className="relative aspect-[1920/842] w-full">
          <Image
            src={screenshot}
            alt={`Live screenshot of the ${name} website`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
            onError={() => setScreenshotFailed(true)}
          />
        </div>
      ) : (
        <CssPreviewFallback previewLabels={previewLabels} />
      )}
    </div>
  );
}
