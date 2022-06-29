const UserModel = require("../../models/User.js");

module.exports = class Movie {
    print(request, response) {
        if (typeof request.session.user == "undefined") {
            // Si un utilisateur non connecté essaie de visiter /admin il est redirigé vers le formulaire de login de l'administration
            response.redirect("/connexion");
        } else {
            let User = new UserModel();
            console.log(request.session.user.email);
            let user = User.getUser(request.session.user.email).then((result) => {
                console.log(result);
                if (result === false) {
                    response.status(404);
                    response.send('Utilisateur introuvable');
                } else if (result.id !== request.session.user.id) {
                    response.status(403);
                    response.send('Vous ne pouvez pas accéder à cette page');
                } else {
                    response.render("front/user/dashboard", { user : result });
                }
            });
        }
    }
};
