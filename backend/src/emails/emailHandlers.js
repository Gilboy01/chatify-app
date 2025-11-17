import {resendClient, sender} from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"

export const sendWelcomeEmail = async(email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to chatify',
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if(error){
        console.log('Error sending email:', error); // return error
        throw new Error("Failed to send email");
    }
    console.log('Email sent successfully', data); // return data
}