import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    

    try {
      const authenticationParameter = getUploadAuthParams({
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
      })
  
      return NextResponse.json({ authenticationParameter, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
    } catch (error) {
      console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      {
        status: 500,
      }
    )
    }
}