const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    segments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Segment' 
    }],
    texts: [{
        type: Schema.Types.ObjectId,
        ref: 'Text'
    }],
    directories: [{
        type: Schema.Types.ObjectId,
        ref: 'Directory'
    }],
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;