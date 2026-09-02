import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0D0C0A",
        surface: "#161512",
        panel: "#1C1B17",
        line: "rgba(245,240,230,0.10)",
        ink: "#F2EFE9",
        muted: "#8C887E",
        signal: "#FF5B2E",
        signalDim: "rgba(255,91,46,0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(245,240,230,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,230,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
