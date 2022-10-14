const express = require('express');
const router = express.Router({ mergeParams: true });
const { renderProfilePage, editProfile, postEditForm } = require('../controllers/profile');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router
    .route('/')
    .get(isAuthenticated, renderProfilePage)
// .post(postLoginForm)
router
    .route('/edit')
    .get(isAuthenticated, editProfile)
    .put(isAuthenticated, postEditForm)

module.exports = router;