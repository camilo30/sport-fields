const mongoose = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const UserTypeSchema = new Schema ({
    code: { type: String, required:true, unique:true },
    desc: { type: String, required:true },
    internal: { type: Boolean, required:true },
    public: { type: Boolean, required:true }
});

UserTypeSchema.plugin(uniqueValidator);

var userType = mongoose.model('UserType', UserTypeSchema);

userType.create({code:'E',desc:'Estudiante', internal:true, public:false})
    .catch(err => console.log('UserType: E ya existe, no creado'));
userType.create({code:'F',desc:'Funcionario', internal:true, public: false})
    .catch(err => console.log('UserType: F ya existe, no creado'));
userType.create({code:'X',desc:'Externo', internal:false, public:false})
    .catch(err => console.log('UserType: X ya existe, no creado'));


module.exports = userType;