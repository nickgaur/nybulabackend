const express = require('express');
const router = express.Router({ mergeParams: true });
const { renderLoginPage, postLoginForm } = require('../controllers/login');

router
    .route('/')
    .get(renderLoginPage)
    .post(postLoginForm)

module.exports = router;