const User = require('../models/user-model');

exports.signupUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = await user.generateToken();
        await user.save();
        user.hideResponse();
        res.status(200).json({
            status: "SUCCESS",
            data: { user, token }
        });
    } catch (err) {
        res.status(500).json({
            status: "FAILURE",
            error: err.message
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new Error('No user found with this Email');
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            throw new Error('Email or password incorrect');
        }

        const token = await user.generateToken();
        await user.save();
        user.hideResponse();
        res.status(200).json({
            status: "SUCCESS",
            data: { user, token }
        });
    } catch (err) {
        res.status(500).json({
            status: "FAILURE",
            error: err.message
        });
    }
}

exports.logoutUser = async (req, res) => {

}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length < 1) {
            return res.status(404).json({
                status: "FAILURE",
                error: "No users available"
            });
        }
        res.status(200).json({
            status: "SUCCESS",
            data: { users }
        });
    } catch (err) {
        res.status(500).json({
            status: "FAILURE",
            error: err.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                status: "FAILURE",
                error: "No user found"
            });
        }

        res.status(200).json({
            status: "SUCCESS",
            data: { user }
        })
    } catch (err) {
        res.status(500).json({
            status: "FAILURE",
            error: err.message
        });
    }
}