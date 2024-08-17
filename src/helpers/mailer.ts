import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }:any) => {


  try {


    // todo configer mail for uses




    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,                                    // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = { 
      from: 'Kaushal@hmail.com',                                                        // sender address
      to: email,                                                                        // list of receivers
      subject: emailType === 'VERIFY' ? "very your email" : "Reset your password",       // Subject line
      text: "Hello world?",                                                                // plain text body
      html: "<b>Hello world?</b>",                                                          // html body
    };


    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;


  } catch (error:any) {

    throw new Error(error);



  }
};
