import model from "../model/model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, amount, date, village } = await req.json();
        const token = req.cookies.get('authentication')?.value;
        const isVerify = jwt.verify(token!, process.env.key!);
        if (!isVerify) {
            return NextResponse.json({ massage: 'invalid token', stetus: 404 })
        }
        await model.findOneAndUpdate(
            { email: isVerify },
            { $push: { debtors: { name, amount, date, village } } },
            { new: true }
        );
        return NextResponse.json({ massage: "Successfully Added", stetus: 200 });
    } catch {
        return NextResponse.json({ massage: 'server error', stetus: 500 });
    }
}