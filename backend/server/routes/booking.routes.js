const express = require('express');
const router = express.Router();
const multer = require('../libs/multerFile');

const booking = require('../controllers/booking.controller');

//Rutas reservas
router.get('/', booking.getBookings);
router.get('/calendar', booking.getCalendarBookings);
router.get('/active', booking.getActiveBookings);
router.get('/history', booking.getHistoryBookings);
router.get('/user/:userId', booking.getUserBookings);
router.get('/user/active/:userId', booking.getUserActiveBookings);
router.get('/user/history/:userId', booking.getUserHistoryBookings);
router.get('/field/:fieldId', booking.getFieldBookings);
router.get('/field/calendar/:fieldId', booking.getFieldCalendarBookings);
router.get('/field/active/:fieldId', booking.getFieldActiveBookings);
router.get('/field/history/:fieldId', booking.getFieldHistoryBookings);
router.post('/',multer.any(), booking.createBooking);
router.get('/cancel/:id', booking.cancelBooking);
router.get('/approve/:id', booking.approveBooking);
router.get('/reject/:id/:comm', booking.rejectBooking);
//router.get('/:id', booking.getBooking);
router.put('/:id', booking.editBooking);

module.exports = router;
