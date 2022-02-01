// dependency
const mongoose = require('mongoose');

// schema
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: Number,
        required: true,
    },
    confirmPassword: {
        type: Number,
        required: true,
    },
});

// create a colleation
const Register = mongoose.model('Register', schema);

module.exports = Register;
