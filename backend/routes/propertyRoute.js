require('dotenv').config();
const express = require('express');
const propertyRouter = express.Router();

const Property = require('../models/propertyModel');

const cloudinary = require('../utils/cloudinary');

propertyRouter
    .route('/addnewproperty')
    .post(addNewProperty);

propertyRouter
    .route('/getallproperties')
    .get(getAllProperties);

propertyRouter
    .route('/getsingleproperty')
    .post(getSingleProperty);

propertyRouter
    .route('/getcaraouselimages')
    .post(getCaraouselImages);

async function addNewProperty(req, res) {
    const { primary_img, secondary_img, title, description, state, city, address, price, area, propertyType, owner_id } = req.body;
    const unique_id = Date.now();

    let imageBuffer = [];
    let primaryImage = await cloudinary.uploader.upload(primary_img, {
        folder: `Properties/${unique_id}/primary_img`
    });

    for(let i=0; i<secondary_img.length; i++) {
        const result = await cloudinary.uploader.upload(secondary_img[i], {
            folder: `Properties/${unique_id}/secondary_imgs`
        });

        imageBuffer.push(result.url);
    }


    Property.create({
        primary_img: primaryImage.url,
        secondary_img: imageBuffer,
        title,
        description,
        state,
        city,
        address,
        price,
        area,
        property_type: propertyType,
        owner_id,
        unique_id
    })
        .then((property) => {
            res.send({
                success: "Property successfully listed"
            });
        })
        .catch((error) => {
            console.log(error);
            res.send({
                error: "Property not listed"
            });
        });
}

function getAllProperties(req, res) {
    Property.find({})
        .then((properties) => {
            res.send(properties);
        })
        .catch((error) => {
            console.log(error);
            res.send({
                error: "Some error occurred"
            });
        });
}

function getSingleProperty(req, res) {
    const {id} = req.body;
    Property.findById(id)
        .then((property) => {
            res.send({
                property
            });
        })
        .catch((error) => {
            res.send({
                error: error
            });
        });
}

function getCaraouselImages(req, res) {
    const {id} = req.body;
    // console.log(id);
    Property.findById(id)
        .then((property) => {
            res.send({
                property
            });
        })
        .catch((error) => {
            res.send({
                error: error.message
            });
        })
}

module.exports = propertyRouter;