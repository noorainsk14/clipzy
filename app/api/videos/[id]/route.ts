import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await  params;
  try {
    connectToDatabase();
    const video = await Video.findById(id);
    if(!video){
      return NextResponse.json({
        error:"Video not found"
      },
    {
      status: 400
    })
    }
     return NextResponse.json(
      video
     )


  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {error: "Something went wrong"},
      {status: 500}
    )
  }
}
