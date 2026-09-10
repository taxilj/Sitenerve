declare module "locomotive-scroll" {
  export interface LocomotiveScrollOptions {
    el: Element | HTMLElement | Window;
    name?: string;
    offset?: number;
    smooth?: boolean;
    direction?: "vertical" | "horizontal";
    lerp?: number;
    smartphone?: {
      smooth?: boolean;
    };
    tablet?: {
      smooth?: boolean;
    };
    class?: string;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    resetNativeScroll?: boolean;
    getDirection?: boolean;
    getSpeed?: boolean;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    start(): void;
    stop(): void;
    destroy(): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
    off(event: string, callback: (...args: unknown[]) => void): void;
    scrollTo(target: HTMLElement | Element | string | number, options?: Record<string, unknown>): void;
  }
}
