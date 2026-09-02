"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/lib/data";

const NAME_CHARS = siteConfig.name.toUpperCase().split("");

export default function Intro({ onDone }: { onDone: () => void }) {
  const [shouldRender, setShouldRender] = useState<boolean | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRowRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Intentionally NOT gated behind localStorage — plays on every full page
    // load/refresh, since people may reload just to watch the intro again.
    // The only reason to skip it is an actual accessibility signal.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setShouldRender(false);
      onDone();
      return;
    }

    setShouldRender(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const ctx = gsap.context(() => {
      charRefs.current.forEach((el) => gsap.set(el, { yPercent: 120 }));
      gsap.set([eyebrowRef.current, taglineRef.current], { opacity: 0, y: 12 });
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const progress = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
          onDone();
        },
      });
      timelineRef.current = tl;

      // 1. Quick load bar + counter
      tl.to(progress, {
        value: 100,
        duration: 0.9,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(progress.value);
          if (counterRef.current) counterRef.current.textContent = `${v}%`;
          if (barFillRef.current) barFillRef.current.style.width = `${v}%`;
        },
      });

      // 2. Preloader dismisses
      tl.to(preloaderRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.35,
        ease: "power2.in",
      });

      // 3. Eyebrow line
      tl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.05",
      );

      // 4. Big name — staggered character reveal
      tl.to(
        charRefs.current,
        { yPercent: 0, duration: 1, stagger: 0.028, ease: "power4.out" },
        "-=0.25",
      );

      // 5. Divider line draws
      tl.to(
        dividerRef.current,
        { scaleX: 1, duration: 0.6, ease: "power3.out" },
        "-=0.5",
      );

      // 6. Tagline
      tl.to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.4",
      );

      // 7. Hold briefly, then curtain-lift exit
      tl.to({}, { duration: 0.45 });
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [shouldRender, onDone]);

  function handleSkip() {
    timelineRef.current?.kill();
    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        setShouldRender(false);
        onDone();
      },
    });
  }

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-graphite"
    >
      <div className="bp-grid" aria-hidden="true" />
      <div className="bp-grain" aria-hidden="true" />

      <div className="absolute left-6 top-6 reg-mark md:left-10 md:top-10" />
      <div className="absolute right-6 top-6 reg-mark md:right-10 md:top-10" />
      <div className="absolute bottom-6 left-6 reg-mark md:bottom-10 md:left-10" />
      <div className="absolute bottom-6 right-6 reg-mark md:bottom-10 md:right-10" />

      <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest text-muted md:top-10 md:left-10">
        SISTEM
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-muted md:top-10 md:right-10">
        DRAFT-01
      </div>

      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="absolute flex flex-col items-center gap-3"
      >
        <span
          ref={counterRef}
          className="font-mono text-xs tracking-widest text-signal"
        >
          0%
        </span>
        <div className="h-px w-40 bg-line md:w-56">
          <div ref={barFillRef} className="h-full w-0 bg-signal" />
        </div>
      </div>

      {/* Kinetic name reveal */}
      <div className="relative flex flex-col items-center px-6 text-center">
        <div
          ref={eyebrowRef}
          className="mb-3 font-mono text-[11px] tracking-[0.25em] text-muted md:text-xs"
        >
          PORTOFOLIO PENGEMBANG
        </div>

        <div ref={nameRowRef} className="flex overflow-hidden">
          {NAME_CHARS.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                ref={(el) => {
                  if (el) charRefs.current[i] = el;
                }}
                className="inline-block font-display text-[16vw] font-semibold leading-none text-ink md:text-[9vw]"
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        <div ref={dividerRef} className="mt-5 h-px w-24 bg-signal md:w-32" />

        <div
          ref={taglineRef}
          className="mt-4 font-mono text-[11px] tracking-widest text-muted md:text-xs"
        >
          {siteConfig.role.toUpperCase()}
        </div>
      </div>

      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 font-mono text-[10px] tracking-widest text-muted transition-colors hover:text-signal md:bottom-10 md:right-10"
      >
        LEWATI ↷
      </button>
    </div>
  );
}
