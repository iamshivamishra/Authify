import {connectToDatabase} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connectToDatabase();

export async function POST(request:NextRequest){
 try {
  
  const reqBody = await request.json()
  const {email, password} = reqBody
  console.log(reqBody)
  
  // check if user already exists

  const isUserExist = await User.findOne({email})

  if(!isUserExist){
   return NextResponse.json({error: "User does not exist"}, {status: 400}) 
  }

  // check if password is correct

  const validPassword = await bcrypt.compare(password, isUserExist.password)

  if(!validPassword){
   return NextResponse.json({error: "Invalid password"}, {status: 400}) 
  }

  // create token Data 
   const tokenData = {
    id: isUserExist._id,
    username: isUserExist.username,
    email: isUserExist.email 
   }

   // create token
   const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"}) 

   const response =  NextResponse.json({message: "Login successful"}, {status: 200}), sucess = true

   response.cookies.set("token", token, {
    httpOnly: true,
   })

   return response;

 } catch (error: any) {
  return NextResponse.json({error: error.message}, {status: 500})
 } 
}