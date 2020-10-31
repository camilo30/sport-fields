const mongoose = require ('mongoose');

const { Schema } = mongoose;

const UserTypeSchema = new Schema ({
    code: { type: String, required:true },
    desc: { type: String, required:true },
    internal: { type: Boolean, required:true },
    public: { type: Boolean, required:true }
});

module.exports = mongoose.model('UserType', UserTypeSchema);