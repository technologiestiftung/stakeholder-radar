import * as daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"cl-purple": "#9372A7",
				"cl-green": "#58A89C",
				"cl-blue": "#2F2FA2",
				"cl-magenta": "#F64C72",
				"cl-gray": "#6B6C89",
			},
		},
	},
	daisyui: {
		themes: ["light"],
	},
	plugins: [daisyui],
};
