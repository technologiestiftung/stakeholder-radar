import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Tags } from "./components/tags";
import { Dialog } from "./components/dialog";
import { BranchArcs } from "./components/radar/branch-arcs";
import { ContactPoints } from "./components/radar/contact-points";
import { BranchLegends } from "./components/radar/branch-legends";
import { RangeLegend } from "./components/radar/range-legend";
import { RADAR_HEIGHT, RADAR_WIDTH } from "./geometry/constants";

export function App() {
	return (
		<div className="flex flex-col text-blue-grey">
			<Header />

			<main className="flex flex-col">
				<h1 className="text-6xl font-semibold pt-14 pl-28 leading-10">
					Stakeholder Radar
				</h1>
				<div
					className="relative self-center mt-20"
					style={{ width: RADAR_WIDTH + 10, height: RADAR_HEIGHT + 10 }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox={`0 0 ${RADAR_WIDTH + 10} ${RADAR_HEIGHT + 10}`}
					>
						<BranchArcs />
					</svg>
					<div className="absolute top-0 w-full h-full">
						<RangeLegend />
						<ContactPoints />
						<BranchLegends />
					</div>
				</div>
				<Tags />
				<Dialog />
			</main>

			<Footer />
		</div>
	);
}
