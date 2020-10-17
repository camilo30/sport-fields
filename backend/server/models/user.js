const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

var uniqueValidator = require('mongoose-unique-validator');


const { Schema } = mongoose;

const UserSchema = new Schema ({
    userType:   { type: Schema.Types.ObjectID, ref: 'UserType'},
    name:       { type: String, required: true },
    dniType:    { type: Schema.Types.ObjectID, ref: "DniType", },
    dni:        { type: String, required: true},
    code:       { type: String },
    phone:      { type: String, required: true},
    email:      { type: String, required:true, unique:true },
    password:   { type: String},
    roles:      [{type: Schema.Types.ObjectID, ref: 'Role'}]
},{
    timestamps: true
});

UserSchema.plugin(uniqueValidator);

UserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password,receivedPassword);
}

module.exports = mongoose.model('User', UserSchema);