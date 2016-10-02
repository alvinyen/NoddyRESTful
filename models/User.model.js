var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

//name
//email
//password
//location////

var UserSchema =  new Schema({
    name : {
      type : String,
      require : true,
      unique : true
    },

    email : {
        type : String,
        unique : true
    },

    password : {
        type : String,
        require :true,
    },

    location : {
        type :Array
    }

});

module.exports = mongoose.model( 'Users' , UserSchema);