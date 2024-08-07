import { xOrigin, yOrigin } from "./constants";

export function getCoordinatesForPercent(percent: number, radius: number) {
	const x = Math.cos(2 * Math.PI * (percent - 0.25)) * radius + xOrigin;
	const y = Math.sin(2 * Math.PI * (percent - 0.25)) * radius + yOrigin;
	return [x, y];
}
