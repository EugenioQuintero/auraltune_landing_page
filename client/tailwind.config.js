/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      colors: {
        'primary': '#FFFFFF',
        'accent': '#2563EB', // Blue-600
        'highlight': '#FBB03B',
        'prussian-blue': '#005ad1', // Blue for footer and trusted by section
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          // ... other gray shades
          900: '#111827',
        },
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}