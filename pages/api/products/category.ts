import dotenv from "dotenv";
import airtable from 'airtable';
import * as jwt from 'jsonwebtoken';
import {Attachment} from "airtable/lib/attachment";
import {Collaborator} from "airtable/lib/collaborator";

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    if (await jwt.verify(request.body.token, process.env.JWT_SECRET || "")) {
        let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_PRODUCTS_TABLE || "");
        let records = await table.select().all();
        const categories: (string | number | boolean | Collaborator | readonly Collaborator[] | readonly string[] | readonly Attachment[] | undefined)[] = [];
        records.forEach(record => {
            if (!categories.includes(record.fields.Kategorie)) {
                categories.push(record.fields.Kategorie);
            }
        });
        res.send(categories);
    } else {
        res.send({error: "Unbekannter Token", success: false});
    }
}
