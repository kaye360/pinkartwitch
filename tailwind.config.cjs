/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily : {
				'base' : ['Lato', 'Helvetica'],
				'theme' : ['Laila', 'Helvetica'],
			},
			colors : {
				"primary" : {
					50  : "hsl( var(--primary-color) 95% / <alpha-value> )",
					100 : "hsl( var(--primary-color) 90% / <alpha-value> )",
					200 : "hsl( var(--primary-color) 80% / <alpha-value> )",
					300 : "hsl( var(--primary-color) 70% / <alpha-value> )",
					400 : "hsl( var(--primary-color) 60% / <alpha-value> )",
					500 : "hsl( var(--primary-color) 50% / <alpha-value> )",
					600 : "hsl( var(--primary-color) 40% / <alpha-value> )",
					700 : "hsl( var(--primary-color) 30% / <alpha-value> )",
					800 : "hsl( var(--primary-color) 20% / <alpha-value> )",
					900 : "hsl( var(--primary-color) 10% / <alpha-value> )",
				},
				"secondary" : {
					50  : "hsl( var(--secondary-color) 95% / <alpha-value> )",
					100 : "hsl( var(--secondary-color) 90% / <alpha-value> )",
					200 : "hsl( var(--secondary-color) 80% / <alpha-value> )",
					300 : "hsl( var(--secondary-color) 70% / <alpha-value> )",
					400 : "hsl( var(--secondary-color) 60% / <alpha-value> )",
					500 : "hsl( var(--secondary-color) 50% / <alpha-value> )",
					600 : "hsl( var(--secondary-color) 40% / <alpha-value> )",
					700 : "hsl( var(--secondary-color) 30% / <alpha-value> )",
					800 : "hsl( var(--secondary-color) 20% / <alpha-value> )",
					900 : "hsl( var(--secondary-color) 10% / <alpha-value> )",
				},
				"tertiary" : {
					50  : "hsl( var(--tertiary-color) 95% / <alpha-value> )",
					100 : "hsl( var(--tertiary-color) 90% / <alpha-value> )",
					200 : "hsl( var(--tertiary-color) 80% / <alpha-value> )",
					300 : "hsl( var(--tertiary-color) 70% / <alpha-value> )",
					400 : "hsl( var(--tertiary-color) 60% / <alpha-value> )",
					500 : "hsl( var(--tertiary-color) 50% / <alpha-value> )",
					600 : "hsl( var(--tertiary-color) 40% / <alpha-value> )",
					700 : "hsl( var(--tertiary-color) 30% / <alpha-value> )",
					800 : "hsl( var(--tertiary-color) 20% / <alpha-value> )",
					900 : "hsl( var(--tertiary-color) 10% / <alpha-value> )",
				},
			},
			backgroundImage : {
				'radial-gradient' : 'radial-gradient(var(--tw-gradient-stops))'
			}
		},
	},
	plugins: [],
}
