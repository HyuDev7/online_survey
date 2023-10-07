import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/mongodb";

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();
  let gotSessionID = "";

  //get session id
  const res = await getSessionId(sentData);
  gotSessionID = res.sessionID;

  return NextResponse.json({
    test: "I got POST method",
    sessionID: gotSessionID,
  });
}
