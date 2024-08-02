import { contacts } from "../data/contacts";
import { useSelectedTagsStore } from "../stores/selected-tags-store";

export function Tags() {
	const { selectedTags, toggleTagSelection } = useSelectedTagsStore();

	const tags = new Set(contacts.map((contact) => contact.tags).flat());

	return (
		<div className="flex justify-center pt-20">
			<div className="flex flex-col items-center gap-y-2">
				<div className="text-lg">Filtere mit Tags</div>
				<div className="flex gap-x-3 w-80 flex-wrap gap-y-3 justify-center">
					{Array.from(tags).map((tag) => (
						<button
							key={tag}
							className={`
							rounded-2xl border-2 border-zinc-300 px-3 font-semibold hover:bg-stone-200 pb-1
							${selectedTags.includes(tag) ? "bg-stone-300" : "bg-stone-50"}`}
							onClick={() => toggleTagSelection(tag)}
						>
							{tag}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
