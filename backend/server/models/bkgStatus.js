const mongoose = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const BkgStatusSchema = new Schema ({
    code: { type: String, required:true, unique:true },
    name: { type: String, required:true  },
    desc: { type: String, required:true }

});

BkgStatusSchema.plugin(uniqueValidator);

var bkgStatus = mongoose.model('BkgStatus', BkgStatusSchema);

bkgStatus.create({code:'S',name:'Solicitada', desc:'Reserva solicitada, el administrador validará disponibilidad.'})
    .catch(err => console.log('BkgStatus: S ya existe, no creado'));
bkgStatus.create({code:'P',name:'Pre-aprobada', desc:'Existe disponibilidad para su reserva, por favor cargar la documentación requerida'})
    .catch(err => console.log('BkgStatus: P ya existe, no creado'));
bkgStatus.create({code:'E',name:'En revisión',desc:'Documentación en revisión del administrador'})
    .catch(err => console.log('BkgStatus: E ya existe, no creado'));
bkgStatus.create({code:'A',name:'Aprobada',desc:'Documentación válida, reserva aprobada.'})
    .catch(err => console.log('BkgStatus: A ya existe, no creado'));
bkgStatus.create({code:'R',name:'Rechazada',desc:'No existe disponibilidad de horario o la documentación adjunta no es válida o está incompleta.'})
    .catch(err => console.log('BkgStatus: R ya existe, no creado'));
bkgStatus.create({code:'C',name:'Cancelada',desc:'Reserva cancelada por el usuario.'})
    .catch(err => console.log('BkgStatus: C ya existe, no creado'));

module.exports = bkgStatus;