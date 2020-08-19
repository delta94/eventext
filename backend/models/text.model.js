const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    user: {
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
        type: Buffer
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