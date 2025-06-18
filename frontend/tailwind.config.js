/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/**/**/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {   backgroundImage: {
      'custom-gradient': 'linear-gradient(88.13deg, #252525 -42.06%, #3A3A3A 58.46%, #323232 165.46%)',
    },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      }, extend: {
        fontFamily: {
          poppins: ["var(--font-poppins)"],
        },
      },
    },
  },
  plugins: [],
};