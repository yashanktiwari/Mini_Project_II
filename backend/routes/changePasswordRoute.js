const express = require('express');
const changePasswordRouter = express.Router();
const bcrypt = require('bcrypt');

const Consumer = require('../models/consumerModel');
const Retailer = require('../models/retailerModel');

changePasswordRouter
    .route('/changepasswordu')
    .post(changePassword);

changePasswordRouter
    .route('/changepasswordr')
    .post(changePassword);

function changePassword(req, res) {
    const {email, newpassword, retailer} = req.body;
    let model = retailer ? Retailer : Consumer;

    model.findOne({email: email})
        .then(async (userObj) => {
            if (userObj == null) {
                res.send({
                    error: "User not found"
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newpassword, salt);

                model.updateOne({email: email}, {$set: {password: hashedPassword}})
                    .then(() => {
                        res.send({
                            success: "Updated Password Successfully"
                        });
                    })
                    .catch((error) => {
                        res.send({
                            error: "Some error occurred"
                        });
                    });
            }
        })
}

module.exports = changePasswordRouter;