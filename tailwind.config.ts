import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-100': '#121212',
        'dark-200': '#333333',
        'dark-300': '#5c5c5c',
        'light-100': '#ffffff',
        'light-200': '#f5f5f5',
        100: '#d3f485',
        200: '#bde39e',
        300: '#aae3c1',
        400: '#98f8dd'
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
