"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none)").matches;
    setIsTouch(touch);
    if (touch) return;

    const pos = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
    };

    let raf = 0;
    const animateRing = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    animateRing();

    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll<HTMLElement>("[data-cursor]");
    const handlers: Array<() => void> = [];

    targets.forEach((el) => {
      const enter = () => setLabel(el.dataset.cursor || null);
      const leave = () => setLabel(null);
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      handlers.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      handlers.forEach((off) => off());
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: label ? 84 : 34,
          height: label ? 84 : 34,
          transition: "width 200ms ease, height 200ms ease",
        }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
