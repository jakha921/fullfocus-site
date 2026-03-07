import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#22c55e",
          hover: "#16a34a",
          light: "#4ade80",
        },
        accent: {
          teal: "#14b8a6",
          blue: "#3b82f6",
        },
        muted: "#9ca3af",
        border: "#27272a",
        card: "#111111",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        noise: {
          "0%, 100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(-1%,1%)" },
          "75%": { transform: "translate(-1%,-1%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee 25s linear infinite reverse",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "noise": "noise 8s steps(2) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
