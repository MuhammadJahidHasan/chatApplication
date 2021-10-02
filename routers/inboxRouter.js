const express = require('express');
const {
    getInbox,
    searchUser,
    addConversation,
    getMessages,
    sendMessage,
} = require('../controllers/inboxController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');
const { checkLogin } = require('../middleware/common/verifyUserLogin');
const attachmentUpload = require('../middleware/inbox/attachmentUpload');

const router = express.Router();

router.get('/', decorateHtmlRes('Inbox'), checkLogin, getInbox);

router.post('/search', checkLogin, searchUser);

router.post('/conversation', checkLogin, addConversation);

router.get('/messages/:conversation_id', checkLogin, getMessages);

router.post('/message', checkLogin, attachmentUpload, sendMessage);

module.exports = router;
