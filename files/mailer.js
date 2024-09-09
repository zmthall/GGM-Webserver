const nodemailer = require("nodemailer");
require('dotenv').config()

let mailer_settings = {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
}

async function send_email(message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true, //ssl
        auth: {
            user: mailer_settings.username,
            pass: mailer_settings.password,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    if(message.from === undefined)
        message.from = mailer_settings.username

    try {
        if(message.text.includes(undefined)) {
            throw new Error('Message contains undefined fields')
        } else {
            const info = await transporter.sendMail(message)
        }
    } catch(err) {
        console.error("Error:", err)
    }
}

module.exports = {
    send_email: send_email
}