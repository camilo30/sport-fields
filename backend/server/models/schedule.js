const mongoose = require ('mongoose');

const { Schema } = mongoose;

const ScheduleSchema = new Schema ({
    field: { type: Schema.Types.ObjectID, ref:'Field' },
    start : { type: Date  },
    end:{ type: Date },
    available: {type: Boolean}

});



module.exports = mongoose.model('Schedule', ScheduleSchema);