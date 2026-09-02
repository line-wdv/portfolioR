"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb,
  Hammer,
  Compass,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { journeyContent } from "@/lib/data";

// Visual layer for each chapter, keyed by chapter.number from lib/data.ts.
// Kept local (not in lib/data.ts) so it doesn't collide with content edits —
// if a chapter number here doesn't match, it falls back to a neutral default
// instead of breaking.
const CHAPTER_VISUALS: Record<string, { icon: LucideIcon; tags: string[] }> = {
  "01": { icon: Lightbulb, tags: ["Otodidak", "HTML & CSS", "Rasa penasaran"] },
  "02": {
    icon: Hammer,
    tags: ["Proyek nyata", "Multi-peran", "Skema database"],
  },
  "03": {
    icon: Compass,
    tags: ["Arsitektur sistem", "Backend", "Pendidikan lanjut"],
  },
};
const DEFAULT_VISUAL = { icon: MapPin, tags: [] as string[] };

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (prefersReducedMotion || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(cards.slice(1), {
        opacity: 0,
        y: 60,
        scale: 0.94,
        filter: "blur(6px)",
      });
      gsap.set(dotsRef.current.slice(1), {
        backgroundColor: "transparent",
        scale: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const prev = cards[i - 1];
        tl.to(
          prev,
          { opacity: 0.25, scale: 0.9, filter: "blur(3px)", duration: 1 },
          i,
        );
        tl.to(
          card,
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1 },
          i,
        );

        // Progress rail keeps step with the same timeline positions
        tl.to(
          dotsRef.current[i - 1],
          { backgroundColor: "transparent", scale: 1, duration: 0.6 },
          i,
        );
        tl.to(
          dotsRef.current[i],
          { backgroundColor: "#FF5B2E", scale: 1.4, duration: 0.6 },
          i,
        );
        tl.to(labelsRef.current[i - 1], { color: "#8C887E", duration: 0.6 }, i);
        tl.to(labelsRef.current[i], { color: "#F2EFE9", duration: 0.6 }, i);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-t border-line px-6 py-28 md:px-12"
    >
      <div className="mx-auto mb-14 w-full max-w-4xl">
        <h2 className="font-display text-4xl text-ink md:text-5xl">
          {journeyContent.heading}
        </h2>
        <p className="mt-2 text-muted">{journeyContent.subheading}</p>
      </div>

      <div className="mx-auto flex w-full max-w-3xl gap-6">
        {/* Progress rail */}
        <div className="hidden flex-shrink-0 flex-col items-center gap-8 pt-2 md:flex">
          {journeyContent.chapters.map((chapter, i) => (
            <div
              key={chapter.number}
              className="flex flex-col items-center gap-2"
            >
              <div
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
                className="h-2.5 w-2.5 rounded-full border border-signal transition-colors"
                style={{ backgroundColor: i === 0 ? "#FF5B2E" : "transparent" }}
              />
              <span
                ref={(el) => {
                  labelsRef.current[i] = el;
                }}
                className="font-mono text-[10px]"
                style={{ color: i === 0 ? "#F2EFE9" : "#8C887E" }}
              >
                {chapter.number}
              </span>
              {i < journeyContent.chapters.length - 1 && (
                <div className="h-8 w-px bg-line" />
              )}
            </div>
          ))}
        </div>

        {/* Pinned card stack */}
        <div className="relative h-[440px] w-full md:h-[480px]">
          {journeyContent.chapters.map((chapter, i) => {
            const visual = CHAPTER_VISUALS[chapter.number] ?? DEFAULT_VISUAL;
            const Icon = visual.icon;
            return (
              <div
                key={chapter.number}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="absolute inset-0 overflow-hidden border border-line bg-surface p-8 md:p-10"
              >
                {/* Watermark numeral */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -right-4 select-none font-display font-bold text-line md:-right-2"
                  style={{
                    fontSize: "clamp(6rem, 22vw, 11rem)",
                    lineHeight: 1,
                  }}
                >
                  {chapter.number}
                </span>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-line bg-graphite text-signal">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-xs text-muted md:hidden">
                      {chapter.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl text-ink md:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                    {chapter.body}
                  </p>

                  {visual.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      {visual.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
