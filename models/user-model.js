const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email ID is requied'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password should be of length 6']
    },
    profilePicture: {
        type: Buffer
    },
    dateOfBirth: {
        type: String,
        validate: {
            validator: function (date) {
                return moment(date, 'DD/MM/YYYY', true).isValid();
            },
            message: 'Please Enter a valid date in DD/MM/YYYY format'
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;