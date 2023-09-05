import { findSessionId } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();
  const res = await findSessionId(sentData);
  
  return NextResponse.json({ test: "I got POST method", isAuthorised: res });
}
