import model from "../../model/model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('authentication')?.value;
        const isVerify = await jwt.verify(token!, process.env.key!);
        if (!isVerify) {
            return NextResponse.json({ massage: 'invalid token', stetus: 404 });
        }
        const user = await model.findOne({ email: isVerify });
        return NextResponse.json(user.creditors);
    } catch {
        return NextResponse.json({ massage: 'server error', stetus: 500 });
    }
}