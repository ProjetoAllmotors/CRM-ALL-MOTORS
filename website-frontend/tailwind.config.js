/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E8F1FF',
          100: '#CFE1FF',
          500: '#0066FF',
          700: '#3978CF',
          900: '#102E61',
        },
        graphite: '#F8FAFC',
        surface: '#080E1C',
        canvas: '#080E1C',
        elevated: '#10192B',
        raised: '#1E2A3D',
        muted: '#94A3B8',
        border: '#28364B',
        success: '#10B981',
        warning: '#F59E0B',
      },
      borderRadius: {
        card: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
