const Booking = require('../models/booking');
const mongoose = require('mongoose');
const BkgType = mongoose.model('BkgType');
const BkgStatus = mongoose.model('BkgStatus');
const User = mongoose.model('User');
const Field = mongoose.model('Field');
const Schedule = mongoose.model('Schedule');
const Attachment = mongoose.model('Attachment');
const AtchType = mongoose.model('AtchType');
const bookingController = {};

// Ontener una sola reserva
bookingController.getBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('bkgType').populate('bkgStatus').populate('user').populate('schedule').populate('attachhment');
    res.status(200).send(booking);
}

//Obtener todas las reservas
bookingController.getBookings = async (req, res) => {
    const status = await BkgStatus.find({code: {$ne: 'C'}});
    const booking = await Booking.find().lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas a mostrar en el Calendario (Solicitadas y Aprobadas)
bookingController.getCalendarBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});

    const booking = await Booking.find({bkgStatus: {$in: status}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas activas
bookingController.getActiveBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});
    const date = new Date();
    const sch = await Schedule.find({start: {$gt: date}, available:false}).sort('start');



    const booking = await Booking.find({bkgStatus: {$in: status}, schedule:{$in: sch}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas activas entre dos fechas
bookingController.getDateActiveBookings = async (req,res) => {
    const status = await BkgStatus.find({code: 'A'});
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
    const sch = await Schedule.find({start: {$gt: startDate, $lt: endDate}, available:false}).sort('start');

    const booking = await Booking.find({bkgStatus: {$in: status}, schedule:{$in: sch}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.json(booking);
}

//Obtener histórico de todas las reservas
bookingController.getHistoryBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});
    const status2 = await BkgStatus.find({code: {$in: ['R','C']}});
    const date = new Date();
    const sch = await Schedule.find({end: {$lt: date}, available:false});

    const booking = await Booking.find({$or: [
            { $and: [{bkgStatus: {$in: status}}, {schedule: {$in: sch}}] },
            {bkgStatus: {$in: status2}}
        ]}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas de un usuario
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

//Obtener todas las reservas activas de un usuario
bookingController.getUserActiveBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});
    const date = new Date();
    const sch = await Schedule.find({start: {$gt: date}, available:false});

    const booking = await Booking.find({user: req.params.userId, bkgStatus: {$in: status}, schedule:{$in: sch}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
    //const booking = await Booking.find({user: req.params.userId},{bkgStatus: {$in: status}, schedule:{$in: sch}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    console.log('booking', booking)
    res.status(200).send(booking);
}

//Obtener historico de reservas de un usuario
bookingController.getUserHistoryBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});
    const status2 = await BkgStatus.find({code: {$in: ['R','C']}});
    const date = new Date();
    const sch = await Schedule.find({end: {$lt: date}, available:false});

    const booking = await Booking.find({$or: [
            { $and: [{user: req.params.userId,}, {bkgStatus: {$in: status}}, {schedule: {$in: sch}}] },
            { $and: [{user: req.params.userId}, {bkgStatus: {$in: status2}}] }
        ]}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas de un escenario
bookingController.getFieldBookings = async (req, res) => {
    // Buscar Horarios pertenecientes al escenario
    const foundSchedule = await Schedule.find({field: req.params.fieldId});
    // Buscar reservas que contengan los horarios encontrados
    const booking = await Booking.find({schedule: {$in: foundSchedule}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas a mostrar en calendario de un escenario
bookingController.getFieldCalendarBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});
    const sch = await Schedule.find({field: req.params.fieldId, available:false});

    const booking = await Booking.find({bkgStatus: {$in: status}, schedule:{$in: sch}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas activas de un escenario
bookingController.getFieldActiveBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});
    const date = new Date();
    const sch = await Schedule.find({field: req.params.fieldId,start: {$gt: date}, available:false});

    const booking = await Booking.find({bkgStatus: {$in: status}, schedule:{$in: sch}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

//Obtener todas las reservas activas de un escenario entre dos fechas
bookingController.getDateFieldActiveBookings = async (req,res) => {
    const status = await BkgStatus.find({code: 'A'});
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
    const sch = await Schedule.find({field: req.params.fieldId,start: {$gt: startDate, $lt: endDate}, available:false});

    const booking = await Booking.find({bkgStatus: {$in: status}, schedule:{$in: sch}}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.json(booking);
}

//Obtener historico de reservas de un escenario
bookingController.getFieldHistoryBookings = async (req,res) => {
    const status = await BkgStatus.find({code: {$in: ['S','A']}});
    const status2 = await BkgStatus.find({code: {$in: ['R','C']}});
    const date = new Date();
    const sch = await Schedule.find({field: req.params.fieldId, end: {$lt: date}, available:false});

    const booking = await Booking.find({$or: [
            { $and: [ {bkgStatus: {$in: status}}, {schedule: {$in: sch}}] },
            {bkgStatus: {$in: status2}}
        ]}).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
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
    res.status(200).send(booking);
}

// Crear reservas
bookingController.createBooking = async (req, res) => {

    const { bkgType, user, desc, schedule } = req.body;
    let frequest;
    let fattendant;
    if (req.files[0]) {
        frequest = req.files[0];
    }
    if (req.files[1]){
        fattendant = req.files[1];
    }

    let consecutives = true;

    if (schedule){
        const auxS = schedule.split(',')
        const schedules = await Schedule.find({_id: {$in: auxS}}).sort('start');




        if (schedules.length > 1){
            for (var i = 0; i < schedules.length; i++){
                if (schedules[i+1]){
                    const sch1 = await Schedule.findById(schedules[i]);
                    const sch2 = await Schedule.findById(schedules[i+1]);
                    if (sch1.end.toString() !== sch2.start.toString()){
                        consecutives = false;
                    }
                }
            }
        }


        if (consecutives){
            var bkgStatus = 'Solicitada';


            const newBooking = new Booking({schedule: schedules});

            if (bkgType) {
                const foundBT = await BkgType.find({code: bkgType});
                newBooking.bkgType = foundBT.map(bkgType => bkgType._id);

                if (bkgType === 'E'){
                    newBooking.desc = 'Escuela Deportiva';
                }
                if (bkgType === 'U'){
                    newBooking.desc = 'Uso Institucional';
                }
            }

            if (user) {
                const foundUser = await User.find({email: user}).populate('role');
                newBooking.user = foundUser.map(user => user._id);

                const ut = foundUser.map(ut => ut.role.name);

                if (ut[0] === 'user'){
                    let newSAt;
                    let newAAt;
                    if (frequest) {
                        const at = await AtchType.find({code:'S'})
                        newSAt = new Attachment({
                            path: frequest.path,
                            desc: 'Solicitud'
                        })
                        newSAt.atchType = at.map(id => id._id)
                        const savedSAt = await newSAt.save();
                    } else {
                        return res.json('Por favor adjuntar Solicitud de préstamo')
                    }

                    if (fattendant){
                        const at = await AtchType.find({code:'A'})
                        newAAt = new Attachment({
                            path: fattendant.path,
                            desc: 'Asistentes'
                        })
                        newAAt.atchType = at.map(id => id._id)
                        const savedAAt = await newAAt.save();
                    }else {
                        return res.json('Por favor adjuntar Listado de asistentes')
                    }

                    console.log(newSAt, newAAt)
                    newBooking.attachment = [newSAt._id, newAAt._id];
                }
                if (ut[0] === 'instructor'){
                    bkgStatus = 'Aprobada';
                }

                if (ut[0] === 'director'){
                    bkgStatus = 'Aprobada';
                }
            }

            if (bkgStatus) {
                const foundBS = await BkgStatus.find({name: bkgStatus});
                newBooking.bkgStatus = foundBS.map(bkgStatus => bkgStatus._id);
            }

            // La disponibilidad de horarios pasa a falso
            for (let s of schedules){
              await Schedule.findByIdAndUpdate(s, {$set: {available: false}});
            }

            // Se buscan reservas
            const status = await BkgStatus.find({code: {$in: ['A','S']}})


            const foundBooking = await Booking.find({ bkgStatus: {$in: status} ,user: newBooking.user, schedule: {$in: schedules}}).populate('bkgStatus');
            if(foundBooking.length > 0){
               return res.json('Reserva existente, no se crea');
            }else {
                await newBooking.save();
                console.log(newBooking)
                return res.json('Reserva solicitada');
            }
        } else {
            return res.json('Los Horarios deben ser consecutivos');
        }

    } else {
        res.json('No se ha seleccionado horario')
    }


}

// Editar Reservas
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

// Eliminar reservas
bookingController.deleteBooking = async (req, res) => {
    const booking = await Booking.findByIdAndRemove(req.params.id);
    res.status(200).send('Reserva eliminada');
}

// Usuario - Cancelar Reserva
bookingController.cancelBooking = async (req,res) => {
    const {id} = req.params;
    const foundStatus = await BkgStatus.find({code: 'C'});
    const newStatus = foundStatus.map(id => id._id);

    //Se pasa el estado de la reserva a cancelada
    const newBooking = await Booking.findByIdAndUpdate(id, {bkgStatus: newStatus});

    // El horario pasa a estar disponible
    const schedules = newBooking.schedule;
    for (let s of schedules){
        await Schedule.findByIdAndUpdate(s, {$set: {available: true}});
    }

    res.json('Cancelada satisfactoriamente');
}

// Director - Rechazar Reserva
bookingController.rejectBooking = async (req,res) => {
    const { id, comm } = req.params;
    const foundStatus = await BkgStatus.find({code: 'R'});
    const newStatus = foundStatus.map(id => id._id);

    //Se pasa el estado de la reserva a rechazada
    const newBooking = await Booking.findByIdAndUpdate(id, {bkgStatus: newStatus, comment: comm});

    // El horario pasa a estar disponible
    const schedules = newBooking.schedule;
    for (let s of schedules){
        await Schedule.findByIdAndUpdate(s, {$set: {available: true}});
    }

    res.json('Rechazada satisfactoriamente');
}

// Director - Aprobar reserva
bookingController.approveBooking = async (req, res) => {
    const { id } = req.params;
    const foundStatus = await BkgStatus.find({code: 'A'});
    const newStatus = foundStatus.map(id => id._id);

    //Se pasa el estado de la reserva a Aprobada
    const newBooking = await Booking.findByIdAndUpdate(id, {bkgStatus: newStatus});

    res.json('Aprobada satisfactoriamente');
}

module.exports = bookingController;