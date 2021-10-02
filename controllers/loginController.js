const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../models/people');

const getLogin = (req, res) => {
    res.render('index');
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.mobile }],
        });
        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                const userObj = {
                    userid: user._id,
                    username: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    avatar: user.avatar || null,
                    role: user.role || 'user',
                };
                const token = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXP,
                });

                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXP,
                    httpOnly: true,
                    signed: true,
                });
                res.locals.loggedInUser = userObj;
                res.redirect('/inbox');
            } else {
                throw createHttpError('Login failed!');
            }
        } else {
            throw createHttpError('Login failed!');
        }
    } catch (err) {
        res.render('index', {
            data: {
                username: req.body.username,
            },
            error: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};

const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('Logut user');
};

module.exports = {
    getLogin,
    login,
    logout,
};
