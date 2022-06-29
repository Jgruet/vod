module.exports = (app) => {
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/front/Home.js')
        let Controller = new Home();
        Controller.print(req, res);
    });

    app.get('/doc', (req, res) => {
        let Documentation = require('../src/controllers/front/Documentation.js')
        let Controller = new Documentation();
        Controller.print(req, res);
    });

    app.get('/film/:id', (req, res) => {
        let Movie = require('../src/controllers/front/Movie.js')
        let Controller = new Movie();
        Controller.print(req, res);
    });

    app.get('/inscription', (req, res) => {
        let UserRegister = require('../src/controllers/front/UserRegister.js')
        let Controller = new UserRegister();
        Controller.print(req, res);
    });

    app.post('/inscription', (req, res) => {
        let UserRegister = require('../src/controllers/front/UserRegister.js');
        let Controller = new UserRegister();
        Controller.process(req, res);
    });

    app.get('/connexion', (req, res) => {
        let Authentication = require('../src/controllers/front/Authentication.js')
        let Controller = new Authentication();
        Controller.print(req, res)
    })

    app.post('/connexion', (req, res) => {
        let Authentication = require('../src/controllers/front/Authentication.js')
        let Controller = new Authentication();
        Controller.process(req, res)
    });

    app.get('/deconnexion', (req, res) => {
        let Authentication = require('../src/controllers/front/Authentication.js')
        let Controller = new Authentication();
        Controller.deconnect(req, res)
    })

    app.get('/dashboard', (req, res) => {
        let Dashboard = require('../src/controllers/front/UserDashboard.js')
        let Controller = new Dashboard();
        Controller.print(req, res)
    })

    app.get('/admin/login', (req, res) => {
        let AdminAuthentication = require('../src/controllers/admin/AdminAuthentication.js')
        let Controller = new AdminAuthentication();
        Controller.print(req, res);   
    });

    app.post('/admin/login', (req, res) => {
        let AdminAuthentication = require('../src/controllers/admin/AdminAuthentication.js')
        let Controller = new AdminAuthentication();
        Controller.process(req, res);   
    });

    app.get('/admin/disconnect', (req, res) => {
        let AdminAuthentication = require('../src/controllers/admin/AdminAuthentication.js')
        let Controller = new AdminAuthentication();
        Controller.disconnect(req, res);       
    });
    
    app.get('/admin/movie/add/', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.printForm(req, res);       
    });
    
    app.post('/admin/movie/add/', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.process(req, res);       
    });

    app.get('/admin/movie/update/:id/', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.printHydratedForm(req, res);       
    });
    
    app.post('/admin/movie/update/:id/', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.processUpdate(req, res);       
    });


    app.get('/admin/movie/import/', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.printImportForm(req, res);       
    });

    app.post('/admin/movie/import/', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.processImportForm(req, res);       
    });

    app.delete('/admin/movie/:id/', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.delete(req, res);       
    });

    app.get('/admin/movie', (req, res) => {
        let AdminMovie = require('../src/controllers/admin/AdminMovie.js')
        let Controller = new AdminMovie();
        Controller.getAllMovies(req, res);       
    });

    app.get('/admin', (req, res) => {
        let AdminHome = require('../src/controllers/admin/AdminHome.js')
        let Controller = new AdminHome();
        Controller.print(req, res);       
    });

    app.get('/load', (req, res) => {
        let Home = require('../src/controllers/front/Home.js')
        let Controller = new Home();
        Controller.loadMovies(req, res);
    })
};

