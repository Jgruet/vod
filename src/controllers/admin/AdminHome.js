const MovieModel = require('../../models/Movie.js');

module.exports = class AdminMovie  {
    print(request, response) {
        response.render('admin/home');
    }
}
