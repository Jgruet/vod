const UserModel = require('../../models/User.js');

module.exports = class UserRegister {
    print(request, response) {
        response.render('front/user/form_register');   
    }
    process(request, response) {
        // console.log(request.body)
        let User = new UserModel();
 
        User.emailExists(request.body.email).then((result) => {
            if(result === false) {
                let bcrypt = require('bcryptjs');
                let salt = bcrypt.genSaltSync(10);
                let pwsdHash = bcrypt.hashSync(request.body.password, salt);
                User.add(request.body.lastname, request.body.firstname, request.body.email, pwsdHash).then((user) => {
                    // message dans flashbag
                    request.flash('notify', 'Votre compte a bien été créé.');

                    User.connect(request.body.email, request.body.password).then(
                        (result) => {
                            // l'identification a échouée
                            if(result) {
                                // on enregistre les infos en session
                                request.session.user = {
                                    connected: true,
                                    id: result._id,
                                    email: result.email,
                                    isAdmin: result.isAdmin,
                                    lastname: result.lastname,
                                    firstname: result.firstname,
                                };
                                // message dans flashbag
                                request.flash("notify", "Vous êtes maintenant connecté.");
                                // redirection vers l'accueil
                                response.redirect("/");
                            } else {
                                // message dans flashbag
                                request.flash("error", "Une erreur s'est produite");
                                // redirection vers l'accueil
                                response.redirect("/");
                            }
                        }
                    );
                });
            }
            else {
                // reaffichage du formulaire avec message d'erreur et donnée dans formulaire
                response.render('front/user/form_register', {
                    error : `Cette adresse email est déjà utilisée !`,
                    lastname : request.body.lastname,
                    firstname : request.body.firstname,
                    email : request.body.email
                })
            }
        })
    }

}

