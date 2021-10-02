const bcrypt = require('bcrypt');
const { unlink } = require('fs');
const path = require('path');
const User = require('../models/people');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.render('users', {
            users,
        });
    } catch (err) {
        next(err);
    }
};

const addUser = async (req, res) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
    }

    try {
        const result = await newUser.save();
        res.status(200).json({
            message: 'User is added successfully',
        });
    } catch (err) {
        console.log('sdfn');
        res.status(500).json({
            error: {
                common: {
                    msg: 'Internal server error',
                },
            },
        });
    }
};

const removeUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        if (user.avatar) {
            unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        res.status(200).json({
            msg: 'User is remove successfully',
        });
    } catch (err) {
        res.status(500).json({
            error: {
                common: {
                    msg: 'Internal server error for deleting user',
                },
            },
        });
    }
};

module.exports = {
    getUsers,
    addUser,
    removeUser,
};
