const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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
        minLength: [6, 'Password should be minimum of length 6'],
        select: false,
        trim: true
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Instance methods

userSchema.methods.generateToken = async function () {
    const user = this;

    const jwt = await jsonwebtoken.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    user.tokens.push({ token: jwt });
    return jwt;
}


userSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

userSchema.methods.hideResponse = function () {
    const user = this;

    user.password = undefined;
    user.tokens = undefined;
}

// Document middlewares

// Hashing the user password
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;