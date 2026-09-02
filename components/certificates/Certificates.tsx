"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { certificates, type Certificate } from "@/lib/data";

const INITIAL_VISIBLE = 8;

export default function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? certificates
    : certificates.slice(0, INITIAL_VISIBLE);
  const hasMore = certificates.length > INITIAL_VISIBLE;

  return (
    <section
      id="certificates"
      className="border-t border-line px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl text-ink md:text-5xl">
              Sertifikat
            </h2>
            <p className="mt-2 text-muted">Bukti proses belajar.</p>
          </div>
          <span className="font-mono text-xs text-muted">
            {certificates.length} SERTIFIKAT
          </span>
        </div>

        <div className="mt-4 border border-dashed border-line bg-surface p-4 text-xs text-muted">
          Grid ini menampilkan sertifikat asli.
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {visible.map((cert, i) => (
            <motion.button
              key={cert.id}
              onClick={() => setActive(cert)}
              data-cursor="LIHAT"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.35,
                delay: (i % INITIAL_VISIBLE) * 0.04,
              }}
              className="group border border-line bg-surface text-left transition-colors hover:border-signal"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="line-clamp-1 font-display text-sm text-ink">
                  {cert.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {cert.issuer} · {}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs tracking-wide text-ink transition-colors hover:border-signal hover:text-signal"
            >
              {expanded
                ? "Tampilkan lebih sedikit"
                : `Lihat semua (${certificates.length})`}
              <ChevronDown
                size={14}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-graphite/90 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl border border-line bg-surface"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Tutup"
                className="absolute right-4 top-4 z-10 text-ink"
              >
                <X size={20} />
              </button>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-ink">
                  {active.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {active.issuer} · {}
                </p>
                {active.credentialUrl && (
                  <a
                    href={active.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-signal hover:underline"
                  >
                    Verifikasi kredensial
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
