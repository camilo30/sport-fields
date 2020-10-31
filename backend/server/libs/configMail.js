const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');

module.exports = async(req, res) => {

     var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth:{
             user: 'escenariosdeportivosuptc@gmail.com',
             pass: 'escenarios.2020'
         }
     });

    const foundB = await Booking.findById(req.booking).lean().populate('bkgType').populate('bkgStatus').populate('user').populate('attachment').populate([
        {
            path: 'schedule',
            model: 'Schedule',
            select: 'start end available',
            populate: {
                path: 'field',
                model: 'Field',
            }
        },
    ]);;
   const subj = req.subject + " - " + foundB.schedule[0].field.name;
   const start = new Date(foundB.schedule[0].start).toLocaleString()
   const end = new Date(foundB.schedule[(foundB.schedule).length - 1].end).toLocaleString()




    if (req.newStatus === 'R'){

        const motivo = foundB.comment;
        const mailOptions = {
            from: "Préstamo de escenarios deportivos - UPTC Seccional Sogamoso",
            to: foundB.user.email,
            subject: subj,
            html: `
         Estimado/a ${foundB.user.name}:<br/>   
         <strong>${req.message}</strong><br/>
         <strong>Motivo: </strong>${motivo}<br/>
         A continuación encuentra los detalles de su reserva:<br/>
         <strong>Escenario: </strong>${foundB.schedule[0].field.name}<br/>
         <strong>Inicio: </strong>${start}<br/>
         <strong>Fin: </strong>${end}         
            `
        };
        transporter.sendMail(mailOptions, function (err, info){
            if (err){
                console.log(err)}
            else{
                console.log(info)}
        });

    } else {
        if(foundB.user.userType.internal){
            const mailOptions = {
                from: "Préstamo de escenarios deportivos - UPTC Seccional Sogamoso",
                to: foundB.user.email,
                subject: subj,
                html: `
         Estimado/a ${foundB.user.name}:<br/>   
         <strong>${req.message}</strong><br/><br/>
         A continuación encuentra los detalles de su reserva:<br/>
         <strong>Escenario: </strong>${foundB.schedule[0].field.name}<br/>
         <strong>Inicio: </strong>${start}<br/>
         <strong>Fin: </strong>${end}         
            `
            };
            transporter.sendMail(mailOptions, function (err, info){
                if (err){
                    console.log(err)}
                else{
                    console.log(info)}
            });
        } else {
            const mailOptions = {
                from: "Préstamo de escenarios deportivos - UPTC Seccional Sogamoso",
                to: foundB.user.email,
                subject: subj,
                html: `
         Estimado/a ${foundB.user.name}:<br/>   
         <strong>${req.message}</strong><br/><br/>
         A continuación encuentra los detalles de su reserva:<br/>
         <strong>Escenario: </strong>${foundB.schedule[0].field.name}<br/>
         <strong>Inicio: </strong>${start}<br/>
         <strong>Fin: </strong>${end} <br/><br/>
         ${req.additionalInfo}                
            `
            };
            transporter.sendMail(mailOptions, function (err, info){
                if (err){
                    console.log(err)}
                else{
                    console.log(info)}
            });
        }
    }




}