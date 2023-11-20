import { findOrderCondition } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  //read sent form data
  //sentData is sessionID
  const sentData = await request.json();
  const res = await findOrderCondition(sentData);

//   console.log(res)
  
  return NextResponse.json({ test: "I got POST method", assessCond: res.assessmentOrder });
}
