const express = require('express');
const { getUsers, addUser, removeUser } = require('../controllers/usersController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');
const avatarUpload = require('../middleware/users/avatarUpload');
const {
    addUserValidators,
    addUserValidationHandler,
} = require('../middleware/users/usersValidator');

const { checkLogin, requireRole } = require('../middleware/common/verifyUserLogin');

const router = express.Router();

router.get('/', decorateHtmlRes('Users'), checkLogin, requireRole(['admin']), getUsers);

router.post(
    '/',
    checkLogin,
    requireRole(['admin']),
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser,
);

router.delete('/:id', requireRole(['admin']), removeUser);

module.exports = router;
