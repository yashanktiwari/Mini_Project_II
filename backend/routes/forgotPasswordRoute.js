const express = require('express');
const forgotPasswordRouter = express.Router();
const nodemailer = require('nodemailer');

const Consumer = require('../models/consumerModel');
const Retailer = require('../models/retailerModel');

forgotPasswordRouter
    .route('/forgotpasswordu')
    .post(forgotPassword);

forgotPasswordRouter
    .route('/forgotpasswordr')
    .post(forgotPassword);

function forgotPassword(req, res) {
    const {email, retailer} = req.body;
    let model;
    if(retailer) {
        model = Retailer;
    } else {
        model = Consumer;
    }
    model.findOne({email: email})
        .then((userObj) => {
            if(userObj == null) {
                res.send({
                    error: "User not found"
                })
            } else {
                let otp = userObj.generateOTP();
                model.updateOne({email: email}, {$set: {otp: otp}})
                    .then(() => {
                        sendmail(email, otp);
                        res.send(userObj);
                    })
                    .catch(() => {
                        res.send({
                            error: "Some error occurred"
                        })
                    });
            }
        })
        .catch((error) => {
            res.send({
                error: error.message
            })
        });
}

function sendmail(email, otp) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // port for smtp
        secure: false,
        auth: {
            user: 'yashanktiwari@gmail.com',
            pass: 'ykixnulfxtqbqklb'
        }
    });

    transporter.sendMail({
        from: `yashanktiwari@gmail.com`,
        to: `${email}`,
        subject: `Estately - Reset your password`,
        html: `
<!DOCTYPE html>
<h1>Hii, Recently there was a request made to change your password on Estately.</h1>
<h3>The OTP for changing the password is ${otp}</h3>
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

module.exports = forgotPasswordRouter;