import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  try {
    await connectToDatabase();

    const video = await Video.find({}).sort({createdAt: -1}).lean()
    if(!video || video.length === 0){
      return NextResponse.json([], {status: 200})
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

export async function POST(request: NextRequest){

  try {
    const session = await getServerSession(authOptions);
  
    if(!session){
  
       return NextResponse.json(
        {error: "User is not authenticated"},
        {status: 401}
      )
    }
  
    await connectToDatabase();
  
    const body:IVideo = await request.json();
  
    //Validate required field
    if(
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnail
    ){
      return NextResponse.json(
        {message: "Above fields (title, description, videoUrl, thumbnail) are required"},
        {status: 400}
      )
    }
  
    //created new video with default valuse  
  
    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
  
      }
    }
  
   const newVideo = await Video.create(videoData)
  
   return NextResponse.json(
    newVideo,
    { status: 201 }
   )
  } catch (error) {
    console.error("Error in creating video", error);
    return NextResponse.json(
      {error: "failed to create video"},
      {status: 500}
    )
  }
}