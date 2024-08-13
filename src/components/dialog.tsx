import React from "react";
import { useSelectedContactStore } from "../stores/selected-contact-store";
import { contacts } from "../data/contacts";
import { TagCheckbox } from "./tag-checkbox";

const closeDialog = () => {
	(document.getElementById("dialog") as HTMLDialogElement).close();
};

export function Dialog() {
	const { selectedContact } = useSelectedContactStore();

	const onDialogClick = (
		event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
	) => {
		/**
		 * This is confusing, yet correct. The dialog element spreads over the whole screen.
		 * If the user clicks on something inside the dialog, the event target won't be the dialog itself.
		 */
		const isClickOnDialogBackground =
			event.target === document.getElementById("dialog");

		if (!isClickOnDialogBackground) {
			return;
		}

		closeDialog();
	};

	const contactIndex = contacts.findIndex(
		(contact: (typeof contacts)[0]) =>
			contact.organisation === selectedContact?.organisation,
	);

	return (
		<dialog
			id="dialog"
			className="w-[30rem] shadow-[0px_4px_10px_0px_#5C5C5C] rounded-xl bg-white bg-opacity-95 text-sr-blue-grey backdrop:bg-transparent"
			onClick={onDialogClick}
		>
			<div className="flex flex-col gap-y-5 px-10 py-9">
				<div className="flex items-center justify-between">
					<div className="flex items-center text-xl font-bold">
						<span className="font-normal pr-2">{contactIndex + 1}</span>
						{selectedContact?.organisation}
					</div>
					<a
						href={selectedContact?.website}
						className="font-light underline underline-offset-4"
					>
						Website Besuchen
					</a>
				</div>

				<div className="flex flex-wrap gap-2">
					{selectedContact?.tags.map((tag) => (
						<TagCheckbox key={tag} tag={tag} />
					))}
				</div>

				<p className="font-light">{selectedContact?.description}</p>
			</div>
		</dialog>
	);
}
