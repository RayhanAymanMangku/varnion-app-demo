module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // App Router files
    "./src/components/**/*.{js,ts,jsx,tsx}", // Components
    "./src/lib/**/*.{js,ts,jsx,tsx}", // Utility files
    "./src/**/*.json", // Serialized JSON from CMS
  ],
  theme: {
    // Menggunakan tema default dari Tailwind langsung
    colors: require("tailwindcss/colors"), // Import semua warna bawaan Tailwind
    backgroundImage: require("tailwindcss/defaultTheme").backgroundImage, // Latar bawaan
    borderRadius: require("tailwindcss/defaultTheme").borderRadius, // Radius bawaan
    boxShadow: require("tailwindcss/defaultTheme").boxShadow, // Bayangan bawaan
    fontFamily: require("tailwindcss/defaultTheme").fontFamily, // Font bawaan
  },
  plugins: [],
};