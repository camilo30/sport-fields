const mongoose = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const AtchTypeSchema = new Schema ({
    code: { type: String, required:true, unique:true },
    desc: { type: String, required:true  }
});

AtchTypeSchema.plugin(uniqueValidator);


var atchType = mongoose.model('AtchType', AtchTypeSchema);



atchType.create({code:'S',desc:'Solicitud de préstamo'})
    .catch(err => console.log('AtchType: S ya existe, no creado'));
atchType.create({code:'A',desc:'Listado de asistentes'})
    .catch(err => console.log('AtchType: A ya existe, no creado'));


module.exports = atchType;