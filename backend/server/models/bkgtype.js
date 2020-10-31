const mongoose = require ('mongoose');

const { Schema } = mongoose;

const BkgTypeSchema = new Schema ({
    code: { type: String, required:true },
    desc: { type: String, required:true }
});


module.exports =  mongoose.model('BkgType', BkgTypeSchema);