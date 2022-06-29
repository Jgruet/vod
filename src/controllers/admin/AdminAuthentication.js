const UserModel = require("../../models/User.js");

module.exports = class AdminAuthentication {
    print(request, response) {
        response.render("admin/form_auth");
    }

    process(request, response) {
        let User = new UserModel();
        User.connect(request.body.email, request.body.password).then(
            (result) => {
                // l'identification a échouée
                if (result == false) {
                    response.render("admin/form_auth", {
                        error: `L'identification a échouée : mauvais identifiants`,
                        email: request.body.email,
                    });
                } else {

                    if(result.isAdmin === false){
                        // Si l'utilisateur qui veut se connecter à l'admin est pas admin
                        response.render("admin/form_auth", {
                            error: `Droit d'accès insuffisant`,
                            email: request.body.email,
                        });
                    } else {
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
                        response.redirect("/admin");
                    }
                }
            }
        );
    }

    disconnect(request, response) {
        delete request.session.user;
        // message dans flashbag
        request.flash('notify', 'Vous êtes maintenant déconnecté.');
        // redirection vers l'accueil
        response.redirect('/');
    }

};
