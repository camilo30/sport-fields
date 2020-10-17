const Schedule= require('../models/schedule');
const mongoose = require('mongoose');
const Field = mongoose.model('Field');
const scheduleController = {};

scheduleController.getSchedules = async (req, res) =>{
    const schedules = await Schedule.find();
    res.json(schedules);
}

scheduleController.getSchedule = async (req, res) => {
    const schedule = await Schedule.findById(req.params.id);
    res.json(schedule);
}

scheduleController.getFieldSchedules = async (req, res) => {
    const schedule = await Schedule.find({field: req.params.fieldId, available:false})
    res.status(200).send(schedule);
}

scheduleController.getBookedSchedules = async (req, res) => {
    const schedule = await Schedule.find({available:false})
    res.status(200).send(schedule);
}

scheduleController.createSchedule = async (req, res) => {
    const {field, start, end, available} = req.body;
    const newSchedule = new Schedule ({start, end, available});

    if(field){
        const foundField = await Field.find({name: field});
        newSchedule.field = foundField.map(field => field._id);
    }

    const savedSchedule = await newSchedule.save();

    res.status(200).send('Horario agregado');
}

scheduleController.createSchedules = async (req, res) =>{
    const {field, start, end} = req.body;


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



