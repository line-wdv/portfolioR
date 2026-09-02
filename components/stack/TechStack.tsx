"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Braces,
  Palette,
  Atom,
  Triangle,
  Wind,
  Server,
  Hexagon,
  Lock,
  Database,
  GitBranch,
  Github,
  Figma,
  Send,
  Terminal,
  Layers,
  Rocket,
  Globe,
  FileCode2,
  ShieldCheck,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { techStack } from "@/lib/data";

// Maps a tech name (case-insensitive, partial match) to an icon + one-line note.
// Anything not listed here still renders fine via the default fallback below —
// this is intentional so it keeps working even if items in lib/data.ts are edited later.
const TECH_META: { match: RegExp; icon: LucideIcon; note: string }[] = [
  { match: /html/i, icon: Code2, note: "Struktur dasar setiap halaman" },
  { match: /css|tailwind/i, icon: Palette, note: "Styling & desain sistem" },
  { match: /javascript/i, icon: Braces, note: "Logika sisi klien" },
  { match: /typescript/i, icon: FileCode2, note: "JavaScript dengan tipe aman" },
  { match: /react/i, icon: Atom, note: "Membangun antarmuka berbasis komponen" },
  { match: /next\.?js/i, icon: Triangle, note: "Framework React untuk produksi" },
  { match: /blade/i, icon: Layers, note: "Templating engine Laravel" },
  { match: /laravel/i, icon: Hexagon, note: "Framework backend utama" },
  { match: /node/i, icon: Hexagon, note: "Runtime JavaScript sisi server" },
  { match: /express/i, icon: Server, note: "Framework backend minimalis" },
  { match: /rest\s*api/i, icon: Globe, note: "Komunikasi antar layanan" },
  { match: /livewire/i, icon: Wind, note: "Interaktivitas reaktif di Laravel" },
  { match: /auth|otorisasi/i, icon: Lock, note: "Keamanan akses pengguna" },
  { match: /mysql|postgres/i, icon: Database, note: "Penyimpanan data relasional" },
  { match: /erd/i, icon: GitBranch, note: "Rancangan struktur data" },
  { match: /query/i, icon: ShieldCheck, note: "Efisiensi pengambilan data" },
  { match: /^git$/i, icon: GitBranch, note: "Kontrol versi kode" },
  { match: /github/i, icon: Github, note: "Kolaborasi & hosting repository" },
  { match: /vs ?code/i, icon: Terminal, note: "Editor kode sehari-hari" },
  { match: /figma/i, icon: Figma, note: "Desain antarmuka & prototipe" },
  { match: /postman/i, icon: Send, note: "Pengujian endpoint API" },
  { match: /vercel/i, icon: Triangle, note: "Deployment frontend" },
  { match: /railway/i, icon: Rocket, note: "Deployment backend" },
  { match: /cpanel|hosting/i, icon: Server, note: "Hosting tradisional" },
];

function getMeta(name: string) {
  const found = TECH_META.find((m) => m.match.test(name));
  return found ?? { icon: Boxes, note: "Bagian dari tumpukan teknologi" };
}

function TechCard({ name }: { name: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { icon: Icon, note } = getMeta(name);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="group relative overflow-hidden border border-line bg-surface p-5 transition-colors duration-300 hover:border-signal"
      style={{
        backgroundImage:
          "radial-gradient(180px circle at var(--x, 50%) var(--y, 50%), rgba(255,91,46,0.14), transparent 70%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center border border-line bg-graphite text-muted transition-all duration-300 group-hover:scale-110 group-hover:border-signal group-hover:text-signal">
          <Icon size={20} strokeWidth={1.6} />
        </div>
        <div>
          <h4 className="font-display text-sm text-ink">{name}</h4>
          <p className="mt-1 max-h-0 overflow-hidden font-mono text-[11px] leading-snug text-muted opacity-0 transition-all duration-300 group-hover:mt-1.5 group-hover:max-h-10 group-hover:opacity-100">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <h2 className="font-display text-4xl text-ink md:text-5xl">{techStack.heading}</h2>
        <p className="mt-2 text-muted">{techStack.subheading}</p>

        <div className="mt-14 space-y-12">
          {techStack.categories.map((cat, ci) => (
            <div key={cat.name}>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs tracking-wide text-signal">{cat.name}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (ci * 0.05 + i * 0.03) % 0.4 }}
                  >
                    <TechCard name={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="group mt-16 overflow-hidden border-y border-line py-5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap [animation-play-state:running] group-hover:[animation-play-state:paused]">
          {[...techStack.marquee, ...techStack.marquee].map((word, i) => (
            <span key={i} className="font-mono text-sm tracking-widest text-muted">
              {word} <span className="text-signal">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
