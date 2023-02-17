import dotenv from "dotenv";
import airtable from 'airtable';
import * as jwt from 'jsonwebtoken';

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_CALC_TABLE || "");
    if (await jwt.verify(request.body.token, process.env.JWT_SECRET || "")) {
        let names = request.body.products.map((product: { name: any; }) => {
            return product.name;
        }).join(", ");
        let sum = 0.00;
        request.body.products.forEach((product: { price: string; }) => {
            sum += parseFloat(product.price);
        });
        await table.create({
            "Produkte": names,
            "Summe": sum
        });
        res.send({success: true});
    } else {
        res.send({error: "Unbekannter Token", success: false});
    }
}
