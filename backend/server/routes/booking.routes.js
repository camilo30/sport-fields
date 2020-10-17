const express = require('express');
const router = express.Router();

const booking = require('../controllers/booking.controller');

//Rutas reservas
router.get('/', booking.getBookings);
router.get('/user/:userId', booking.getUserBookings);
router.get('/field/:fieldId', booking.getFieldBookings);
router.post('/', booking.createBooking);
router.get('/cancel/:id', booking.cancelBooking);
//router.get('/:id', booking.getBooking);
router.put('/:id', booking.editBooking);

module.exports = router;
