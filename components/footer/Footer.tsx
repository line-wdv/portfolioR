import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs text-muted md:flex-row">
        <span>
          {siteConfig.name} © {new Date().getFullYear()}
        </span>
        <span>Berbasis di {siteConfig.location}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          STATUS SISTEM: AKTIF
        </span>
      </div>
    </footer>
  );
}
