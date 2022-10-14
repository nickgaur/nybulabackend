const express = require('express');
const router = express.Router({ mergeParams: true });
const { renderHomepage } = require('../controllers/home');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router
    .route('/')
    .get(isAuthenticated, renderHomepage)
// .post(postLoginForm)

module.exports = router;