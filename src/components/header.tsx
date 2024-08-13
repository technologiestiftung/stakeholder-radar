import { ListViewIcon } from "./icons/list-view-icon";

export function Header() {
	return (
		<header className="pt-16 pl-28 flex flex-row justify-between">
			<img
				src="https://logos.citylab-berlin.org/logo-citylab-color.svg"
				alt="CityLAB Berlin Logo"
				className="w-48"
			/>
			<a
				href="#listView"
				className="flex text-xs flex-col items-center pr-12 gap-2"
			>
				<ListViewIcon />
				Listenansicht
			</a>
		</header>
	);
}
