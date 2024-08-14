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

const POINT_RADIUS = 20;

export function ContactPoints() {
	const { setSelectedContact } = useSelectedContactStore();
	const { selectedTags } = useSelectedTagsStore();

	const contactCircles = contacts.map((contact) =>
		toContactCircle(contact, selectedTags),
	);

	return (
		<>
			{contactCircles.map(
				({ x, y, title, contactIndex, matchesSelectedTags }) => (
					<div
						key={title}
						className="absolute drop-shadow-2xl tooltip cursor-pointer"
						style={{
							top: `${y}px`,
							left: `${x}px`,
							width: `${POINT_RADIUS}px`,
							height: `${POINT_RADIUS}px`,
						}}
						data-tip={title}
						onClick={() => setSelectedContact(contacts[contactIndex])}
					>
						<div
							className="text-xs w-full rounded-full bg-white flex h-full justify-center items-center lining-nums pb-0.5"
							style={{ opacity: matchesSelectedTags ? 1 : 0.3 }}
						>
							{contactIndex + 1}
						</div>
					</div>
				),
			)}
		</>
	);
}

function toContactCircle(
	contact: (typeof contacts)[0],
	selectedTags: string[],
) {
	const branchIndex = branches.findIndex(
		(branch) => branch.name === contact.branch,
	);
	const rangeIndex = ranges.findIndex((range) => range.name === contact.range);
	const contactIndex = contacts.findIndex(
		({ organisation }) => organisation === contact.organisation,
	);

	const contactsInBranchInRange = contacts.filter(
		(c) => c.branch === contact.branch && c.range === contact.range,
	);
	const amountOfEqualPartsBasedOnContactsInBranchInRange =
		contactsInBranchInRange.length + 1;
	const contactIndexInBranchInRange = contactsInBranchInRange.findIndex(
		(c) => c.organisation === contact.organisation,
	);

	const radius = getRadiusForContact({
		rangeIndex,
		contactIndexInBranchInRange,
	});

	// prettier-ignore
	const anglePercentage = branchIndex * anglePerSlicePercentage
	+ (anglePerSlicePercentage / amountOfEqualPartsBasedOnContactsInBranchInRange) * (contactIndexInBranchInRange + 1)

	const [x, y] = getCoordinatesForPercent(anglePercentage, radius);

	return {
		x: x - POINT_RADIUS / 2,
		y: y - POINT_RADIUS / 2,
		title: contact.organisation,
		contactIndex,
		matchesSelectedTags: _matchesSelectedTags(contact, selectedTags),
	};
}

function getRadiusForContact({
	rangeIndex,
	contactIndexInBranchInRange,
}: {
	rangeIndex: number;
	contactIndexInBranchInRange: number;
}) {
	// prettier-ignore
	const maxRadiusForRange = (smallestRangePercentage + rangePercentageIncrement * rangeIndex) * maxRadius;
	// prettier-ignore
	const rangeIndexOffset = (rangeIndex === 0 ? smallestRangePercentage / 2 : rangePercentageIncrement / 2) * maxRadius
	const middleOfRange = maxRadiusForRange - rangeIndexOffset;

	const positiveOrNegativeOffset = contactIndexInBranchInRange % 2 ? -1 : 1;
	const pointOffset = rangeIndex === 0 ? POINT_RADIUS * 0.5 : POINT_RADIUS;
	const closeToCenterOffset = rangeIndex === 0 ? POINT_RADIUS : 0;

	// prettier-ignore
	const randomOffset = positiveOrNegativeOffset * Math.abs(Math.sin(contactIndexInBranchInRange)) * pointOffset + closeToCenterOffset

	return middleOfRange + randomOffset;
}

function _matchesSelectedTags(
	contact: (typeof contacts)[0],
	selectedTags: string[],
) {
	if (selectedTags.length === 0) {
		return true;
	}

	return selectedTags.every((tag) => contact.tags.includes(tag));
}
