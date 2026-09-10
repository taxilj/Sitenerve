"use client";
import { RefObject, useEffect } from "react";

export function useLocomotiveScroll(ref: RefObject<HTMLElement | null>) {

  useEffect(() => {
    if (!ref.current) return;

    let instance: { destroy(): void } | null = null;
    let mounted = true;

    (async () => {
      const { default: LocomotiveScroll } = await import("locomotive-scroll");
      if (!mounted || !ref.current) return;

      instance = new LocomotiveScroll({
        el: ref.current,
        smooth: true,
      });
    })();

    return () => {
      mounted = false;
      instance?.destroy();
      instance = null;
    };
  }, [ref]);
}