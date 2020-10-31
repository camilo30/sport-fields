const mongoose = require ('mongoose');

const { Schema } = mongoose;

const FieldSchema = new Schema ({
    name: { type: String, required:true },
    desc : { type: String, required:true  },
    color: {type: String, required: true },
    imagePath:{ type: String, required:true }
});



module.exports = mongoose.model('Field', FieldSchema);