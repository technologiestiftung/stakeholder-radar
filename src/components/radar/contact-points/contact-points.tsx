import { contacts } from "../../../data/contacts";
import { branches } from "../../../data/branches";
import { ranges } from "../../../data/ranges";
import { useSelectedContactStore } from "../../../stores/selected-contact-store";
import { useSelectedTagsStore } from "../../../stores/selected-tags-store";
import {
	anglePerSlicePercentage,
	rangePercentageIncrement,
	smallestRangePercentage,
} from "../../../geometry/variables";
import { getCoordinatesForPercent } from "../../../geometry/geometry";
import { maxRadius, isMobile } from "../../../geometry/constants";
import { ContactTooltip } from "./contact-tooltip";

const POINT_RADIUS = isMobile ? 16 : 20;

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
						className="group absolute cursor-pointer rounded-full bg-white flex justify-center"
						key={title}
						style={{
							top: `${y}px`,
							left: `${x}px`,
							width: `${POINT_RADIUS}px`,
							height: `${POINT_RADIUS}px`,
							opacity: matchesSelectedTags ? 1 : 0.3,
						}}
						onClick={() => setSelectedContact(contacts[contactIndex])}
					>
						<div className="flex w-full h-full justify-center items-center lining-nums md:text-xs text-[11px] drop-shadow-2xl z-0 rounded-full cursor-pointer">
							{contactIndex + 1}
						</div>
						{matchesSelectedTags && <ContactTooltip title={title} />}
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
