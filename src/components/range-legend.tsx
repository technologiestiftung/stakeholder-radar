import { ranges } from "../data/ranges.ts";
import { RADAR_WIDTH } from "../geometry/constants.ts";

export function RangeLegend() {
	return (
		<div className="absolute left-0 h-full" style={{ width: RADAR_WIDTH / 2 }}>
			<div
				className="text-white text-sm flex flex-row-reverse h-full items-center w-full gap-x-7 -mt-3 pr-16"
				style={{ textShadow: "0px 0px 10px rgba(47, 47, 162, 0.63)" }}
			>
				{ranges.map((range) => (
					<span key={range.name}>{range.name}</span>
				))}
			</div>
		</div>
	);
}
