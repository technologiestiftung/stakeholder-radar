import { branches } from "../data/branches";
import { maxRadius, xOrigin, yOrigin } from "../geometry/constants";
import { anglePerSlice } from "../geometry/variables";
import { getCoordinatesForPercent } from "../geometry/geometry";

const LEGEND_WIDTH = 250;

const underlineColors = [
	"decoration-cl-purple",
	"decoration-cl-green",
	"decoration-cl-blue",
	"decoration-cl-magenta",
	"decoration-cl-gray",
];

export function BranchLegends() {
	const branchesLegends = branches.map((branch, branchIndex) => {
		const radius = maxRadius + 120;
		const angle = branchIndex * anglePerSlice + anglePerSlice / 2;
		const [x, y] = getCoordinatesForPercent(angle, radius);

		return {
			x: x > xOrigin ? x : x - LEGEND_WIDTH,
			y: y > yOrigin ? y - 200 : y,
			branch,
			textAlign: x > xOrigin ? "text-end" : "text-start",
		};
	});

	return (
		<>
			{branchesLegends.map(({ x, y, branch, textAlign }, index) => (
				<>
					<div
						className="absolute drop-shadow-2xl rounded-full"
						style={{
							top: `${y}px`,
							left: `${x}px`,
							width: `${LEGEND_WIDTH}px`,
						}}
					>
						<div className={`flex flex-col ${textAlign}`}>
							<span
								className={`text-xl font-semibold underline underline-offset-8 decoration-4 ${underlineColors[index]}`}
							>
								{branch.name}
							</span>
							<p className="pt-2">{branch.description}</p>
						</div>
					</div>
				</>
			))}
		</>
	);
}
