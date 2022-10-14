const express = require('express');
const router = express.Router({ mergeParams: true });
const { renderProfilePage } = require('../controllers/profile');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router
    .route('/')
    .get(isAuthenticated, renderProfilePage)
// .post(postLoginForm)

module.exports = router;