const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    primary_img: {
        type: String
    },
    secondary_img: [
        {
            type: String
        }
    ],
    title: {
        type: String
    },
    description: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    price: {
        type: Number
    },
    area: {
        type: Number
    },
    property_type: {
        type: String
    },
    owner_id: {
        type: String
    },
    unique_id: {
        type: String
    },
    amenities: [
        {
            type: Boolean
        }
    ]
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;