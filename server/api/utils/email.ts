import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
export const sendEmail = async (option: any) => {
    // create a transporter using mailtrap credentials
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT!), //--> had error because process.env.EMAIL_PORT was returning a string by default instead of a number
        // secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    // create email option

    const emailOptions = {
        from: 'from support@FutureApp.com',
        to: option.email,
        subject: option.subject,
        text: option.text
    };

    await transporter.sendMail(emailOptions);
};
