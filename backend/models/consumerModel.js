const mongoose = require('mongoose');
const otpGenerator = require("otp-generator");

const consumerSchema = new mongoose.Schema({
    profile_image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    public_id: {
        type: String,
        default: ""
    },
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
    wishlist: [
        {
            propertyId: String,
            propertyImage: String,
            propertyTitle: String,
            propertyPrice: String,
            propertyAddress: String,
        }
    ],
    otp: {
        type: String
    }
});

consumerSchema.methods.generateOTP = () => {
    let gotp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    return gotp;
}

const Consumer = new mongoose.model('Consumer', consumerSchema);

module.exports = Consumer;