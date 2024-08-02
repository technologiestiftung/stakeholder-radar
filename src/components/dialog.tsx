import React from "react";
import { useSelectedContactStore } from "../stores/selected-contact-store";
import { useSelectedTagsStore } from "../stores/selected-tags-store";

const closeDialog = () => {
	(document.getElementById("dialog") as HTMLDialogElement).close();
};

export function Dialog() {
	const { selectedContact } = useSelectedContactStore();
	const { selectedTags, toggleTagSelection } = useSelectedTagsStore();

	const onDialogClick = (
		event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
	) => {
		const isClickOnBackground =
			event.target !== document.getElementById("dialog");

		if (isClickOnBackground) {
			return;
		}
		closeDialog();
	};

	return (
		<dialog
			id="dialog"
			className="w-96 h-80 px-10 pt-12 rounded-xl shadow-xl bg-white/90"
			onClick={onDialogClick}
		>
			<div className="flex flex-col gap-y-5 ">
				<div className="text-xl font-bold">{selectedContact?.organisation}</div>

				<div className="flex gap-x-2">
					{selectedContact?.tags.map((tag) => (
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

				<p>{selectedContact?.description}</p>
			</div>
		</dialog>
	);
}
