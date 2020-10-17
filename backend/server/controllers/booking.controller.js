const Booking = require('../models/booking');
const mongoose = require('mongoose');
const BkgType = mongoose.model('BkgType');
const BkgStatus = mongoose.model('BkgStatus');
const User = mongoose.model('User');
const Field = mongoose.model('Field');
const Schedule = mongoose.model('Schedule');
const Attachment = mongoose.model('Attachment');
const bookingController = {};

bookingController.getBookings = async (req, res) => {
    const booking = await Booking.find().populate('bkgType').populate('bkgStatus').populate('user').populate('schedule').populate('attachhment');
    //const booking = await Booking.find();
    res.status(200).send(booking);
}

bookingController.getBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('bkgType').populate('bkgStatus').populate('user').populate('schedule').populate('attachhment');
    res.status(200).send(booking);
}

bookingController.createBooking = async (req, res) => {
    const { bkgType, user, schedule, attachment } = req.body;
    const bkgStatus = 'Solicitada';
    const newBooking = new Booking();

    if (bkgType) {
        const foundBT = await BkgType.find({desc: bkgType});
        newBooking.bkgType = foundBT.map(bkgType => bkgType._id);
    }

    if (bkgStatus) {
        const foundBS = await BkgStatus.find({name: bkgStatus});
        newBooking.bkgStatus = foundBS.map(bkgStatus => bkgStatus._id);
    }

    if (user) {
        const foundUser = await User.find({email: user});
        newBooking.user = foundUser.map(user => user._id);
    }

    if (schedule) {
        const fieldName = schedule.map(field => field.field)
        const start = schedule.map(start => start.start)
        const foundField = await Field.find({name: fieldName})

        const fieldId= foundField.map(id => id._id)

        const foundSchedule = await Schedule.find({field: fieldId, start: start});
        console.log(foundSchedule)

        const id = foundSchedule.map(id => id._id)
        await Schedule.findByIdAndUpdate(id, {$set: {available: false}});
        newBooking.schedule = foundSchedule.map(schedule => schedule._id);
    }

    if (attachment) {
        const foundAttachment = await Attachment.find({path: {$in: attachment}});
        newBooking.attachment = foundAttachment.map(attachment => attachment._id);
    }

    await newBooking.save();
    res.status(200).send('Reserva creada');
}

bookingController.editBooking = async (req, res) => {
    const { id } = req.params;
    const newBooking = {
        bkgType: req.body.bkgType,
        bkgStatus: req.body.bkgStatus,
        user: req.body.user,
        schedule: req.body.schedule,
       // attachment: req.body.attachment
    }
    await Booking.findByIdAndUpdate(id, {$set: newBooking});
    res.status(200).send('Reserva actalizada');
}


bookingController.deleteBooking = async (req, res) => {
    const booking = await Booking.findByIdAndRemove(req.params.id);
    res.status(200).send('Reserva eliminada');
}

bookingController.getUserBookings = async (req,res) => {
    const booking = await Booking.find({user: req.params.userId}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
        {
            path: 'schedule',
            model: 'Schedule',
            select: 'start end available',
            populate: {
                path: 'field',
                model: 'Field',
            }
        },
    ]);
    //console.log(req.params)
    res.status(200).send(booking);
}

bookingController.getFieldBookings = async (req, res) => {

    const booking = await Booking.find({'schedule.field': req.params.fieldId}).populate('schedule')
    console.log('las bookings',req.params.fieldId, booking);

    res.status(200).send(booking);
}

bookingController.cancelBooking = async (req,res) => {
    const {id} = req.params;
    const foundStatus = await BkgStatus.find({code: 'C'});
    const newStatus = foundStatus.map(id => id._id);

    //Se pasa el estado de la reserva a cancelado
    const newBooking = await Booking.findByIdAndUpdate(id, {bkgStatus: newStatus});

    // El horario pasa a estar disponible
    const schedule = await Schedule.findByIdAndUpdate(newBooking.schedule,{available: true});

    res.status(200).send('Cancelada satisfactoriamente');
}

module.exports = bookingController;