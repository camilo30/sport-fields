const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const BkgStatus = mongoose.model('BkgStatus');
const BkgType = mongoose.model('BkgType');
const Booking = mongoose.model('Booking');
const Field = mongoose.model('Field');
const Schedule = mongoose.model('Schedule');
const User = mongoose.model('User');

const reportsController = {};

// GENERAR REPORTES - TODAS LAS RESERVAS POR ESTADO
reportsController.getByStatus = async (req, res) => {
    var obArray = new Array();
    const startD = new Date(req.params.start);
    const endD = new Date(req.params.end);

    const a = await Schedule.aggregate([
        { $match: { 'start': {$gt: startD, $lt: endD}} },
    ]) .exec(function(err, schedules){

      for(let i = 0; i< schedules.length; i++){
            obArray.push(new ObjectId(schedules[i]._id));
        }

        Booking.aggregate([
            { $project: {sch: {$arrayElemAt:['$schedule',0]}, bkgStatus:1, count: {$sum:1}}},
            { $match: { sch: {$in: obArray}}},
            { $group: { _id: '$bkgStatus', count: {$sum:1}}},
            { $sort: {'count':-1}}
        ]).exec(function (err, bookings){
            BkgStatus.populate(bookings, {path: "_id"}, function (err, populated){
                res.json(populated);
            });


        });
    });
}

// GENERAR REPORTES - RESERVAS APROBADAS POR USUARIO
reportsController.getByUser = async (req, res) => {
    var obArray = new Array();
    const startD = new Date(req.params.start);
    const endD = new Date(req.params.end);
    const bk = await BkgStatus.find({code:'A'});
    const id = bk.map(status => status._id);

    const a = await Schedule.aggregate([
        { $match: { 'start': {$gt: startD, $lt: endD}} },
    ]) .exec(function(err, schedules){

        for(let i = 0; i< schedules.length; i++){
            obArray.push(new ObjectId(schedules[i]._id));
        }

        Booking.aggregate([
            { $project: {sch: {$arrayElemAt:['$schedule',0]}, bkgStatus:1, bkgType:1, user:1, count: {$sum:1}}},
            { $match: { sch: {$in: obArray}, bkgStatus: {$in: id}}},
            { $group: { _id: '$user', count: {$sum:1}}},
            { $sort: {'count':-1}}
        ]).exec(function (err, bookings){
            User.populate(bookings, {path: "_id"}, function (err, populated){
                res.json(populated);
                console.log(bookings)
            });


        });
    });
}

// GENERAR REPORTES - RESERVAS APROBADAS POR TIPO
reportsController.getByType = async (req, res) => {
    var obArray = new Array();
    const startD = new Date(req.params.start);
    const endD = new Date(req.params.end);
    const bk = await BkgStatus.find({code:'A'});
    const id = bk.map(status => status._id);

    const a = await Schedule.aggregate([
        { $match: { 'start': {$gt: startD, $lt: endD}} },
    ]) .exec(function(err, schedules){

        for(let i = 0; i< schedules.length; i++){
            obArray.push(new ObjectId(schedules[i]._id));
        }

        Booking.aggregate([
            { $project: {sch: {$arrayElemAt:['$schedule',0]}, bkgStatus:1, bkgType:1, count: {$sum:1}}},
            { $match: { sch: {$in: obArray}, bkgStatus: {$in: id}}},
            { $group: { _id: '$bkgType', count: {$sum:1}}},
            { $sort: {'count':-1}}
        ]).exec(function (err, bookings){
            BkgType.populate(bookings, {path: "_id"}, function (err, populated){
                res.json(populated);
                console.log(bookings)
            });


        });
    });
}

// GENERAR REPORTES - RESERVAS APROBADAS POR ESCENARIO
reportsController.getBookingsByField = async (req, res) => {
    var obArray = new Array();
    const startD = new Date(req.params.start);
    const endD = new Date(req.params.end);
    const bk = await BkgStatus.find({code:'A'});
    const id = bk.map(status => status._id);

    const a = await Booking.aggregate([
        { $match: { 'bkgStatus': {$in: id }}},
        {$group: {_id: {$arrayElemAt:['$schedule',0]} }}
    ]).exec(function(err, bookings){

        for(let i = 0; i< bookings.length; i++){
            obArray.push(new ObjectId(bookings[i]._id));
        }

        Schedule.aggregate([
            { $match: { '_id': { $in: obArray }, 'start': {$gt: startD, $lt: endD} } },
            { $group: { _id: '$field', count:{$sum:1} } },
            { $sort: {'count':-1}}
        ]).exec(function (err, schedules){
            Field.populate(schedules, {path: "_id"}, function (err, populated){
                res.json(populated);
            });
            //console.log(obArray);

        });
    });

}

// GENERAR REPORTES - HORAS DE USO
reportsController.getHoursByField = async (req, res) => {
    var obArray = new Array();
    const startD = new Date(req.params.start);
    const endD = new Date(req.params.end);
    const bk = await BkgStatus.find({code:'A'});
    const id = bk.map(status => status._id);

    const a = await Booking.aggregate([
        { $match: { 'bkgStatus': {$in: id }}},
        { $unwind: '$schedule'},
        {$group: {_id: '$schedule' }}
    ]).exec(function(err, bookings){

        for(let i = 0; i< bookings.length; i++){
            obArray.push(new ObjectId(bookings[i]._id));
        }

        Schedule.aggregate([
            { $match: { '_id': { $in: obArray }, 'start': {$gt: startD, $lt: endD} } },
            { $group: { _id: '$field', count:{$sum:1} } },
            { $sort : {'count': -1}}
        ]).exec(function (err, schedules){
            Field.populate(schedules, {path: "_id"}, function (err, populated){
                res.json(populated);
            });
        });
    });
}

module.exports = reportsController;