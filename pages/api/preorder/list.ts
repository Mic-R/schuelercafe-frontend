import dotenv from "dotenv";
import airtable from 'airtable';
import * as jwt from 'jsonwebtoken';
import {FieldSet} from "airtable/lib/field_set";

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_PREORDER_TABLE || "");
    let records = await table.select().all();
    const orders: FieldSet[] = [];
    if (await jwt.verify(request.body.token, process.env.JWT_SECRET || "")) {
        await records.forEach(record => {
            orders.push(record.fields);
        });
        res.send(orders);
    } else {
        res.send({error: "Unbekannter Token", success: false});
    }
}
