import { ranges } from "../../data/ranges";
import { RADAR_WIDTH } from "../../geometry/constants";

const paddingMapping: Record<string, string> = {
	"0": "0",
	"1": "43",
	"2": "28",
	"3": "25",
};

export function RangeLegend() {
	return (
		<div className="absolute right-0 h-full" style={{ width: RADAR_WIDTH / 2 }}>
			<div className="text-sm flex h-full items-center w-full -mt-5 pl-5">
				{ranges.map((range, index) => (
					<span
						key={range.name}
						className="text-sr-lighter-black"
						style={{ paddingLeft: `${paddingMapping[index]}px` }}
					>
						{range.name}
					</span>
				))}
			</div>
		</div>
	);
}
