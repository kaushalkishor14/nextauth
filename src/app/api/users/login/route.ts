import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt  from "jsonwebtoken"

// Establish database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: "User does not exist",
      });
    }
    console.log(user, "user exists");

    // jwt token

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

   const token =   jwt.sign(tokenData ,
     process.env.TOKEN_SECRET!, 
     {expiresIn: "1d"}
  )

 const response = NextResponse.json({
    message: "Login successful",
    success: true
  })

  // cookies bhej rha huun

  response.cookies.set("token", token,
    {httpOnly:true}
  )

  return response


    
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 400 }
      );
    }






  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
