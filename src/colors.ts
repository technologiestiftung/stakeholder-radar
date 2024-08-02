import resolveConfig from "tailwindcss/resolveConfig";
//@ts-expect-error tailwindConfig has no type definition
import tailwindConfig from "../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

const clPurple = fullConfig.theme.colors["cl-purple"];
const clGreen = fullConfig.theme.colors["cl-green"];
const clBlue = fullConfig.theme.colors["cl-blue"];
const clMagenta = fullConfig.theme.colors["cl-magenta"];
const clGray = fullConfig.theme.colors["cl-gray"];

export const colors: string[] = [clPurple, clGreen, clBlue, clMagenta, clGray];
