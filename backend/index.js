require('dotenv').config();

const express = require('express');
const { connection } = require('./db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');


// Defining the app
const app = express();


// Middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());

// Requiring the routers
const authRouter = require('./routes/authRoute');
const contactusRouter = require('./routes/contactusRoute');
const forgotPasswordRouter = require('./routes/forgotPasswordRoute');
const verifyOTPRouter = require('./routes/verifyOTPRoute');
const changePasswordRouter = require('./routes/changePasswordRoute');

// Middlewares for setting the routers
app.use('/', authRouter);
app.use('/', contactusRouter);
app.use('/', forgotPasswordRouter);
app.use('/', verifyOTPRouter);
app.use('/', changePasswordRouter);

// Getting the port from the environment variables
const PORT = process.env.PORT;

// Starting the server
app.listen(PORT, () => {
    console.log("Server is running");
});

app.get('/', (req, res) => {
    res.send("Hello");
});

// Establishing the connection with the database
connection();