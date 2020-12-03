const express = require('express');
const morgan = require ('morgan');
const path = require ('path');
const cors = require ('cors');
const mongoose1= require('mongoose');
const User = require('./models/user');
const {verifyToken, isDirector} =require('./middlewares/authJwt');
const jwt = require('jsonwebtoken');
const config = require('./config');



const app = express();



const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000)


// Middlewares
app.use(morgan("dev")); //Ver peticiones en consola
app.use(express.json()); //Permite al servidor entender datos en formato json
app.use(cors({origin: 'http://localhost:4200'}));


// Routes

app.use('/api/dnis',require('./routes/dni.routes'));
app.use('/api/types',require('./routes/types.routes'));
app.use('/api/fields', require('./routes/field.routes'));
app.use('/api/schedules',require('./routes/schedule.routes'));
app.use('/api/attachments', require('./routes/attachment.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/reports', require('./routes/reports.routes'));
app.use('/api/', require('./routes/user.routes'));




//Ruta estatica archivos
app.use('/public',express.static(path.resolve('public')));

const init = require('./libs/init');
init();

//Starting the server
app.listen(app.get('port'), () => {

    console.log(`Server on port ${app.get('port')}`)
});