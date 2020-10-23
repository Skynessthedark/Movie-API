const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    _id: String,
    name: String,
    surname: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('director', directorSchema);