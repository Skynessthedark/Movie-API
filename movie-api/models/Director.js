const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    //_id: String,
    name: {
        type: String,
        required: [true, '{PATH} alanını girmek zorunludur.'],
        maxlength: 120,
        minlength: 1
    },
    surname: {
        type: String,
        required: [true, '{PATH} alanını girmek zorunludur.'],
        maxlength: 120,
        minlength: 1
    },
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('director', directorSchema);