const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10
    }
}, {
    timestamps: true
});

const Directory = mongoose.model('Directory', directorySchema);

module.exports = Directory;