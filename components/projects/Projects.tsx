"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="work" className="border-t border-line px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl text-ink md:text-5xl">Karya Terpilih</h2>
        <p className="mt-2 text-muted">Beberapa hal yang sudah saya bangun.</p>

        <div className="mt-16 space-y-24">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className="group relative aspect-[16/10] overflow-hidden border border-line"
                data-cursor="LIHAT PROYEK"
              >
                <Image
                  src={project.image}
                  alt={`Tangkapan layar ${project.name}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-muted">
                  <span className="text-signal">{project.number}</span>
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="mt-4 font-display text-3xl text-ink md:text-4xl">{project.name}</h3>

                <p className="mt-4 max-w-md leading-relaxed text-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-5">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-signal"
                    >
                      Demo langsung <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-muted">Prototipe / studi kasus</span>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-signal"
                    >
                      <Github size={14} /> Kode sumber
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
