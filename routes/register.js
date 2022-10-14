const express = require('express');
const router = express.Router({ mergeParams: true });
const { renderRegisterPage, postRegisterForm } = require('../controllers/register');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router
    .route('/')
    .get(renderRegisterPage)
    .post(postRegisterForm)

module.exports = router;