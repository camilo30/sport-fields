const mongoose = require ('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema ({
    name: { type: String, required:true, unique:true },
});

var role = mongoose.model('Role', RoleSchema);


module.exports = role;