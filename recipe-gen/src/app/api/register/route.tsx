import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        
        const body = await req.json();
        console.log("request received", body);
        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 200 }
          );
    } catch (err) {
        console.error(err + "getting route");
        //return NextResponse.status(500).json({ error: "An error occurred" });
    }
};