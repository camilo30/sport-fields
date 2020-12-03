const Schedule= require('../models/schedule');
const mongoose = require('mongoose');
const Field = mongoose.model('Field');
const scheduleController = {};

// OBTENER TODOS LOS HORARIOS
scheduleController.getSchedules = async (req, res) =>{
    const schedules = await Schedule.find().populate('field');
    res.json(schedules);
}

// OBTENER UN SOLO HORARIO
scheduleController.getSchedule = async (req, res) => {
    const schedule = await Schedule.findById(req.params.id).populate('field');
    res.json(schedule);
}

// OBTENER HORARIOS RESERVADOS DE UN ESCENARIO
scheduleController.getFieldSchedules = async (req, res) => {
    const schedule = await Schedule.find({field: req.params.fieldId}).populate('field');
    res.status(200).send(schedule);
}

// OBTENER TODOS LOS HORARIOS DE UN ESCENARIO
scheduleController.getFieldFreeSchedules = async (req, res) => {
    const schedule = await Schedule.find({field: req.params.fieldId}).populate('field');
    res.status(200).send(schedule);
}

// OBTENER HORARIOS LIBRES DE UN ESCENARIO EN UNA FECHA DETERMINADA
scheduleController.getDayFieldSchedules = async (req, res) => {
    const d = new Date(req.params.date);
    const a = new Date(req.params.date);
    const next = new Date( a.setDate(a.getDate()+1));

    const f = await Schedule.find({field: req.params.fieldId ,start: {$gte: d, $lte: a }, available: true}).populate('field').sort('start');
    res.json(f);
}




scheduleController.getBookedSchedules = async (req, res) => {
    const schedule = await Schedule.find({available:false}).populate('field');
    res.status(200).send(schedule);
}
 // GENERAR HORARIOS
scheduleController.createSchedule = async (req, res) => {
    const {field, start, end} = req.body;

    const newSchedule = new Schedule ({start, end, available: 'true'});
    const foundField = await Field.find({name: field});

    if(foundField.length > 0){

        newSchedule.field = foundField.map(field => field._id);

        const foundSchedule = await Schedule.find({field: newSchedule.field, start: newSchedule.start});

        if (foundSchedule.length > 0){
            res.status(500).send('Ya existía, no se creó');
        }else{
            await newSchedule.save();
            res.status(200).send('Horario agregado');
        }
    }else{
        res.status(500).send('No existe el escenario');
    }
}

scheduleController.editSchedule = async (req, res) => {
    const { id } = req.params;
    const newSchedule = {
        start: req.body.start,
        end: req.body.end,
        availability: req.body.availability
    }
    await Schedule.findByIdAndUpdate(id, {$set: newSchedule});
    res.status(200).send('Horario actualizado');
}

scheduleController.deleteSchedule = async (req, res) => {
    await Schedule.findByIdAndRemove(req.params.id);
    res.status(200).send('Horario eliminado');
}



module.exports = scheduleController;



