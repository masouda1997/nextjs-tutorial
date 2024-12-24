import { NextRequest } from "next/server";
import { FakeCommentData } from "../data";

export async function GET(request:NextRequest) {
  
  // const searchParams = request.nextUrl.searchParams
  // const query = searchParams.get("quey")
  // const filteredData = query ? FakeCommentData.filter(q => q.content.includes(query)): FakeCommentData
  // // const allCommnet = FakeCommentData
  return Response.json(FakeCommentData)
}

export async function POST(request:Request){

  console.log(request.method + "✅")
  if(request.method !== "POST"){
    return new Response(JSON.stringify({message:`method not allowed, only ${request.method} is allowd`}) , {
      status:405
    })
  }

  const comment  = await request.json()
  const newComment = {
    id:FakeCommentData.length+1,
    postId : comment.postId,
    author:comment.author,
    email:comment.email,
    content:comment.content,
    createdAt:new Date().toISOString()
  }
  FakeCommentData.push(newComment)

  return new Response(JSON.stringify(newComment) , {
    status:201,
    headers: {
      "Content-Type": "application/json"
    }
  })
}