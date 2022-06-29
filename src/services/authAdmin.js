module.exports = (request, response, next) => {
    if(request.path === '/login') {
        // permet d'afficher la page /admin/login aux utilisateurs non connectés
        next();
    }  
    else if(typeof request.session.user == 'undefined' || request.session.user.isAdmin !== true) {
        // Si un utilisateur non connecté essaie de visiter /admin il est redirigé vers le formulaire de login de l'administration
        response.redirect('/admin/login');
    }
    else if(typeof request.session.user.connected=== true || request.session.user.isAdmin === false) {
        // Si un utilisateur connecté non admin essaye de visiter la page d'administration, on lui renvoi un code 401
        response.status(401);
        response.end('HTTP 401 Unauthorized');
    } else {
        next();
    }
};

