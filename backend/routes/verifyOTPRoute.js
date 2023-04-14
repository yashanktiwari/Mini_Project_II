const express = require('express');
const verifyOtpRouter = express.Router();

const Consumer = require('../models/consumerModel');
const Retailer = require('../models/retailerModel');

verifyOtpRouter
    .route('/verifyotpu')
    .post(verifyOtp);

verifyOtpRouter
    .route('/verifyotpr')
    .post(verifyOtp);

function verifyOtp(req, res) {
    const {email, otp, retailer} = req.body;
    let model;
    if(retailer) {
        model = Retailer;
    } else {
        model = Consumer;
    }

    model.findOne({email: email})
        .then((user) => {
            if(user.otp === otp) {
                model.updateOne({email: email}, {$unset: {otp: 1}})
                    .then(() => {
                        res.send({
                            success: "OTP verified"
                        });
                    })
                    .catch((error) => {
                        res.send({
                            error: "Some error occurred"
                        });
                    });
            } else {
                res.send({
                    error: "Incorrect OTP"
                })
            }
        })
        .catch((error) => {
            res.send({
                error: error
            })
        });
}

module.exports = verifyOtpRouter