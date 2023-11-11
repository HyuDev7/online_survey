import { NextResponse } from "next/server";
import { insertDoc } from "@/lib/mongodb";

export async function GET(request: Request) {
  return NextResponse.json({ test: "I got get method" });
}

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();

  //send form data to db and check the result
  const res = await insertDoc(sentData);

  return NextResponse.json({
    test: "I got POST method",
    where:"here is api"
  });
}
