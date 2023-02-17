import dotenv from "dotenv";
import airtable from 'airtable';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

dotenv.config();

//configure Airtable
airtable.configure({apiKey: process.env.AIRTABLE_API_KEY});

export default async function handler(request: any, res: any) {
    let code = request.body.code;
    let table = airtable.base(process.env.AIRTABLE_BASE_ID || "").table(process.env.AIRTABLE_USERS_TABLE || "");
    let records = await table.select().all();
    let valid = false;
    let admin = false;
    await records.forEach((record: any) => {
        if (bcrypt.compareSync(code, record.fields.Hash) && !valid) {
            valid = true;
            if (record.fields.Admin) {
                admin = true;
            }
        }
    });
    if (valid) {
        const token = jwt.sign({code: code, auth: true, admin: admin}, process.env.JWT_SECRET || "", {expiresIn: '1d'});
        res.json({success: true, token: token});
    } else {
        //code is invalid, return error
        res.json({error: "Unbekanntes Login", success: false});
    }
}
