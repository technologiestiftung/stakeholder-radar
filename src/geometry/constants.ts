const SMALL_RADAR = 360;
const BIG_RADAR = 700;
const BREAKPOINT = 768;

export const isMobile = document.documentElement.clientWidth < BREAKPOINT;

export const RADAR_WIDTH = isMobile ? SMALL_RADAR : BIG_RADAR;
export const RADAR_HEIGHT = isMobile ? SMALL_RADAR : BIG_RADAR;

export const xOrigin = RADAR_WIDTH / 2;
export const yOrigin = RADAR_HEIGHT / 2;
export const maxRadius = RADAR_WIDTH / 2;
