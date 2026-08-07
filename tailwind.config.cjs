/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      /*
       * The eight-stop palette, teal through sand to red.
       *
       * The four role names are kept from the previous palette so nothing had
       * to be renamed across the components; only their values changed.
       * Previous values, if you want them back:
       *   gold #FAD103   cyan #02B8A6   ember #FA6A03   crimson #B80502
       * The old ramp ran: #02B8A6 0%, #FAD103 34%, #FA6A03 68%, #B80502 100%.
       */
      colors: {
        gold: "#EE9B00", // primary accent
        cyan: "#0A9396", // secondary accent
        ember: "#CA6702", // tertiary accent
        crimson: "#AE2012", // alert and emphasis
        deep: "#005F73", // darkest stop, fills only
        mint: "#94D2BD",
        sand: "#E9D8A6",
        brick: "#BB3E03",
        ink: "#0A0A0A",
        panel: "#141414",
        edge: "#242424",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        // Congenial is served through Adobe Fonts; see the note in index.html.
        // Until that kit is added the browser falls through to Space Grotesk,
        // so nothing looks broken in the meantime.
        display: ["congenial", "Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.09)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "slow-zoom": "slow-zoom 22s ease-out forwards",
        shimmer: "shimmer 7s linear infinite",
      },
    },
  },
  plugins: [],
};
