import React, { useEffect } from "react";
import { XIcon } from "./icons/x-icon";
import { useSplashStore } from "../stores/splash-screen-store";

const closeDialog = () => {
	useSplashStore.getState().hideSplashScreen();
	(document.getElementById("splash-screen") as HTMLDialogElement).close();
};

export function SplashScreen() {
	const { isSplashScreenVisible } = useSplashStore();

	useEffect(() => {
		if (isSplashScreenVisible()) {
			(
				document.getElementById("splash-screen") as HTMLDialogElement
			).showModal();
		}
	}, []);

	const onDialogClick = (
		event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
	) => {
		/**
		 * This is confusing, yet correct. The dialog element spreads over the whole screen.
		 * If the user clicks on something inside the dialog, the event target won't be the dialog itself.
		 */
		const isClickOnDialogBackground =
			event.target === document.getElementById("splash-screen");

		if (!isClickOnDialogBackground) {
			return;
		}
		closeDialog();
	};

	const links = [
		{
			label: "Kontakt",
			url: "https://citylab-berlin.org/de/start/",
		},
		{
			label: "Quellcode",
			url: "https://github.com/technologiestiftung/stakeholder-radar",
		},
		{
			label: "Datenschutz",
			url: "https://citylab-berlin.org/de/data-privacy/",
		},
		{
			label: "Impressum",
			url: "https://citylab-berlin.org/de/imprint/",
		},
	];

	return (
		<dialog
			id="splash-screen"
			className="w-11/12 md:w-[760px] shadow-[0px_4px_18px_0px_#B8B8B8] rounded-xl bg-white text-sr-blue-grey backdrop:backdrop-blur-sm backdrop:bg-white backdrop:bg-opacity-50"
			onClick={onDialogClick}
		>
			<div className="flex flex-col p-8 md:px-12 md:py-8">
				<button className="flex self-end" onClick={closeDialog}>
					<XIcon />
				</button>
				<div className="text-[20px] text-sr-magenta-100 font-medium pb-2 md:pt-7">
					CityLAB
				</div>
				<h1 className="text-4xl md:text-[56px] font-semibold leading-10 pb-5 md:pb-7">
					Post-COVID Stakeholder Radar
				</h1>
				<p className="text-lg md:text-[24px] md:leading-8">
					Die Stakeholder-Map visualisiert verschiedene durch die
					Technologiestiftung Berlin im Rahmen der Challenge
					„Post-COVID-Datenmodell“ identifizierte Akteur:innen die mit dem
					konzipierten Datenmodell in Verbindung stehen. Dabei wurden
					Akteur:innen aus insgesamt vier verschiedenen Bereichen identifiziert,
					die sich Anhand ihres Wirkungsgrads auf das Datenmodell und ihren
					Schwerpunktthemen unterscheiden. Einzelne Datenpunkte können mit Hilfe
					von Tags gefiltert und in der Listenansicht übersichtlich dargestellt
					werden. Mit Klick auf einen Punkt, können mehr Informationen über die
					einzelnen Stakeholder abgerufen werden. Die Stakeholder-Map ist eine
					Abwandlung des Stakeholder-Radars, des CityLAB Berlins. Es handelt
					sich hierbei um ein Open Source Projekt dessen Code auf GitHub
					gefunden und gerne verwendet werden darf.
				</p>
			</div>
			<div className="flex flex-row flex-wrap gap-2 p-8 md:p-12 md:pt-0 pt-0 text-md md:text-lg justify-between text-sr-blue-100">
				{links.map((link) => (
					<a
						key={link.label}
						target="_blank"
						rel="noreferrer"
						className="hover:text-sr-blue-50 underline"
						href={link.url}
					>
						{link.label}
					</a>
				))}
			</div>
		</dialog>
	);
}
