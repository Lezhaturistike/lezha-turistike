/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F3D2E',
        secondary: '#2E7D5B',
        accent: '#D4B483',
        'background-light': '#F8F6F1',
        'background-dark': '#0F3D2E',
        'text-primary': '#1F2937',
        'text-secondary': '#8B7280',
      },
      borderRadius: { card: '16px', pill: '999px' },
      boxShadow: { card: '0 8px 28px rgba(15,61,46,.07)', 'card-hover': '0 16px 38px rgba(15,61,46,.12)' },
    },
  },
  plugins: [],
};
export default config;
