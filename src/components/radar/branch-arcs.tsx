import { ranges } from "../../data/ranges";
import { branches } from "../../data/branches";
import { getCoordinatesForPercent } from "../../geometry/geometry";
import { anglePerSlice } from "../../geometry/variables";
import { RADAR_WIDTH, xOrigin, yOrigin } from "../../geometry/constants";
import { colors } from "../../colors";

export function BranchArcs() {
	let cumulativePercent = 0;
	let counter = 0;
	const paths = ranges
		.map((_range, rangeIndex) =>
			branches.map(() => {
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

				const pathData = [
					`M ${xOrigin} ${yOrigin}`, // Move to center
					`L ${startX} ${startY}`, // Line to start point
					`A ${radius} ${radius} 0 ${anglePerSlice > 0.5 ? 1 : 0} 1 ${endX} ${endY}`, // Arc
					"Z", // Close path
				].join(" ");
				const fill = colors[counter];

				counter = counter + 1;

				return {
					d: pathData,
					fill,
				};
			}),
		)
		.flat()
		.reverse();

	return (
		<>
			<defs>
				<filter id="arc-shadow0">
					<feDropShadow
						dx="1"
						dy="1"
						stdDeviation="10"
						floodColor="black"
						floodOpacity="0.25"
					/>
				</filter>
				<filter id="arc-shadow1">
					<feDropShadow
						dx="-1"
						dy="1"
						stdDeviation="10"
						floodColor="black"
						floodOpacity="0.25"
					/>
				</filter>
				<filter id="arc-shadow2">
					<feDropShadow
						dx="-1"
						dy="1"
						stdDeviation="10"
						floodColor="black"
						floodOpacity="0.25"
					/>
				</filter>
				<filter id="arc-shadow3">
					<feDropShadow
						dx="1"
						dy="1"
						stdDeviation="10"
						floodColor="black"
						floodOpacity="0.25"
					/>
				</filter>
			</defs>
			{paths.map((path, index) => (
				<path
					key={index}
					d={path.d}
					fill={path.fill}
					filter={`url(#arc-shadow${index % 4})`}
				/>
			))}
		</>
	);
}
