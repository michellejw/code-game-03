import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'londrina-shadow': ['var(--font-londrina-shadow)'],
        'londrina-solid': ['var(--font-londrina-solid)'],
        'inconsolata': ['var(--font-inconsolata)'],
      },
      fontSize: {
        '6xl': '4rem',
        '5xl': '3rem',
        '4xl': '2.5rem',
        '3xl': '2rem',
        '2xl': '1.5rem',
        'xl': '1.25rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
