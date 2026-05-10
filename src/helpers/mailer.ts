import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";
import { NextResponse } from "next/server";


export const sendEmail = async ({email,emailType, userId}: any) => {
  try {
    // create a hash token
    const hashedToken = crypto.randomBytes(32).toString("hex");
     
    if(emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      })
    }else if(emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        fogotPasswordToken: hashedToken,
        fogotPasswordTokenExpiry: Date.now() + 3600000
      })
    }

   var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "015274c48f3842",
    pass: "73989f46b6fe1b"
  }
});

const mailOptions = {
  from: "alwayshivamishra@gmail.com",
  to: email,
  subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
  html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
}
  const mailResponse = await transport.sendMail(mailOptions); 
  return mailResponse;

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})  
  }
}