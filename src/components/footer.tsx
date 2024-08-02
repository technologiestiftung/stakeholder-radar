export function Footer() {
	const logos = [
		{
			src: "https://logos.citylab-berlin.org/logo-citylab-color.svg",
			alt: "CityLAB Berlin Logo",
			className: "w-44",
			label: "",
		},
		{
			src: "https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg",
			alt: "Technologiestiftung Berlin Logo",
			className: "w-32",
			label: "Ein Projekt der",
		},
		{
			src: "https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg",
			alt: "Senatzkanzlei Berlin Logo",
			className: "w-56",
			label: "Gefördert durch",
		},
	];

	return (
		<footer className="flex w-full justify-center gap-x-20 border-t-2 pt-12 mt-12 pb-16">
			{logos.map(({ alt, src, className, label }) => (
				<div
					key={alt}
					className="flex flex-col gap-y-4 items-start justify-between"
				>
					<span className="font-light text-gray-400">{label}</span>
					<img src={src} alt={alt} className={className} />
				</div>
			))}
		</footer>
	);
}
