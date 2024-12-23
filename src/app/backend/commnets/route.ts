import { NextRequest } from "next/server";
import { FakeCommentData } from "../data";

export async function GET(request:NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("quey")
  const filteredData = query ? FakeCommentData.filter(q => q.content.includes(query)): FakeCommentData
  // const allCommnet = FakeCommentData
  return Response.json(filteredData)
}

