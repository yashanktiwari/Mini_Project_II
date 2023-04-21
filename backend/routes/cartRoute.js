const express = require('express');
const cartRouter = express.Router();

const Retailer = require('../models/retailerModel');
const Consumer = require('../models/consumerModel');
const Property = require('../models/retailerModel');

cartRouter
    .route('/addtocart')
    .post(addToCart);

cartRouter
    .route('/removefromcart')
    .post(removeFromCart);

async function addToCart(req, res) {
    const {userid, propertyId, propertyImage, propertyTitle, propertyPrice, propertyAddress, retailer} = req.body;
    let model = retailer ? Retailer : Consumer;

    const User = await model.findById(userid);

    if(User) {
        const cartObj = {
            propertyId,
            propertyImage,
            propertyTitle,
            propertyPrice,
            propertyAddress};
        User.wishlist.push(cartObj);
        await User.save();
        res.send({
            User
        });
    } else {
        console.log("User not found");
        res.send({
            errorMsg: "User not found"
        })
    }
}

async function removeFromCart(req, res) {
    const {userid, propertyId, retailer} = req.body;
    const model = retailer ? Retailer : Consumer;

    let User = await model.findById(userid);

    let idx;
    if(User) {
        User.wishlist.map((item, index) => {
            if(item.propertyId === propertyId) {
                idx = index;
            }
        })
        User.wishlist.splice(idx, 1);
        await User.save();
        res.send({
            User
        });
    } else {
        console.log("User not found");
        res.send({
            errorMsg: "User not found"
        });
    }
}

module.exports = cartRouter;