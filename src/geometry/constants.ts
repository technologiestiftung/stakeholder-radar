const SMALL_RADAR = 350;
const BIG_RADAR = 700;
const BREAKPOINT = 768;

export const RADAR_WIDTH =
	document.documentElement.clientWidth < BREAKPOINT ? SMALL_RADAR : BIG_RADAR;
export const RADAR_HEIGHT =
	document.documentElement.clientWidth < BREAKPOINT ? SMALL_RADAR : BIG_RADAR;

export const xOrigin = RADAR_WIDTH / 2;
export const yOrigin = RADAR_HEIGHT / 2;
export const maxRadius = RADAR_WIDTH / 2;
