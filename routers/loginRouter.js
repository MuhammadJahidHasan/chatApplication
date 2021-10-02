const express = require('express');
const { getLogin, login, logout } = require('../controllers/loginController');
const {
    doLoginValidators,
    doLoginValidationHandler,
} = require('../middleware/login/loginValidators');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');

const { ridirectSignedIn } = require('../middleware/common/verifyUserLogin');

const router = express.Router();

router.get('/', decorateHtmlRes('Login'), ridirectSignedIn, getLogin);

router.post('/', decorateHtmlRes('Login'), doLoginValidators, doLoginValidationHandler, login);

router.delete('/', logout);

module.exports = router;
