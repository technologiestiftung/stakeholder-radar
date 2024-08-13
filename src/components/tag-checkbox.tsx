import { useSelectedTagsStore } from "../stores/selected-tags-store";

export function TagCheckbox({ tag }: { tag: string }) {
	const { selectedTags, toggleTagSelection } = useSelectedTagsStore();

	return (
		<label
			htmlFor={tag}
			className="
			rounded-full border-2 px-2.5 py-1 font-medium cursor-pointer
			has-[:checked]:bg-sr-blue-grey has-[:checked]:text-white has-[:checked]:border-sr-blue-grey
			has-[:checked]:hover:bg-sr-darker-purple has-[:checked]:hover:border-opacity-5
			bg-sr-blue-grey bg-opacity-5 border-blue-grey border-opacity-5 hover:bg-opacity-0"
			onClick={() => toggleTagSelection(tag)}
		>
			{tag}
			<input
				className="appearance-none"
				type="checkbox"
				checked={selectedTags.includes(tag)}
				onChange={() => toggleTagSelection(tag)}
				id={tag}
			/>
		</label>
	);
}
