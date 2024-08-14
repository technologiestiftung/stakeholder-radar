import * as daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["National", "sans-serif"],
			},
			colors: {
				"sr-magenta-100": "#F64C72",
				"sr-magenta-75": "#F87995",
				"sr-magenta-50": "#FBA6B9",
				"sr-magenta-25": "#FDD2DC",

				"sr-blue-100": "#2F2FA2",
				"sr-blue-75": "#6363B9",
				"sr-blue-50": "#9797D1",
				"sr-blue-25": "#CBCBE8",

				"sr-emerald-100": "#58A89C",
				"sr-emerald-75": "#82BEB5",
				"sr-emerald-50": "#ACD4CE",
				"sr-emerald-25": "#D5E9E6",

				"sr-purple-100": "#9372A7",
				"sr-purple-75": "#AE95BD",
				"sr-purple-50": "#C9B9D3",
				"sr-purple-25": "#E4DCE9",

				"sr-light-grey": "#9899AD",
				"sr-blue-grey": "#393A60",
				"sr-lighter-black": "#131313",
				"sr-darker-purple": "#5F61A0",
			},
		},
	},
	daisyui: {
		themes: ["light"],
	},
	plugins: [daisyui],
};
