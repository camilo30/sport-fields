const mongoose = require ('mongoose');

const { Schema } = mongoose;

const DniTypeSchema = new Schema ({
    code: { type: String, required:true },
    desc: { type: String, required:true  }
});


module.exports = mongoose.model('DniType', DniTypeSchema);