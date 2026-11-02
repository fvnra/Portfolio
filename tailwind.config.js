/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#292a25",
        "ink-2": "#85847d",
        "ink-3": "#85847d",
        paper: "#f7f5f0",
        "paper-2": "#efede7",
        "paper-3": "#e5e0d6",
        border: "#e5e0d6",
        accent: "#256d85",
        "accent-2": "#e1edf0",
        "accent-light": "#6fa6b8",
        dark: "#292a25",
        "dark-2": "#353630",
        "dark-3": "#41423b",
        "dark-border": "rgba(247,245,240,0.14)",
        "on-dark": "#f7f5f0",
        "on-dark-2": "#b9cbbe",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(3.5rem,9vw,7rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        title: [
          "clamp(2rem,4vw,3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        label: [
          "0.6875rem",
          { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "500" },
        ],
      },
      maxWidth: { container: "1100px" },
      spacing: {
        section: "clamp(4rem, 10vw, 8rem)", // 4rem mobile → 8rem desktop
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};
