import dotenv from "dotenv";
import airtable from 'airtable';
import * as jwt from 'jsonwebtoken';
import {Attachment} from "airtable/lib/attachment";
import {Collaborator} from "airtable/lib/collaborator";

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_PREORDER_AUTOCOMPLETE_TABLE || "");
    let records = await table.select().all();
    let options: { value: string | number | boolean | Collaborator | readonly Collaborator[] | readonly string[] | readonly Attachment[] | undefined; price: string | number | boolean | Collaborator | readonly Collaborator[] | readonly string[] | readonly Attachment[] | undefined; }[] = [];
    if (await jwt.verify(request.body.token, process.env.JWT_SECRET || "")) {
        await records.forEach(record => {
            records.forEach(function (record) {
                options.push({value: record.get('Name'), price: record.get('Preis')});
            });
        });
        res.send({options: options, success: true});
    } else {
        res.send({error: "Unbekannter Token", success: false});
    }
}
