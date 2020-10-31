const mongoose = require ('mongoose');

const { Schema } = mongoose;

const BookingSchema = new Schema ({
    bkgType: { type: Schema.Types.ObjectID, ref:'BkgType' },
    bkgStatus : { type: Schema.Types.ObjectID, ref:'BkgStatus' },
    desc: { type: String },
    user:{ type: Schema.Types.ObjectID, ref:'User' },
    schedule: [{ type: Schema.Types.ObjectID, ref: 'Schedule'}],
    comment: { type: String },
    attachment: [{ type: Schema.Types.ObjectID, ref: 'Attachment'}]

},{
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);