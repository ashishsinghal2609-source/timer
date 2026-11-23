module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          100: '#ffe4f0',
          200: '#ffb3d1',
          300: '#ff80b3',
          400: '#ff4d94',
          500: '#ff1a75',
          600: '#cc1460',
          700: '#99104b',
          800: '#660a36',
          900: '#33051b'
        },
        indigo: {
          900: '#1e1b2f'
        },
        purple: {
          700: '#5b3e99'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(255, 26, 117, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)'
      }
    }
  },
  plugins: []
};
