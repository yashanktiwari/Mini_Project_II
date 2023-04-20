require('dotenv').config();
const express = require('express');
const verifyEmailRouter = express.Router();
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

verifyEmailRouter
    .route('/verifyemail')
    .post(verifyEmail);

function verifyEmail(req, res) {
    const {email} = req.body;

    let otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });

    sendmail(email, otp);
    res.send({
        otp
    });
}

function sendmail(email, otp) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // port for smtp
        secure: false,
        auth: {
            user: 'assist.estately@gmail.com',
            pass: 'jajypjwmtotuyfjq'
        }
    });

    transporter.sendMail({
        from: `assist.estately@gmail.com`,
        to: `${email}`,
        subject: `Estately - Verify your email`,
        html: `
<!DOCTYPE html>
<h1>Hii, OTP for verifying your email is ${otp}</h1>
`
    })
        .then((info) => {
            return info;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

module.exports = verifyEmailRouter;