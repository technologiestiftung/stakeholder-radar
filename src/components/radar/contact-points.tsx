import { contacts } from "../../data/contacts";
import { branches } from "../../data/branches";
import { ranges } from "../../data/ranges";
import { useSelectedContactStore } from "../../stores/selected-contact-store";
import { useSelectedTagsStore } from "../../stores/selected-tags-store";
import { anglePerSlice } from "../../geometry/variables";
import { getCoordinatesForPercent } from "../../geometry/geometry";
import { colors } from "../../colors";
import { RADAR_WIDTH } from "../../geometry/constants";

const POINT_WIDTH = 16;
const POINT_HEIGHT = 16;

export function ContactPoints() {
	const { setSelectedContact } = useSelectedContactStore();
	const { selectedTags } = useSelectedTagsStore();

	const contactCircles = contacts
		.filter((contact) => isTagSelected(contact, selectedTags))
		.map(toContactCircle);

	return (
		<>
			{contactCircles.map(({ x, y, border, title }, index) => (
				<div
					key={title}
					className="absolute drop-shadow-2xl rounded-full bg-white tooltip"
					style={{
						border: `2px solid ${border}`,
						top: `${y}px`,
						left: `${x}px`,
						width: `${POINT_WIDTH}px`,
						height: `${POINT_HEIGHT}px`,
					}}
					data-tip={title}
					onClick={() => setSelectedContact(contacts[index])}
				></div>
			))}
		</>
	);
}

function isTagSelected(contact: (typeof contacts)[0], selectedTags: string[]) {
	if (selectedTags.length === 0) {
		return true;
	}

	return selectedTags.every((tag) => contact.tags.includes(tag));
}

function toContactCircle(contact: (typeof contacts)[0]) {
	const branchIndex = branches.findIndex(
		(branch) => branch.name === contact.branch,
	);
	const rangeIndex = ranges.findIndex((range) => range.name === contact.range);

	const radius =
		((RADAR_WIDTH / 2) * 2.5) / 16 +
		(((RADAR_WIDTH / 2) * 3) / 16) * (rangeIndex + 1);
	const angle = branchIndex * anglePerSlice + anglePerSlice / 2;
	const [x, y] = getCoordinatesForPercent(angle, radius);

	const border = colors[branchIndex % colors.length];

	return {
		x: x - POINT_WIDTH / 2,
		y: y - POINT_HEIGHT / 2,
		border,
		title: contact.organisation,
	};
}
