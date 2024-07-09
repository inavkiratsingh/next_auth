import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            const updatedUser = await User.findByIdAndUpdate(
                userId, 
                {$set: {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}}
            )
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId, 
                {$set: {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}}
            )
        }
        
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "03ede44c285193",
              pass: "71b63a4334b8d2"
            }
        });

        const mailOptions = {
            from: 'navkirat@nav.ai',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            text: "Hello world?",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset  your password"} or copy and paste the link below in you browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}