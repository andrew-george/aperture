/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './Components/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				mono: 'var(--roboto-mono)',
				sans: 'var(--roboto)',
				// mono: 'var(--fira-code)',
				// sans: 'var(--fira-sans)',
			},
		},
	},
	plugins: [],
}
