import { ranges } from "../../data/ranges";
import { branches } from "../../data/branches";
import { getCoordinatesForPercent } from "../../geometry/geometry";
import {
	anglePerSlicePercentage,
	rangePercentageIncrement,
	smallestRangePercentage,
} from "../../geometry/variables";
import { maxRadius, xOrigin, yOrigin } from "../../geometry/constants";
import { colors } from "../../colors";

export function BranchArcs() {
	const paths = getPaths();

	return (
		<>
			<defs>
				<filter id="arc-shadow">
					<feDropShadow
						dx="4"
						dy="4"
						stdDeviation="2"
						floodColor="black"
						floodOpacity="0.25"
					/>
				</filter>
			</defs>
			{paths.map((path) => (
				<path
					key={path.id}
					d={path.d}
					fill={path.fill}
					filter={`url(#arc-shadow)`}
				/>
			))}
		</>
	);
}

function getPaths(): { id: string; d: string; fill: string }[] {
	let cumulativePercent = 0;
	let counter = 0;

	const paths: { id: string; d: string; fill: string }[] = [];

	ranges.forEach((range, rangeIndex) => {
		branches.forEach((branch) => {
			// prettier-ignore
			const radius = maxRadius * (smallestRangePercentage + rangePercentageIncrement * rangeIndex);

			const [startX, startY] = getCoordinatesForPercent(
				cumulativePercent,
				radius,
			);

			cumulativePercent += anglePerSlicePercentage;

			const [endX, endY] = getCoordinatesForPercent(cumulativePercent, radius);

			const pathData = [
				`M ${xOrigin} ${yOrigin}`, // Move to center
				`L ${startX} ${startY}`, // Line to start point
				`A ${radius} ${radius} 0 ${anglePerSlicePercentage > 0.5 ? 1 : 0} 1 ${endX} ${endY}`, // Arc
				"Z", // Close path
			].join(" ");

			const fill = colors[counter];
			counter += 1;

			paths.push({
				id: `${branch.name}-${range.name}`,
				d: pathData,
				fill,
			});
		});
	});

	/**
	 * reverse so the bigger arcs are in the back,
	 * and the smaller arcs are in the front
	 */
	paths.reverse();

	return paths;
}
