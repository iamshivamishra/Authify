import {connectToDatabase} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connectToDatabase();


export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json();
    const {username, email, password} = reqBody 
    
  // check if user already exists

  const isUserExist = await User.findOne({email})

  if(isUserExist){
   return NextResponse.json({error: "User already exists"}, {status: 400}) 
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  
  // create user
    
  const newUser = new User({
    username,
    email,
    password: hashPassword
  })

  const savedUser = await newUser.save()
  console.log(savedUser)


  // send verification email

  await sendEmail({
    email,
    emailType: "VERIFY",
    userId: savedUser._id
  })

  return NextResponse.json({
    message: "User created successfully",
    success: true,
    savedUser
  })

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}

