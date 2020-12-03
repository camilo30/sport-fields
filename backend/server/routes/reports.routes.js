const express = require('express');
const router = express.Router();

const reports = require('../controllers/reports.controller');


//Rutas reportes
router.get('/status/:start/:end', reports.getByStatus);
router.get('/type/:start/:end', reports.getByType);
router.get('/user/:start/:end', reports.getByUser);
router.get('/field/:start/:end', reports.getBookingsByField);
router.get('/hField/:start/:end', reports.getHoursByField);

module.exports = router;