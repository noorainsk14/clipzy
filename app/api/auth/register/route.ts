import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {

  try {
    const {email , password} = await request.json()

  if(!email || !password){
    return NextResponse.json({
      error:"Email and Password is required"
    },{status: 400})
  }

  await connectToDatabase();

  const existingUser = await User.findOne({email});

  if(existingUser){
    return NextResponse.json(
      {error: "Email is already registered"},
      {status: 400}
    )
  }

   await User.create({
    email,
    password
  })


  return NextResponse.json(
    {message: "User registered Succesfully"},
    {status: 201}
  )
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {error: "Failed to register user"},
      {status: 500}
    )
  }
  
  
}