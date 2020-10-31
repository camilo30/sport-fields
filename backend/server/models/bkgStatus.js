const mongoose = require ('mongoose');

const { Schema } = mongoose;

const BkgStatusSchema = new Schema ({
    code: { type: String, required:true },
    name: { type: String, required:true },
    desc: { type: String, required:true }

});

module.exports =  mongoose.model('BkgStatus', BkgStatusSchema);