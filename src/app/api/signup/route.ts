import model from "../model/model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();
        const isEmaiil = await model.findOne({ email });
        if (isEmaiil) {
            return NextResponse.json({ massage: 'email is allready exists', stetus: 403 })
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const userCreate = await model.create({ username, email, password: salt });
        return NextResponse.json({ message: "User created successfully", stetus: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ massage: 'server error', stetus: 500 })
    }
}