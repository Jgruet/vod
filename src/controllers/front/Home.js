const MovieModel = require("../../models/Movie.js");

module.exports = class Home {
    print(request, response) {
        const Movies = new MovieModel();
        
        Movies.getLatestsMovies().then((movies) => {

            response.render('front/home', {movies});  
        })

    }

    loadMovies(request, response) {
        const Movies = new MovieModel();
        let page = request.query.page || 1;
        Movies.getLatestsMovies(page).then((movies) => {
            response.render('front/movie/movies', {movies}); 
        })
    }
};
