import { findAnswers } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();
  const res = await findAnswers(sentData.sessionID);

  return NextResponse.json({ test: "I got POST method", answers: res });
}
