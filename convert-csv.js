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
	return records
		.map(toContact)
		.filter(({ organisation }) => organisation !== "");
}

function toContact(record) {
	return {
		organisation: record["﻿Organisation"],
		branch: record["Branche"],
		range: record["Wirkungsgrad"],
		website: record["Website"],
		tags: toTags(record["Tags"]),
		description: record["Beschreibung (short description)"],
	};
}

function toTags(tags) {
	return tags
		.split(",")
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
