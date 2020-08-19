const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    directoryIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Directory'
    }]
}, {
    timestamps: true
});

const Segment = mongoose.model('Segment', segmentSchema);

module.exports = Segment;