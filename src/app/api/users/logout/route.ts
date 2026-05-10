import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDatabase();


export async function GET(request:NextRequest){
  try {
    const response = NextResponse.json({message: "Logout success", success: true}, {status: 200});
    response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
    return response;
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500}) 
  }
}