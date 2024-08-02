import * as fs from "node:fs";
import { parse } from "csv";

try {
	const data = fs.readFileSync("./Kontaktliste_Fokusthema-export.csv", "utf8");
	const records = parse(data);

	fs.writeFileSync("./contacts.json", JSON.stringify(records, null, 2));
} catch (err) {
	console.error(err);
}
