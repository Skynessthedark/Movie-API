const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, '{PATH} alanını girmek zorunludur.'],
        maxlength: 120,
        minlength: 1
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    director_id: Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', movieSchema);