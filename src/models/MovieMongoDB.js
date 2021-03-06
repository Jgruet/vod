const mongoose = require('mongoose');
const MovieSchema = mongoose.Schema({
    title: { type: String },
    year: { type: String, match: /^(19|20)[0-9]{2}$/ },
    genre : { type: String },
    actors : { type: Array },
    synopsis: { type: String },
    affiche: { type: String },
    id_tmdb: { type: Number },
    date: { type: Date, default: Date.now },
    ba: { type:String }
});
module.exports = mongoose.model('Movie', MovieSchema); 