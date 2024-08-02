import { create } from "zustand";

type SelectedContactStore = {
	selectedTags: string[];
	toggleTagSelection: (tag: string) => void;
};

export const useSelectedTagsStore = create<SelectedContactStore>()(
	(set, get) => ({
		selectedTags: [],

		toggleTagSelection: (tag: string) => {
			const { selectedTags } = get();
			const isTagCurrentlySelected = selectedTags.includes(tag);

			if (isTagCurrentlySelected) {
				const newSelectedTags = selectedTags.filter(
					(selectedTag) => selectedTag !== tag,
				);
				set({ selectedTags: newSelectedTags });
				return;
			}

			const newSelectedTags = [...selectedTags, tag];
			set({ selectedTags: newSelectedTags });
		},
	}),
);
