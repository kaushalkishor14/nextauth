import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'



connect()


export async function POST(request: NextRequest) {

    try {
        
    const reqBody = await  request.json() 
    const {username , email, password} = reqBody

    // validation
    console.log(reqBody)




// user register first check user exist hai yaa nhi
  const user =  await User.findOne({email: email})

  if(user){
    return NextResponse.json({error:"User already exists"}, {status: 400})
  }



//   password ko hashing krte hai password ko bcrypt krte hai

// salt genrate krna hoga phle

        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

   const newUser =     new User({
            username,
            email,
            password: hashedPassword
        })
       

        // save krna hai newuser ko

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email to user

       await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

       return NextResponse.json({
        message:"user created successfully",
        savedUser
    },
         {status: 200},
        
        )



    } catch ( error : any ) {

        return NextResponse.json({error:error.message}, {status: 500})
        
    }
}


