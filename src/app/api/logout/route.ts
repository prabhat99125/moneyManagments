import { NextRequest, NextResponse } from "next/server"

export function POST(req: NextRequest) {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set('authentication', '', { httpOnly: true });
    return response;
}