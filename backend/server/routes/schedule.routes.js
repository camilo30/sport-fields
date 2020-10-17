const express = require('express');
const router = express.Router();


const schedule = require('../controllers/schedule.controller');


//Rutas horarios
router.get('/', schedule.getSchedules);
router.get('/field/:fieldId', schedule.getFieldSchedules);
router.get('/booked', schedule.getBookedSchedules);
router.post('/',schedule.createSchedule);
router.get('/:id',schedule.getSchedule);
router.put('/:id',schedule.editSchedule);
router.delete('/:id',schedule.deleteSchedule);


module.exports = router;