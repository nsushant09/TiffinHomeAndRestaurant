import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {50:'#f1f8f3',100:'#dceee1',200:'#b9ddc4',300:'#87c397',400:'#51a66b',500:'#30894f',600:'#186131',700:'#14502b',800:'#123f25',900:'#0e341f',950:'#071c10'},
        sand: {50:'#fdfbf7',100:'#f8f4eb',200:'#eee5d4',300:'#dfcfb5',400:'#cdb08b',500:'#b99464'},
      },
      fontFamily: { sans:['var(--font-poppins)','Poppins','ui-sans-serif','system-ui','sans-serif'] },
      boxShadow: { card:'0 18px 60px rgba(17, 48, 29, 0.10)', soft:'0 8px 32px rgba(17, 48, 29, 0.08)' },
    },
  },
  plugins: [],
};
export default config;
