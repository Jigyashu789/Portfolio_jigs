import { NextResponse } from "next/server"
import { achievements } from "@/lib/data"

export async function GET() {
    return NextResponse.json(achievements)
}
