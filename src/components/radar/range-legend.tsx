import { ranges } from "../../data/ranges";
import { RADAR_WIDTH } from "../../geometry/constants";

export function RangeLegend() {
	return (
		<div className="absolute right-0 h-full" style={{ width: RADAR_WIDTH / 2 }}>
			<div className="text-sm flex h-full items-center w-full -mt-5 pl-14">
				{ranges.map((range, index) => (
					<span
						key={range.name}
						className={`${index > 0 && "pl-11"} text-sr-lighter-black`}
					>
						{range.name}
					</span>
				))}
			</div>
		</div>
	);
}
