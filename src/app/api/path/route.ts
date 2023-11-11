import { NextResponse } from "next/server";
import { findPath } from "@/lib/mongodb";

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();

  //get a next path
  const res = await findPath(sentData.sessionID);
  let gotPaths = res;
  // console.log("this is returned paths")
  // console.log(gotPaths)

  return NextResponse.json({
    test: "I got POST method",
    paths: gotPaths,
  });
}
