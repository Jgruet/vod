const res = require("express/lib/response");
const MovieModel = require("../../models/Movie.js");
const movieProvider = require("../../services/movieProvider");

module.exports = class AdminMovie {
    printForm(request, response) {
        response.render("admin/movies/form", {movie : {actors : []}});
    }

    printHydratedForm(request, response) {
        let Movie = new MovieModel();
        Movie.findById(request.params.id).then((result) => {
            if (result === false) {
                response.status(404);
                response.send("Film introuvable");
            } else {
                response.render("admin/movies/form", { movie: result });
            }
        });
    }

    getAllMovies(request, response) {
        let Movie = new MovieModel();

        let movies = Movie.getAllMovies().then((movies) => {
            response.render("admin/movies/archive", { movies });
        });
    }

    process(request, response) {
        let Movie = new MovieModel();

        Movie.filmExists(request.body.id_tmdb).then((result) => {
            if (result === false) {
                let ba = request.body.ba;
                //let ba = request.body.ba.includes('?v=') ?  request.body.ba.split('?v=')[1] : request.body.ba;
                if (request.body.ba !== "") {
                    const regex =
                        /(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/)?([A-Za-z0-9]+)/;
                    ba = request.body.ba.match(regex)[2];
                }

                Movie.add(
                    request.body.id_tmdb,
                    request.body.title,
                    request.body.year,
                    request.body.genre,
                    request.body.actors.split(",").map((actor) => actor.trim()),
                    request.body.synopsis,
                    request.body.affiche,
                    ba
                ).then((result) => {
                    if (result) {
                        // message dans flashbag
                        request.flash("notify", "Film ajouté");
                        // redirection vers l'accueil
                        response.redirect("/admin/movie");
                    }
                });
            } else {
                // message dans flashbag
                request.flash("error", "Film déjà enregistré");
                // redirection vers l'accueil
                response.redirect("/admin/movie");
            }
        });
    }

    processUpdate(request, response) {
        let Movie = new MovieModel();

        Movie.filmExists(request.body.id_tmdb).then((result) => {
            if (result === true) {
                let ba = request.body.ba;
                //let ba = request.body.ba.includes('?v=') ?  request.body.ba.split('?v=')[1] : request.body.ba;
                if (request.body.ba !== "") {
                    const regex =
                        /(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/)?([A-Za-z0-9]+)/;
                    ba = request.body.ba.match(regex)[2];
                }

                Movie.update(
                    request.body.id_tmdb,
                    {
                    title : request.body.title,
                    year : request.body.year,
                    genre : request.body.genre,
                    actors : request.body.actors.split(",").map((actor) => actor.trim()),
                    synopsis : request.body.synopsis,
                    affiche : request.body.affiche,
                    ba
                    }
                ).then((result) => {
                    if (result) {
                        // message dans flashbag
                        request.flash("notify", "Film ajouté");
                        // redirection vers l'accueil
                        response.redirect("/admin/movie");
                    }
                });
            } else {
                // message dans flashbag
                request.flash("error", "Film déjà enregistré");
                // redirection vers l'accueil
                response.redirect("/admin/movie");
            }
        });
    }

    delete(request, response) {
        let Movie = new MovieModel();
        Movie.delete(request.params.id).then((result) => {
            if (result === false) {
                // redirection vers l'accueil
                response.sendStatus(500);
            } else {
                // redirection vers l'accueil
                response.sendStatus(200);
            }
        });
    }

    printImportForm(request, response) {
        response.render("admin/movies/import");
    }

    processImportForm(request, response) {
        let file;
        let uploadPath;
        console.log(request.files);
        if (!request.files || Object.keys(request.files).length === 0) {
            return response.status(400).send("No files were uploaded.");
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        file = request.files.txt_file;
        uploadPath = "public/upload/" + new Date().getTime() + file.name;

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, function (err) {
            if (err) return response.status(500).send(err);

            //response.send('File uploaded!');
            // Appel du service qui va chercher les titres sur tmdb et les enregistre
            movieProvider(request, response, uploadPath);
        });
    }
};
