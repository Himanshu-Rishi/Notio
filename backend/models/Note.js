const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    nature: { type: Boolean,
        default: false }
});

module.exports = mongoose.model('notes', NotesSchema)