import dotenv from "dotenv";
import airtable from 'airtable';
import * as jwt from 'jsonwebtoken';

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_PREORDER_TABLE || "");
    if (await jwt.verify(request.body.token, process.env.JWT_SECRET || "")) {
        const records = await table.select().all();
        for (const record of records) {
            if (record.fields.Nummer === request.body.number) {
                await table.update(record.id, {
                    Status: request.body.status
                });
                res.send({success: true});
            }
        }
    } else {
        res.send({error: "Unbekannter Token", success: false});
    }
}
