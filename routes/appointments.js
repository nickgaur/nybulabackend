const express = require('express');
const router = express.Router({ mergeParams: true });
const { renderAppointmentForm, postAppointmentForm } = require('../controllers/appointments');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router
    .route('/')
    .get(isAuthenticated, renderAppointmentForm)
    .post( postAppointmentForm)

module.exports = router;