import { updateAgreement } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();
  console.log(sentData)
  const res = await updateAgreement(sentData);
  
  return NextResponse.json({ test: "I got POST method", agreement: res });
}
