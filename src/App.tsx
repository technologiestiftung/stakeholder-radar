import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Tags } from "./components/tags";
import { Dialog } from "./components/dialog";
import { BranchArcs } from "./components/branch-arcs";
import { Contacts } from "./components/contacts";
import { BranchLegends } from "./components/branch-legends";
import { RADAR_HEIGHT, RADAR_WIDTH } from "./geometry/constants";
import { RangeLegend } from "./components/range-legend";

export function App() {
	return (
		<div className="flex flex-col">
			<Header />

			<main className="flex flex-col">
				<h1 className="text-4xl font-semibold pt-14 pl-28">
					Stakeholder Radar
				</h1>
				<div
					className="relative self-center mt-20"
					style={{ width: RADAR_WIDTH, height: RADAR_HEIGHT }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox={`0 0 ${RADAR_WIDTH} ${RADAR_HEIGHT}`}
					>
						<BranchArcs />
					</svg>
					<div className="absolute top-0 w-full h-full">
						<RangeLegend />
						<Contacts />
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
