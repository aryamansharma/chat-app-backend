const User = require('../models/user-model');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
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

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: "SUCCESS",
            data: { user }
        });
    } catch (err) {
        res.status(500).json({
            status: "FAILURE",
            error: err.message
        });
    }
}