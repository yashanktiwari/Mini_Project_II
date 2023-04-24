require('dotenv').config();
const Razorpay = require('razorpay');
const express = require('express');
const paymentRouter = express.Router();
const crypto = require("crypto");

paymentRouter
    .route('/orders')
    .get(createOrder);

paymentRouter
    .route('/verify')
    .post(verifyOrder);

function verifyOrder(req,res) {

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    let expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    let response = {"signatureIsValid":"false"}

    if(expectedSignature === req.body.response.razorpay_signature) {
        response={"signatureIsValid":"true"}
        res.send(response);
    }
}


function createOrder(req, res) {
    let instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

    let options = {
        amount: 99900,  // amount in the smallest currency unit
        currency: "INR",
    };

    instance.orders.create(options, function(err, order) {
        if(err) {
            console.log(err);
            res.send({
                err
            })
        } else {
            res.send({
                order
            })
        }
    });
}

module.exports = paymentRouter;