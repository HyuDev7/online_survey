import { NextResponse } from "next/server";
import { insertDoc } from "@/lib/mongodb";

export async function GET(request: Request) {
  return NextResponse.json({ test: "I got get method" });
}

export async function POST(request: Request) {
  //read sent form data
  const sentData = await request.json();

  // console.log("this is sent data");
  // console.log("the type is " + typeof sentData);
  // console.dir(sentData);
  // Object.keys(sentData).forEach(function (key) {
  //   console.dir(key + "のタイプは " + typeof sentData[key]);
  // });
  // //get the last property name from object
  // const lastProperty = Object.keys(sentData)[Object.keys(sentData).length - 1];
  // const timestamp = Date.parse(sentData[lastProperty]);
  // const parsedData = JSON.parse(sentData);
  // console.log(parsedData);

  //send form data to db and check the result
  const res = await insertDoc(sentData);

  return NextResponse.json({
    test: "I got POST method",
    where: "here is api",
  });
}
