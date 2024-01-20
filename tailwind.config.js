const plugin = require("tailwindcss/plugin");
const screenKeys = Array.from({ length: 20 }, (_, i) => i * 5);
const screenSizes = screenKeys.reduce(
  (v, key) => Object.assign(v, { [key]: key }),
  {}
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "w-screen": (width) => ({
            width: `${width}vw`,
          }),
        },
        { values: Object.assign(screenSizes, theme("screenSize", {})) }
      ),
        matchUtilities(
          {
            "h-screen": (height) => ({
              height: `${height}vh`,
            }),
          },
          { values: Object.assign(screenSizes, theme("screenSize", {})) }
        );
    }),
  ],
};
