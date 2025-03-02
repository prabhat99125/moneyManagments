import model from "../model/model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const isEmail = await model.findOne({ email });
        if (!isEmail) {
            return NextResponse.json({ massage: 'something went wrong', stetus: 404 });
        }
        const isPassword = await bcrypt.compare(password, isEmail.password);
        if (isPassword) {
            return NextResponse.json({ massage: 'something went wrong password', stetus: 404 });
        }
        const token = await jwt.sign(isEmail.email, process.env.key!);
        const userRespons = NextResponse.json({ message: "User logged in", status: 200 });
        userRespons.cookies.set('authentication', token, { httpOnly: true });
        return userRespons;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ massage: 'server error', stetus: 500 });

    }
}