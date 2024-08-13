/* eslint-disable no-nested-ternary */
import React from "react";
import { branches } from "../../data/branches";
import { ranges } from "../../data/ranges";
import { contacts } from "../../data/contacts";
import { borderColors, tagColors } from "./list-colors";

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
									className={`rounded-full w-fit px-4 py-3 mb-4 ${tagColors[branchIndex][rangeIndex]}
                                    ${branchIndex === 3 ? "text-white" : "text-sr-black"}`}
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
