module.exports = function ( app ){
    var thingsController = require('../controllers/things.js');
    thingsController.setDBConnectionFromApp(app);

    app.get('/services/v1/things' , thingsController.findAll );
    app.get('/services/v1/things/:id' ,thingsController.findById );

}