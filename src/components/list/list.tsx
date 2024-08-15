/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { branches } from "../../data/branches";
import { ranges } from "../../data/ranges";
import { contacts } from "../../data/contacts";
import { borderColors, tagColors, iconColors } from "./list-colors";
import { PlusIcon } from "../icons/plus-icon";
import { MinusIcon } from "../icons/minus-icon";

const findContactsIndex = (contact: object) => {
	return contacts.findIndex((index) => index === contact) + 1;
};

export const List: React.FC = () => {
	const [isExpanded, setIsExpanded] = useState<boolean[]>(
		branches.map(() => true),
	);

	return (
		<div
			id="listView"
			className="flex flex-col w-full gap-12 justify-between px-12 my-12"
		>
			{branches
				.map((branch, branchIndex) => (
					<div key={branch.name} className={`flex flex-col w-full`}>
						<div
							className={`flex flex-row justify-between w-full border-b-4 ${borderColors[branchIndex]} `}
						>
							<h2 className={`text-3xl leading-loose font-medium `}>
								{branch.name}
							</h2>
							<button
								className={`${iconColors[branchIndex]}`}
								onClick={() => {
									const expanded = [...isExpanded];
									expanded[branchIndex] = !expanded[branchIndex];
									setIsExpanded(expanded);
								}}
							>
								{isExpanded[branchIndex] ? <MinusIcon /> : <PlusIcon />}
							</button>
						</div>
						{isExpanded[branchIndex] && (
							<div
								className={`flex flex-col justify-between lg:flex-row gap-9`}
							>
								{ranges.map((range, rangeIndex) => (
									<ol
										className=" w-full flex flex-col pt-4 lg:w-1/4"
										key={range.name}
									>
										<div
											className={`rounded-full w-fit px-4 py-3 mb-4 ${tagColors[branchIndex][rangeIndex]}
										${branchIndex === 3 ? "text-white" : "text-sr-lighter-black"}`}
										>
											{range.name}
										</div>
										{contacts
											.filter(
												(contact) =>
													contact.branch === branch.name &&
													contact.range === range.name,
											)
											.map((contact, contactIndex) => (
												<li
													key={contact.organisation}
													className={`font-medium border-sr-light-grey px-2 py-3 flex flex-row 
												${contactIndex === 0 ? "border-none" : "border-t"}`}
												>
													<div className="min-w-9">
														{findContactsIndex(contact)}
													</div>
													<div>{contact.organisation}</div>
												</li>
											))}
									</ol>
								))}
							</div>
						)}
					</div>
				))
				.reverse()}
		</div>
	);
};
