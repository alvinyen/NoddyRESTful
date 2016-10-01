module.exports = function ( app ){
    var usersController = require('../controllers/users.js');
    usersController.setDBConnectionFromApp( app );

    app.get( '/services/v1/users' , usersController.findAll );
    app.get( '/services/v1/users/:id' , usersController.findById );
    app.get( '/services/v1/users/nearme/:lon/:lat' , usersController.findNearMe );

}