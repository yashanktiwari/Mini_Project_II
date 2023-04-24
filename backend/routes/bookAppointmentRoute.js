const express = require('express');
const nodemailer = require("nodemailer");
const bookAppointmentRouter = express.Router();

bookAppointmentRouter
    .route('/bookappointment/:email')
    .post(bookAppointment);

function bookAppointment(req, res) {
    const {email} = req.params;
    const {date, month, year, timeSlot, fullName} = req.body;
    sendmail(date, month, year, timeSlot, fullName, email);
    res.send({
        message: 'Appointment booked'
    });
}

function sendmail(date, month, year, timeSlot, fullName, email) {
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
        subject: `Estately Appointment booked`,
        html: `
<!DOCTYPE html>
<h2>Hii ${fullName},</h2>
<br>
<p>Your appointment for your chosen property is booked successfully on</p>
<p>Date: ${date}/${month}/${year} and Time: ${timeSlot}</p>
  
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

module.exports = bookAppointmentRouter;