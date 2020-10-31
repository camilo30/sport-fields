const mongoose = require ('mongoose');

const { Schema } = mongoose;

const AtchTypeSchema = new Schema ({
    code: { type: String, required:true },
    desc: { type: String, required:true }
});

module.exports = mongoose.model('AtchType', AtchTypeSchema);