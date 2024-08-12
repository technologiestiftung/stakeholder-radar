import * as fs from "node:fs";
import { parse } from "csv-parse/sync";

try {
	const data = fs.readFileSync(process.argv[2], "utf8");
	const records = parse(data, { delimiter: ";", columns: true });

	const contacts = getContacts(records);
	const contactsJson = JSON.stringify(contacts, null, 2);
	fs.writeFileSync(
		"./src/data/generated/contacts.ts",
		`export const contacts = ${contactsJson}`,
	);

	const branches = getBranches(contacts);
	const branchesJson = JSON.stringify(branches, null, 2);
	fs.writeFileSync(
		"./src/data/generated/branches.ts",
		`export const branches = ${branchesJson}`,
	);

	const ranges = getRanges(contacts);
	const rangesJson = JSON.stringify(ranges, null, 2);
	fs.writeFileSync(
		"./src/data/generated/ranges.ts",
		`export const ranges = ${rangesJson}`,
	);
} catch (err) {
	console.error(err);
}

function getContacts(records) {
	const contacts = records
		.map(toContact)
		.filter(({ organisation }) => organisation !== "")
		.filter(isDuplicate);

	checkAndWarnForEmptyFields(contacts);

	return contacts;
}

function toContact(record) {
	return {
		organisation: record["﻿Organisation"],
		branch: record["Branche"],
		range: record["Wirkungsgrad (Entwickler:innen, Mitstreiter:innen, Expert:innen, mögliche Partner:innen)"],
		website: record["Website"],
		tags: toTags(record["Tags"]),
		description: record["Beschreibung (short description)"],
	};
}

function isDuplicate({ organisation }, index, contacts) {
	const indexOfFirstOccurrence = contacts.findIndex(
		(contact) => contact.organisation === organisation,
	);

	return index === indexOfFirstOccurrence;
}

function checkAndWarnForEmptyFields(contacts) {
	const relevantFields = ["branch", "range", "website", "description"];

	contacts.forEach((contact) => {
		const emptyFields = relevantFields.filter((field) => contact[field] === "");

		if (emptyFields.length === 0) {
			return;
		}

		console.warn(
			`Warning: organisation "${contact.organisation}" has empty field(s): ${emptyFields.join(", ")}`,
		);
	});
}

function toTags(tags) {
	const tagsArray = tags?.split(",") ?? [];
	return tagsArray
		.map((tag) => tag.trim())
		.filter((tag) => tag !== "");
}

function getBranches(contacts) {
	const sanitizedUniqueBranches = [
		...new Set(contacts.map(({ branch }) => branch.trim())),
	];
	return sanitizedUniqueBranches.map((branch) => ({
		name: branch,
		description: "",
	}));
}

function getRanges(contacts) {
	const sanitizedUniqueRanges = [
		...new Set(contacts.map(({ range }) => range.trim())),
	];
	return sanitizedUniqueRanges.map((range) => ({
		name: range,
	}));
}
