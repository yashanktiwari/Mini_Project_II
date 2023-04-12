const mongoose = require('mongoose');

module.exports.connection = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("DB connected");
        })
        .catch((error) => {
            console.log(error);
        })
};