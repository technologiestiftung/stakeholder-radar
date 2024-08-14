import { useSelectedTagsStore } from "../stores/selected-tags-store";
import { XIcon } from "./icons/x-icon";

export function TagCheckbox({ tag }: { tag: string }) {
	const { selectedTags, toggleTagSelection } = useSelectedTagsStore();

	const isChecked = selectedTags.includes(tag);

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
			<div className="flex items-center">
				{tag}
				{isChecked && <XIcon className={"size-5 ml-2"} />}
				<input
					className="appearance-none"
					type="checkbox"
					checked={isChecked}
					onChange={() => toggleTagSelection(tag)}
					id={tag}
				/>
			</div>
		</label>
	);
}
