require('dotenv').config();
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

const Consumer = require('../models/consumerModel');
const Retailer = require('../models/retailerModel');
const jwt = require('jsonwebtoken');

authRouter
    .route('/signupu')
    .post(postSignUpu);

authRouter
    .route('/signupr')
    .post(postSignUpr);

authRouter
    .route('/loginu')
    .post(postLoginu);

authRouter
    .route('/loginr')
    .post(postLoginr);

authRouter
    .route('/extractToken')
    .post(getUserData);


function postSignUpu(req, res) {
    const {fName, lName, password, email, phone, altPhone, city, address, state, pin, gender} = req.body;
    Consumer.findOne({email: email})
        .then(async (userObj) => {

            if(userObj == null) {
                // User not found in DB

                //Hashing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);


                Consumer.create({
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
                        console.log(user)
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

function postSignUpr(req, res) {
    const {fName, lName, password, email, phone, altPhone, city, address, state, pin, gender} = req.body;
    Retailer.findOne({email: email})
        .then(async (userObj) => {

            if(userObj == null) {
                // User not found in DB

                //Hashing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);


                Retailer.create({
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
                        console.log(user)
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

function postLoginu(req, res) {
    const {useremail, password} = req.body;
    Consumer.findOne({email: useremail})
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
                        userid: userObj._id
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

function postLoginr(req, res) {
    const {useremail, password} = req.body;
    Retailer.findOne({email: useremail})
        .then(async (userObj) => {
            if(userObj == null) {
                res.send({
                    message: "User is not found!!! Please signup first"
                })
            } else {
                let isMatch = await bcrypt.compare(password, userObj.password);
                if(isMatch) {
                    // Login Successful
                    // Creating a jwt
                    const payload = {
                        userid: userObj._id
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
    const {token, retailer} = req.body;
    const user = jwt.verify(token, process.env.SECRET_KEY);

    const userid = user.userid;

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