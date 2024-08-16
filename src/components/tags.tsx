import { contacts } from "../data/contacts";
import { TagCheckbox } from "./tag-checkbox";

export function Tags() {
	const tags = new Set(contacts.map((contact) => contact.tags).flat());

	return (
		<div className="flex justify-center pt-5 md:pt-10">
			<div className="flex flex-col items-center gap-y-2">
				<div className="text-lg">Filtere mit Tags</div>
				<div className="flex gap-x-3 w-11/12 md:max-w-[55rem] flex-wrap gap-y-3 justify-center">
					{Array.from(tags).map((tag) => (
						<TagCheckbox key={tag} tag={tag} />
					))}
				</div>
			</div>
		</div>
	);
}
