import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }:any) => {


  try {

       const hashToken =  await bcryptjs.hash(userId.toString(), 10)

    if(emailType === 'VERIFY'){

      await User.findByIdAndUpdate(userId,
        {
           verifyToken: hashToken, 
           verifyTokenExpires: Date.now() + 3600000
        },
         )

    } else if (emailType === 'RESET'){
      await User.findByIdAndUpdate(userId,
        {
          forgotPasswordToken: hashToken, 
          forgotPasswordTokenExpires: Date.now() + 3600000
        },
      )

    }




    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "22c3aab2b9e2bd",     //
        pass: "8c1d94aeee2560"     //
      }
    });

    const mailOption = { 
      from: 'Kaushal@hmail.com',                                                        // sender address
      to: email,                                                                        // list of receivers
      subject: emailType === 'VERIFY' ? "very your email" : "Reset your password",       // Subject line
      text: "Hello world?",                                                                // plain text body
      html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here </a> to ${emailType === 'VERIFY' ? 'verify' : 'reset your password'}
       or copy and paste the link below in browser.
       <br>
       ${process.env.DOMAIN}/verifyemail?token=${hashToken}
       </p>`,                                                          // html body
    };


    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;


  } catch (error:any) {

    throw new Error(error);



  }
};
