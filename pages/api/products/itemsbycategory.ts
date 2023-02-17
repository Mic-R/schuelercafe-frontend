import dotenv from "dotenv";
import airtable from 'airtable';
import * as jwt from 'jsonwebtoken';
import {FieldSet} from "airtable/lib/field_set";

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    if (await jwt.verify(request.body.token, process.env.JWT_SECRET || "")) {
        let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_PRODUCTS_TABLE || "");
        let records = await table.select().all();
        const products: FieldSet[] = [];
        records.forEach(record => {
            if (record.fields.Kategorie === request.body.category) {
                products.push(record.fields);
            }
        });
        res.send(products);
    } else {
        res.send({error: "Unbekannter Token", success: false});
    }
}
