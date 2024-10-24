/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lightBlack : "#48466D",
        darkGreen: "#3D84A8",
        bgColorWhite : "#F7F6F5",
        customLime:"#C9F0B7",
        customDarkGreen: "#00463A",
        customLightGreen: "#55ed47",
        customMiddleGreen: "#00cd6b",
        cusSky:"#C3EBFA",
        cusSkyLight:"#EDF9FD",
        cusPurple:"#CFCEFF",
        cusPurpleLight:"#F1F0FF",
        cusYellow:"#FAE27C",
        cusYellowLight:"#FEFCE8",
      },
    },
  },
  plugins: [],
};
