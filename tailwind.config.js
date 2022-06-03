module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        flow: {
          '0%': { backgroundPosition: 'left' },          
          '50%': { backgroundPosition: 'right' },
          '100%': { backgroundPosition: 'left' },
        },
      },
      animation: {
        'flowing': 'flow 5s linear infinite',
      },
    },
  },
  plugins: [],
}
