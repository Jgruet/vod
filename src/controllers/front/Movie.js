const MovieModel = require("../../models/Movie.js");

module.exports = class Movie {
    print(request, response) {
        const Movies = new MovieModel();
        const id_tmdb = request.params.id;
        Movies.findById(id_tmdb).then((result) => {
            if(result === false) {
                response.status(404);
                response.send("Film introuvable");
            } else {
                response.render('front/movie/single', {movie : result});  
            }
        })

    }

};
