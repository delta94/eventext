const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    segmentId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    media: {
        type: String
    },
    message: {
        type: String,
        required: true,
    },
    link: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;