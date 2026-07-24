/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dominant: "#FAFAFB", // Alabaster White / Warm Bone
          navy: "#1A2B49",     // Deep Ocean Navy (Primary Text)
          blue: "#0A5C96",     // Santorini Royal Blue (Accent CTA)
          gold: "#DFB15B"      // Warm Sand Gold (Accent Glow/Hover)
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"]
      },
      boxShadow: {
        'organic': '0px 10px 30px rgba(26, 43, 73, 0.03)',
        'organic-hover': '0px 20px 40px rgba(26, 43, 73, 0.08)'
      }
    },
  },
  plugins: [],
}
