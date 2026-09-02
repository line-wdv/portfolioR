"use client";

import { motion } from "framer-motion";
import { aboutContent, timeline } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-6 py-28 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl leading-tight text-ink md:text-5xl"
          >
            {aboutContent.statement}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 text-muted"
          >
            {aboutContent.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative mt-20 pl-6">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-1 h-full w-px bg-line"
          />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative grid gap-1 md:grid-cols-[160px_1fr]"
              >
                <div className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-signal" />
                <span className="font-mono text-xs text-signal">{item.period}</span>
                <div>
                  <h3 className="font-display text-lg text-ink">{item.role}</h3>
                  <p className="mt-0.5 text-sm text-muted">{item.subtitle}</p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
