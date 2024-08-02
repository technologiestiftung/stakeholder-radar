import { create } from "zustand";
import { contacts } from "../data/contacts";

type Contact = (typeof contacts)[0];

type SelectedContactStore = {
	selectedContact: Contact | null;
	setSelectedContact: (contact: Contact) => void;
};

export const useSelectedContactStore = create<SelectedContactStore>()(
	(set) => ({
		selectedContact: null,
		setSelectedContact: (contact) => {
			set({ selectedContact: contact });

			if (contact === null) {
				return;
			}

			(document.getElementById("dialog") as HTMLDialogElement)?.showModal();
		},
	}),
);
