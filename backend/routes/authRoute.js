require('dotenv').config();
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

const Consumer = require('../models/consumerModel');
const Retailer = require('../models/retailerModel');
const jwt = require('jsonwebtoken');

authRouter
    .route('/signupu')
    .post(postSignUp);

authRouter
    .route('/signupr')
    .post(postSignUp);

authRouter
    .route('/loginu')
    .post(postLogin);

authRouter
    .route('/loginr')
    .post(postLogin);

authRouter
    .route('/extractToken')
    .post(getUserData);

function postSignUp(req, res) {
    const {fName, lName, password, email, phone, altPhone, city, address, state, pin, gender, retailer} = req.body;
    let model;
    if(retailer) {
        model = Retailer;
    } else {
        model = Consumer;
    }
    model.findOne({email: email})
        .then(async (userObj) => {

            if(userObj == null) {
                // User not found in DB

                //Hashing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);


                model.create({
                    username: fName + " " + lName,
                    password: hashedPassword,
                    email: email,
                    phone: phone,
                    altPhone: altPhone,
                    city: city,
                    address: address,
                    state: state,
                    pin: pin,
                    gender: gender
                })
                    .then((user) => {
                        res.send(user);
                    })
                    .catch((error) => {
                        res.json(error);
                    });
            } else {
                // User found in DB
                res.send({
                    errorMsg: "User already present"
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.send(null);
        })
}

function postLogin(req, res) {
    const {useremail, password, retailer} = req.body;
    let model;
    if(retailer) {
        model = Retailer;
    } else {
        model = Consumer;
    }
    model.findOne({email: useremail})
        .then(async (userObj) => {
            if(userObj == null) {
                res.send({
                    message: "User is not found!!! Please signup first"
                })
            } else {
                let isMatch = await bcrypt.compare(password, userObj.password);
                if(isMatch) {
                    // Login Successfull

                    // Creating a jwt
                    const payload = {
                        userid: userObj._id,
                        retailer: retailer
                    };

                    const secretKey = process.env.SECRET_KEY;

                    let token = jwt.sign(payload, secretKey, {
                        expiresIn: '60m'
                    });

                    res.send({
                        userObj: userObj,
                        token: token,
                    });
                } else {
                    res.send({
                        message: "Invalid credentials"
                    });
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function getUserData(req, res) {
    const {token} = req.body;
    const user = jwt.verify(token, process.env.SECRET_KEY);

    const userid = user.userid;
    const retailer = user.retailer;
    if(retailer) {
        Retailer.findById(userid)
            .then((userData) => {
                res.send(userData)
            })
            .catch((error) => {
                res.send({
                    errorMsg: error
                })
            });
    } else {
        Consumer.findById(userid)
            .then((userData) => {
                res.send(userData)
            })
            .catch((error) => {
                res.send({
                    errorMsg: error
                })
            });
    }
}

module.exports = authRouter;