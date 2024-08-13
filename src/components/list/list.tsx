/* eslint-disable no-nested-ternary */
import React from "react";
import { branches } from "../../data/branches";
import { ranges } from "../../data/ranges";
import { contacts } from "../../data/contacts";

const borderColors = [
	"border-b-sr-magenta-100",
	"border-b-sr-purple-100",
	"border-b-sr-emerald-100",
	"border-b-sr-blue-100",
];

const tagColors = [
	"bg-sr-magenta-100",
	"bg-sr-purple-100",
	"bg-sr-emerald-100",
	"bg-sr-blue-100",
	"bg-sr-magenta-75",
	"bg-sr-purple-75",
	"bg-sr-emerald-75",
	"bg-sr-blue-75",
	"bg-sr-magenta-50",
	"bg-sr-purple-50",
	"bg-sr-emerald-50",
	"bg-sr-blue-50",
	"bg-sr-magenta-25",
	"bg-sr-purple-25",
	"bg-sr-emerald-25",
	"bg-sr-blue-25",
];

export const List: React.FC = () => {
	return (
		<div className="flex flex-col w-full gap-12 justify-between px-12 my-12">
			{branches.map((branch, branchIndex) => (
				<div key={branch.name} className={`flex flex-col`}>
					<h2
						className={`text-3xl leading-loose font-medium border-b-4 ${borderColors[branchIndex]}`}
					>
						{branch.name}
					</h2>
					<div className="flex flex-col justify-between lg:flex-row gap-9">
						{ranges.map((range, rangeIndex) => (
							<ol
								className=" w-full flex flex-col pt-4 list-decimal list-inside lg:w-1/4"
								key={range.name}
							>
								<div
									className={`rounded-full w-fit px-4 py-3 ${tagColors[branchIndex]}
                                    ${branchIndex === 3 ? "text-white" : ""}`}
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
											className={`font-medium  border-sr-list-gray px-2 py-3 
                                                ${contactIndex === 0 ? "border-b" : contactIndex === contacts.length - 2 ? "border-red-500 border-t" : "border-y"}`}
										>
											{contact.organisation}
										</li>
									))}
							</ol>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

// <ul>
// 	{items.map((item) => (
// 		<li key={item.id}>{item.text}</li>
// 	))}
// 	hi
// </ul>
