import { NextResponse } from "next/server";
import { getSessionId, insertDoc } from "@/lib/mongodb";

export async function GET(request: Request) {
  return NextResponse.json({ test: "I got get method" });
}

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();
  let gotSessionID = "";

  if (sentData.hasOwnProperty("passCode")) {
    //get session id
    const res = await getSessionId(sentData);
    gotSessionID = res.sessionID;
  } else {
    //send form data to db and check the result
    const res = await insertDoc(sentData);
  }

  return NextResponse.json({ test: "I got POST method", sessionID: gotSessionID });
}
