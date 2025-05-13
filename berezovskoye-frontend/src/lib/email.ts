"use server"

import {FeedbackForm} from "@/database";
import nodemailer from 'nodemailer';

export const sendFeedback = async (feedbackForm: FeedbackForm) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const htmlContent = `
        <h1>Новое сообщение обратной связи</h1>
        <p><strong>ФИО:</strong> ${feedbackForm.fullName}</p>
        <p><strong>Email:</strong> ${feedbackForm.email || 'не указан'}</p>
        <p><strong>Телефон:</strong> ${feedbackForm.phone}</p>
        <p><strong>Адрес:</strong> ${feedbackForm.address}</p>
        <h2>Сообщение:</h2>
        <p>${feedbackForm.message}</p>
    `;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `Новое сообщение от ${feedbackForm.fullName}`,
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return {success: true, messageId: info.messageId};
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
