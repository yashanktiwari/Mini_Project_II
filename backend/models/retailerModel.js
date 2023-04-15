const mongoose = require('mongoose');
const otpGenerator = require("otp-generator");

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
    },
    acNumber: {
        type: String,
    },
    acHolderName: {
        type: String,
    },
    ifsCode: {
        type: String
    },
    otp: {
        type: String
    }
});

retailerSchema.methods.generateOTP = () => {
    let gotp = otpGenerator.generate(4, {digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
    this.otp = gotp;
    return gotp;
}

const Retailer = new mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;