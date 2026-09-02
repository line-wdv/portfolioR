"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { contactContent } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(contactContent.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-line px-6 py-28 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl leading-tight text-ink md:text-6xl"
        >
          {contactContent.heading}
        </motion.h2>
        <p className="mt-4 max-w-md text-muted">
          {contactContent.statement} {contactContent.subStatement}
        </p>

        <div className="mt-12 grid gap-14 md:grid-cols-[1fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                required
                type="text"
                name="name"
                placeholder=" "
                className="peer w-full border-b border-line bg-transparent py-2.5 text-ink outline-none focus:border-signal"
              />
              <label className="pointer-events-none absolute left-0 top-2.5 text-sm text-muted transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-signal peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                Nama
              </label>
            </div>

            <div className="relative">
              <input
                required
                type="email"
                name="email"
                placeholder=" "
                className="peer w-full border-b border-line bg-transparent py-2.5 text-ink outline-none focus:border-signal"
              />
              <label className="pointer-events-none absolute left-0 top-2.5 text-sm text-muted transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-signal peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                Email
              </label>
            </div>

            <div className="relative">
              <textarea
                required
                name="message"
                rows={4}
                placeholder=" "
                className="peer w-full resize-none border-b border-line bg-transparent py-2.5 text-ink outline-none focus:border-signal"
              />
              <label className="pointer-events-none absolute left-0 top-2.5 text-sm text-muted transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-signal peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                Pesan
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-4 flex items-center gap-2 border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-signal hover:text-signal disabled:opacity-50"
            >
              {status === "sending" && "Mengirim..."}
              {status === "sent" && "Pesan terkirim"}
              {status === "error" && "Gagal, coba lagi"}
              {status === "idle" && (
                <>
                  {contactContent.ctaLabel} <ArrowUpRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className="space-y-6 font-mono text-sm">
            <div>
              <p className="text-muted">Email</p>
              <a href={`mailto:${contactContent.email}`} className="text-ink hover:text-signal">
                {contactContent.email}
              </a>
            </div>
            {contactContent.socials.map((s) => (
              <div key={s.label}>
                <p className="text-muted">{s.label}</p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-signal"
                >
                  {s.href.replace("https://", "")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
