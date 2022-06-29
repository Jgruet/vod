require('dotenv').config()
const fetchUrl = require("fetch").fetchUrl;
const res = require('express/lib/response');
const fs = require('fs');
const ModelMovie = require('../models/Movie.js');
const Movie = new ModelMovie();
const apiUrl = process.env.TMDB_API_URL;
const apiKey = process.env.TMDB_API_KEY_V3;


module.exports = (request, response, filePath) => {

    fs.readFile(filePath, (err, data) => {
        // Si il n'y a pas d'erreur à la lecture
        if(!err) {
            // On crée un tableau avec le nom des films
            const movies = data.toString().split('\n').map(movie => movie.trim());
            let done = 0;
            let failed = 0;
            // On boucle sur chaque nom de film
            movies.forEach(async (movie) => {   
                await sleep(1000);
                await fetchUrl(`${apiUrl}search/movie?api_key=${apiKey}&language=fr-FR&page=1&limit=1&include_adult=false&query=${movie}`, (error, meta, body) => { 
                    getMovieData(body).then((data) => {done++; }, (error) => {console.log(error); failed++; });
                });
            });
            response.status(201);
            response.send({total: movies.length, done, failed})
        }
    });


}

//--------------------------------------------------------------------
// Déclaration des fonctions
//--------------------------------------------------------------------
function sleep(ms) { return new Promise((resolve) => { setTimeout(resolve, ms); }); }

function getMovieData(body) {
    return new Promise((resolve, reject) => {
        // On parse le résultat
        let infosMovie = JSON.parse(body.toString());
        // Si on obtient le résultat attendu
        if(infosMovie['results'] !== undefined && infosMovie['results'].length > 0){
            let idMovie = infosMovie['results'][0]['id'];
            if(idMovie > 0) {
                // On va créer un tableau pour stocker les 2 promises
                let tabPromise = [];
                // On va récupérer le détail du film
                tabPromise.push(
                    new Promise((resolve, reject) => {
                        fetchUrl(`${apiUrl}movie/${idMovie}?api_key=${apiKey}&language=fr-FR`, 
                            function(error, meta, detail){ 
                                resolve(JSON.parse(detail.toString()));
                            }
                        );
                    })
                );
                // On va récupérer les acteurs du film
                tabPromise.push(
                    new Promise((resolve, reject) => {
                        fetchUrl(`${apiUrl}movie/${idMovie}/credits?api_key=${apiKey}&language=fr-FR`, 
                            function(error, meta, actors){ 
                                resolve(JSON.parse(actors.toString()));
                            }
                        );
                    })
                );
                // On attend que les 2 promises soient terminées
                Promise.all(tabPromise).then(async (data)  => {
                    let detail = data[0];
                    let actors = data[1];
                        
                    Movie.add(
                        idMovie, 
                        detail.title, 
                        new Date(detail.release_date).getFullYear(), 
                        detail.genres.map((el) => el.name).join(', '), 
                        actors.cast.slice(0,5).map((el) => el.name).join(', '), 
                        detail.overview, 
                        `https://image.tmdb.org/t/p/w200${detail.poster_path}`                        
                    )
                    .then((data) => { resolve(data); })
                    .catch((error) => { reject(error); });
                    await sleep(1000); // On attend 1 seconde avant de passer à la suite
                });
            }
        }
    });
}

