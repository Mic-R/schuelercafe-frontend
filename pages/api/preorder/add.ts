import dotenv from "dotenv";
import airtable from 'airtable';
import * as jwt from 'jsonwebtoken';

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_PREORDER_TABLE || "");
    if (await jwt.verify(request.body.token, process.env.JWT_SECRET || "")) {
        await table.create({
            "Nummer": request.body.number,
            "Produkt": request.body.product,
            "Status": 0,
            "Preis": parseFloat(request.body.price)
        });
        res.send({success: true});
    } else {
        res.send({error: "Unbekannter Token", success: false});
    }
}
