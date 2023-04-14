const express = require('express');
const contactusRouter = express.Router();
const nodemailer = require('nodemailer');

contactusRouter
    .route('/contactus')
    .post(postContactUs)

async function postContactUs(req, res) {
    const {email, subject, message} = req.body;
    const info = await sendmail(email, subject, message)
    res.send(info);
}

function sendmail(email, subject, message) {
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
        from: `<${email}>`,
        to: "assist.estately@gmail.com",
        subject: `From: ${email}: ${subject}`,
        html: `
<!DOCTYPE html>
<h2>${message}</h2>
`
    })
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
}

module.exports = contactusRouter;