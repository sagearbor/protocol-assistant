import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dcri-blue': '#003366',
        'dcri-light-blue': '#4A90E2',
        'dcri-green': '#2ECC71',
        'dcri-orange': '#F39C12',
        'dcri-red': '#E74C3C',
      },
    },
  },
  plugins: [],
}
export default config