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
    .post(postSignUpu);

authRouter
    .route('/signupr')
    .post(postSignUpr);

authRouter
    .route('/loginu')
    .post(postLogin);

authRouter
    .route('/loginr')
    .post(postLogin);

authRouter
    .route('/extractToken')
    .post(getUserData);

authRouter
    .route('/updateprofile')
    .patch(updateProfile);

function postSignUpu(req, res) {
    const {fName, lName, password, email, phone, altPhone, city, address, state, pin, gender, vid, profile_image} = req.body;


    Consumer.findOne({email: email})
        .then(async (userObj) => {

            if(userObj == null) {
                // User not found in DB

                //Hashing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Checking if the file is an image or not

                if(profile_image.length !== 0) {
                    // Uploading the image on the cloudinary cloud
                    cloudinary.uploader.upload(profile_image, {
                        folder: `Users/${email}/consumer`
                    }).then((resultImage) => {

                        Consumer.create({
                            profile_image: resultImage.secure_url,
                            public_id: resultImage.public_id,
                            username: fName + " " + lName,
                            password: hashedPassword,
                            email: email,
                            phone: phone,
                            altPhone: altPhone,
                            city: city,
                            address: address,
                            state: state,
                            pin: pin,
                            vid: vid,
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
                        vid: vid,
                        gender: gender
                    })
                        .then((user) => {
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

function postSignUpr(req, res) {
    const {fName, lName, password, email, phone, altPhone, city, address, state, pin, gender, vid, profile_image} = req.body;

    Retailer.findOne({email: email})
        .then(async (userObj) => {

            if(userObj == null) {
                // User not found in DB

                //Hashing password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Checking if the file is an image or not

                if(profile_image.length !== 0) {
                    // Uploading the image on the cloudinary cloud
                    cloudinary.uploader.upload(profile_image, {
                        folder: `Users/${email}/retailer`
                    }).then((resultImage) => {

                        Retailer.create({
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
                            vid: vid,
                            gender: gender,
                        })
                            .then((user) => {
                                res.send(user);
                            })
                            .catch((error) => {
                                res.json(error);
                            });
                    });
                } else {
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
                        vid: vid,
                        gender: gender,
                    })
                        .then((user) => {
                            res.send(user);
                        })
                        .catch((error) => {
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
                    error: "User not found!!! Please signup first"
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
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);

        const userid = user.userid;
        const retailer = user.retailer;
        if(retailer) {
            Retailer.findById(userid)
                .then((userData) => {
                    res.send(userData)
                })
                .catch((error) => {
                    console.log(error);
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
                    console.log(error);
                    res.send({
                        error: error
                    })
                });
        }
    } catch(err) {
        res.send({
            error: "You have to login again"
        });
    }

}

async function updateProfile(req, res) {
    const {userid, profile_image, username, email, phone, altPhone, state, city, address, role, upload, public_id, vid} = req.body;
    let model = role==="retailer" ? Retailer : Consumer;

    if(upload) {

        try {
            if(public_id.length !== 0) {
                await cloudinary.uploader.destroy(public_id);
            }


            let result = await cloudinary.uploader.upload(profile_image, {
                folder: `Users/${email}/${role}`
            });

            let user = await model.findById(userid);
            if(user) {
                user.profile_image = result.url;
                user.public_id = result.public_id;
                user.username = username;
                user.email = email;
                user.phone = phone;
                user.altPhone = altPhone;
                user.state = state;
                user.city = city;
                user.vid = vid;
                user.address = address;

                await user.save();
                res.send({
                    user
                });
            } else {
                res.send({
                    message: "User not found"
                })
            }
        } catch(error) {
            console.log(error);
        }

    } else {
        let user = await model.findById(userid);
        if(user) {
            user.profile_image = profile_image;
            user.username = username;
            user.email = email;
            user.phone = phone;
            user.altPhone = altPhone;
            user.state = state;
            user.city = city;
            user.vid = vid;
            user.address = address;

            await user.save();
            res.send({
                user
            });
        } else {
            res.send({
                message: "User not found"
            });
        }
    }

}

module.exports = authRouter;