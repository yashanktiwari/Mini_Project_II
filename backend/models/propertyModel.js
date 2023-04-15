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
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    property_type: {
        type: String
    },
    price: {
        type: String
    }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;