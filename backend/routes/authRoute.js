require('dotenv').config();
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');

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
    const {fName, lName, password, email, phone, altPhone, city, address, state, pin, gender, profile_image, retailer} = req.body;

    let model = retailer ? Retailer : Consumer;

    model.findOne({email: email})
        .then(async (userObj) => {

            if(userObj == null) {
                // User not found in DB

                //Hashing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Checking if the file is an image or not

                if(profile_image.length != 0) {
                    // Uploading the image on the cloudinary cloud
                    cloudinary.uploader.upload(profile_image, {
                        folder: `Users/${email}`
                    }).then((resultImage) => {

                        model.create({
                            profile_image: resultImage.secure_url,
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
                    });
                } else {
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
                            console.log(user)
                            res.send(user);
                        })
                        .catch((error) => {
                            console.log(error)
                            res.json(error);
                        });
                }
            } else {
                // User found in DB
                res.send({
                    error: "User already present"
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
    let model = retailer ? Retailer : Consumer;

    model.findOne({email: useremail})
        .then(async (userObj) => {
            if(userObj == null) {
                res.send({
                    error: "User is not found!!! Please signup first"
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
                        error: "Invalid credentials"
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
                    error: error
                })
            });
    } else {
        Consumer.findById(userid)
            .then((userData) => {
                res.send(userData)
            })
            .catch((error) => {
                res.send({
                    error: error
                })
            });
    }
}

module.exports = authRouter;