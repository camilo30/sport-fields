const mongoose = require ('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema ({
    name: { type: String, required:true, unique:true },
});

var role = mongoose.model('Role', RoleSchema);

role.create({name:'user'})
    .catch(err => console.log('Role: user ya existe, no creado'));
role.create({name:'director'})
    .catch(err => console.log('Role: director ya existe, no creado'));
role.create({name:'admin'})
    .catch(err => console.log('Role: admin ya existe, no creado'));

module.exports = role;