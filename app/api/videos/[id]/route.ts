import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const videoId = params.id;  

    const video = await Video.findById({videoId})
    if(!video ){
      return NextResponse.json({message: "Video is not found"}, {status: 400})
    }
    return NextResponse.json(video)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {error: "failed to fetch video"},
      {status: 400}
    )
  }
}
