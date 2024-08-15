import { InfoIcon } from "./icons/info-icon";
import { ListViewIcon } from "./icons/list-view-icon";

export function Header() {
	return (
		<header className="pt-16 pl-28 flex flex-row justify-between">
			<img
				src="https://logos.citylab-berlin.org/logo-citylab-color.svg"
				alt="CityLAB Berlin Logo"
				className="w-48"
			/>
			<div className="flex flex-row  pr-28 gap-6">
				<a
					href="#listView"
					className="flex text-xs flex-col items-center gap-2"
				>
					<ListViewIcon />
					Listenansicht
				</a>
				<button
					className="flex text-xs flex-col items-center gap-2"
					onClick={() => {
						(
							document.getElementById("splash-screen") as HTMLDialogElement
						).showModal();
					}}
				>
					<InfoIcon />
					Info
				</button>
			</div>
		</header>
	);
}
