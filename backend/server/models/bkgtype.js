const mongoose = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const BkgTypeSchema = new Schema ({
    code: { type: String, required:true, unique:true },
    desc: { type: String, required:true  }
});

BkgTypeSchema.plugin(uniqueValidator);


var bkgType = mongoose.model('BkgType', BkgTypeSchema);

bkgType.create({code:'A',desc:'Alquiler'})
    .catch(err => console.log('BkgType: R ya existe, no creado'));
bkgType.create({code:'P',desc:'Préstamo'})
    .catch(err => console.log('BkgType: P ya existe, no creado'));


module.exports = bkgType;