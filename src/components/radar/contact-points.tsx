import { contacts } from "../../data/contacts";
import { branches } from "../../data/branches";
import { ranges } from "../../data/ranges";
import { useSelectedContactStore } from "../../stores/selected-contact-store";
import { useSelectedTagsStore } from "../../stores/selected-tags-store";
import {
	anglePerSlicePercentage,
	rangePercentageIncrement,
	smallestRangePercentage,
} from "../../geometry/variables";
import { getCoordinatesForPercent } from "../../geometry/geometry";
import { maxRadius } from "../../geometry/constants";

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
			{contactCircles.map(({ x, y, title }, index) => (
				<div
					key={title}
					className="absolute drop-shadow-2xl rounded-full bg-white tooltip cursor-pointer"
					style={{
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

	const contactsInBranchInRange = contacts.filter(
		(c) => c.branch === contact.branch && c.range === contact.range,
	);
	const amountOfEqualPartsBasedOnContactsInBranchInRange =
		contactsInBranchInRange.length + 1;
	const contactIndexInBranchInRange = contactsInBranchInRange.findIndex(
		(c) => c.organisation === contact.organisation,
	);

	// prettier-ignore
	const radius =
		(smallestRangePercentage + rangePercentageIncrement * rangeIndex) * maxRadius
		- ((rangeIndex === 0 ? smallestRangePercentage / 2 : rangePercentageIncrement / 2) * maxRadius)
		+ (rangeIndex === 0 ? POINT_WIDTH : 0);

	// prettier-ignore
	const angle = branchIndex * anglePerSlicePercentage
	+ (anglePerSlicePercentage / amountOfEqualPartsBasedOnContactsInBranchInRange) * (contactIndexInBranchInRange + 1);

	const [x, y] = getCoordinatesForPercent(angle, radius);

	return {
		x: x - POINT_WIDTH / 2,
		y: y - POINT_HEIGHT / 2,
		title: contact.organisation,
	};
}
