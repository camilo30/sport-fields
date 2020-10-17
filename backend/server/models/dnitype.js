const mongoose = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const DniTypeSchema = new Schema ({
    code: { type: String, required:true, unique:true },
    desc: { type: String, required:true  }
});

DniTypeSchema.plugin(uniqueValidator);


var dniType = mongoose.model('DniType', DniTypeSchema);

dniType.create({code:'CC',desc:'Cédula de Ciudadanía'})
    .catch(err => console.log('DniType: CC ya existe, no creado'));
dniType.create({code:'TI',desc:'Tarjeta de Identidad'})
    .catch(err => console.log('DniType: TI ya existe, no creado'));
dniType.create({code:'CE',desc:'Cédula de Extranjería'})
    .catch(err => console.log('DniType: CE ya existe, no creado'));

module.exports = dniType;