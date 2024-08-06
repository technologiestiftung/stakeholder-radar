import resolveConfig from "tailwindcss/resolveConfig";
//@ts-expect-error tailwindConfig has no type definition
import tailwindConfig from "../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

const srMagenta100 = fullConfig.theme.colors["sr-magenta-100"];
const srMagenta75 = fullConfig.theme.colors["sr-magenta-75"];
const srMagenta50 = fullConfig.theme.colors["sr-magenta-50"];
const srMagenta25 = fullConfig.theme.colors["sr-magenta-25"];
const srBlue100 = fullConfig.theme.colors["sr-blue-100"];
const srBlue75 = fullConfig.theme.colors["sr-blue-75"];
const srBlue50 = fullConfig.theme.colors["sr-blue-50"];
const srBlue25 = fullConfig.theme.colors["sr-blue-25"];
const srEmerald100 = fullConfig.theme.colors["sr-emerald-100"];
const srEmerald75 = fullConfig.theme.colors["sr-emerald-75"];
const srEmerald50 = fullConfig.theme.colors["sr-emerald-50"];
const srEmerald25 = fullConfig.theme.colors["sr-emerald-25"];
const srPurple100 = fullConfig.theme.colors["sr-purple-100"];
const srPurple75 = fullConfig.theme.colors["sr-purple-75"];
const srPurple50 = fullConfig.theme.colors["sr-purple-50"];
const srPurple25 = fullConfig.theme.colors["sr-purple-25"];

// const clPurple = fullConfig.theme.colors["cl-purple"];
// const clGreen = fullConfig.theme.colors["cl-green"];
// const clBlue = fullConfig.theme.colors["cl-blue"];
// const clMagenta = fullConfig.theme.colors["cl-magenta"];
// const clGray = fullConfig.theme.colors["cl-gray"];

// export const colors: string[] = [clPurple, clGreen, clBlue, clMagenta, clGray];

export const colors = [
	srPurple100,
	srEmerald100,
	srBlue100,
	srMagenta100,

	srPurple75,
	srEmerald75,
	srBlue75,
	srMagenta75,

	srPurple50,
	srEmerald50,
	srBlue50,
	srMagenta50,

	srPurple25,
	srEmerald25,
	srBlue25,
	srMagenta25,
];
