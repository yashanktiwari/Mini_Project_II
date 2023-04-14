const mongoose = require('mongoose');
const otpGenerator = require("otp-generator");

const consumerSchema = new mongoose.Schema({
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
        default: "consumer"
    },
    otp: {
        type: String
    }
});

consumerSchema.methods.generateOTP = () => {
    let gotp = otpGenerator.generate(4, {digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
    return gotp;
}

const Consumer = new mongoose.model('Consumer', consumerSchema);

module.exports = Consumer;