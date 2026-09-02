"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroContent, siteConfig } from "@/lib/data";

const annotationPositions: Record<string, string> = {
  top: "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
  right: "top-1/3 right-0 translate-x-[85%]",
  bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
  left: "top-2/3 left-0 -translate-x-[85%]",
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pt-28 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-2 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            {siteConfig.availableForProjects
              ? "TERSEDIA UNTUK PROYEK"
              : "SEDANG TIDAK MENERIMA PROYEK"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[13vw] leading-[0.95] tracking-tight text-ink md:text-[5.2vw]"
          >
            {heroContent.greeting}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-3 font-mono text-sm text-signal"
          >
            {heroContent.roles.join(" · ")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-md font-body text-base leading-relaxed text-muted md:text-lg"
          >
            {heroContent.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9"
          >
            <a
              href="#work"
              data-cursor="LIHAT"
              className="inline-flex items-center gap-2 border border-line px-5 py-3 font-body text-sm text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Lihat proyek
            </a>
          </motion.div>
        </div>

        {/* RIGHT — portrait with technical annotations */}
        <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative aspect-[4/5] w-full overflow-hidden border border-line"
            data-cursor="EKSPLORASI"
          >
            <Image
              src="/248032.jpg"
              alt="Potret Rivaldi"
              fill
              className="object-cover grayscale"
              priority
            />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(255,91,46,0.12)]" />
          </motion.div>

          {heroContent.annotations.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.12 }}
              className={`absolute hidden whitespace-nowrap font-mono text-[10px] tracking-wide text-muted md:block ${annotationPositions[a.position]}`}
            >
              {a.label}
            </motion.div>
          ))}

          <div className="absolute -top-1.5 -left-1.5 reg-mark hidden md:block" />
          <div className="absolute -bottom-1.5 -right-1.5 reg-mark hidden md:block" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-muted"
      >
        GULIR UNTUK MENJELAJAH ↓
      </motion.div>
    </section>
  );
}
