import { ranges } from "../data/ranges";
import { branches } from "../data/branches";
import { getCoordinatesForPercent } from "../geometry/geometry";
import { anglePerSlice } from "../geometry/variables";
import { RADAR_WIDTH, xOrigin, yOrigin } from "../geometry/constants";
import { colors } from "../colors";

const opacity: Record<string, string> = {
	1: "opacity-80",
	2: "opacity-60",
	3: "opacity-40",
	4: "opacity-20",
};

export function BranchArcs() {
	let cumulativePercent = 0;
	const paths = ranges
		.map((_range, rangeIndex) =>
			branches.map((_branch, branchIndex) => {
				const radius =
					((1 / 4) * RADAR_WIDTH) / 2 +
					(((RADAR_WIDTH / 2) * 3) / 16) * (rangeIndex + 1);
				const [startX, startY] = getCoordinatesForPercent(
					cumulativePercent,
					radius,
				);
				cumulativePercent += anglePerSlice;
				const [endX, endY] = getCoordinatesForPercent(
					cumulativePercent,
					radius,
				);
				// const radius = 2 * rangeIndex;

				const pathData = [
					`M ${xOrigin} ${yOrigin}`, // Move to center
					`L ${startX} ${startY}`, // Line to start point
					`A ${radius} ${radius} 0 ${anglePerSlice > 0.5 ? 1 : 0} 1 ${endX} ${endY}`, // Arc
					"Z", // Close path
				].join(" ");

				return {
					d: pathData,
					fill: colors[branchIndex % colors.length],
					opacity: opacity[rangeIndex + 1],
				};
			}),
		)
		.flat()
		.reverse();

	return (
		<>
			{paths.map((path, index) => (
				<path
					key={index}
					d={path.d}
					fill={path.fill}
					className={path.opacity}
				/>
			))}
		</>
	);
}
