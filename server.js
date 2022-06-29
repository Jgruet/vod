const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload'); 
require('dotenv').config() // charge le .env si config() est vide


app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

/* if(process.env.APP_ENV === 'dev') {
    app.use((req,res,next) => {
        req.session.user =  {
            connected: true,
            id: '123',
            email: 'j.doe@yopmail.com',
            isAdmin: false,
            lastname: 'Doe',
            firstname: 'John',
        };
        next();
    });
} */
// permet de renvoyer les sessions à la vue
app.use((req,res,next) => {res.locals.session = req.session; next();});
//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages')
app.use(flash());

//--------------------------------------------------------------------
//      Ajout du midlleware pour gérer l'upload de fichier
//--------------------------------------------------------------------
app.use(fileUpload());

//--------------------------------------------------------------------
//      Mise en place de SASS
//--------------------------------------------------------------------
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build/'),
    dest: path.join(__dirname, 'public/'),
    debug: false,   // true pour voir les traitements effectués
    indentedSyntax: false, // true Compiles files with the .sass extension
    outputStyle: 'compressed'
}));

 
//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
 
//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
// Connexion à MongoDB
//--------------------------------------------------------------------
const mongoose = require('mongoose')
mongoose.connect(
    process.env.URI_MONGODB, 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () =>  {
    console.log(`Connexion au serveur MongoDB OK`)
})


//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
app.use('/admin', require('./src/services/authAdmin.js'));
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT,() => {
    console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}` );
});
