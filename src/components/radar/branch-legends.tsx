import { branches } from "../../data/branches";
import { maxRadius, xOrigin, yOrigin } from "../../geometry/constants";
import { anglePerSlicePercentage } from "../../geometry/variables";
import { getCoordinatesForPercent } from "../../geometry/geometry";

const LEGEND_WIDTH = 250;

const underlineColors = [
	"decoration-sr-magenta-100",
	"decoration-sr-purple-100",
	"decoration-sr-emerald-100",
	"decoration-sr-blue-100",
];

export function BranchLegends() {
	const branchesLegends = branches.map((branch, branchIndex) => {
		const radius = maxRadius + 120;
		const angle =
			branchIndex * anglePerSlicePercentage + anglePerSlicePercentage / 2;
		const [x, y] = getCoordinatesForPercent(angle, radius);

		return {
			x: x > xOrigin ? x + 50 : x - LEGEND_WIDTH,
			y: y > yOrigin ? y - 200 : y,
			branch,
		};
	});

	return (
		<>
			{branchesLegends.map(({ x, y, branch }, index) => (
				<div
					key={branch.name}
					className="absolute drop-shadow-2xl rounded-full"
					style={{
						top: `${y}px`,
						left: `${x}px`,
						width: `${LEGEND_WIDTH}px`,
					}}
				>
					<div className={`flex flex-col`}>
						<span
							className={`text-xl font-semibold underline underline-offset-8 decoration-4 ${underlineColors[index]}`}
						>
							{branch.name}
						</span>
						<p className="pt-2">{branch.description}</p>
					</div>
				</div>
			))}
		</>
	);
}
