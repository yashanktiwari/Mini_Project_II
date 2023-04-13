const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    altPhone: {
        type: String
    },
    role: {
        type: String,
        default: "retailer"
    }
});

const Retailer = new mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;