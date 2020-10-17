const mongoose = require ('mongoose');

const { Schema } = mongoose;

const AttachmentSchema = new Schema ({
    atchType: { type: Schema.Types.ObjectID, ref:'AtchType' },
    desc : { type: String },
    path: { type: String }

});



module.exports = mongoose.model('Attachment', AttachmentSchema);