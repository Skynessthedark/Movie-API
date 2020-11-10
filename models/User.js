const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [8, "{PATH} has to be at least {VALUE} characters."],
        maxlength: [30, "{PATH} has to be at most {VALUE} characters."],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "{PATH} has to be at least {VALUE} characters."]
    }
});

module.exports = mongoose.model('user', userSchema);