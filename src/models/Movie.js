const MovieMongo = require('./MovieMongoDB.js');
 
module.exports = class Movie {
    add(id_tmdb, title, year, genre, actors, synopsis, affiche, ba) {      
        return MovieMongo.create({
            id_tmdb,
            title,
            year,
            genre,
            actors,
            synopsis,
            affiche,
            ba
        });
    }

    async filmExists(id_tmdb) {
        return await MovieMongo.findOne({id_tmdb}) ? true : false;
    }

    async findById(id_tmdb) {
        return await MovieMongo.findOne({id_tmdb}) ? MovieMongo.findOne({id_tmdb}) : false;
    }

    getLatestsMovies(page = 1){
        const limit = 6;
        return MovieMongo.find().skip((page*limit)-limit).limit(limit);
    }

    getAllMovies() {
        return MovieMongo.find();
    }

    update(id_tmdb, data) {
        return MovieMongo.findOneAndUpdate({id_tmdb}, data);
    }

    delete(id_tmdb) {
        return MovieMongo.deleteOne({id_tmdb})
    }
} 

