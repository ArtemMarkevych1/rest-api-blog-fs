const nodemailer = require('nodemailer');
const { MAIL_USER, MAIL_PASS } = require('../config/keys');

const sendEmail = async (email, subject, code, content) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        }
    });

    const mailOptions = {
        from: MAIL_USER,
        to: email,
        subject,
        html: `
        <h1>Verify your email</h1>
        <p>Use this below code the ${content}</p>
        <p>Your verification code is: <strong>${code}<strong></p>
        <p>This code will expire in 15 minutes</p>
        <p>If you did not request this, please ignore this email</p>
        `
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};

module.exports = sendEmail;