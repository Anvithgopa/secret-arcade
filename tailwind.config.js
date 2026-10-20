/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./popup.html",
    "./tab.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          bg: '#0b0d10',
          surface: '#15191f',
          lime: '#d7ff3f',
          pink: '#ff4d8d',
          cyan: '#00f0ff',
          text: '#f4f4f0',
          muted: '#7e858f',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'VT323', 'monospace'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
