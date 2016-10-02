var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); // for assert db connection
var path = require('path');
var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended : true }));


var port_value = 4000;
//var env_string = process.argv[3];
var port_string = process.argv[2];

//var mongodbURL ;
var mongodbURL = 'mongodb://localhost:27017/Noddy' ; //for mocha testing
var db ;

if( typeof port_string !== 'undefined' && port_string.length != 0 ){
    port_value = port_string ;
}

//for mocha testing only
// if( typeof env_string === 'undefined'){
//     console.log('env_string is not set！');
//     return -1;
// }else{
//     switch(env_string){
//         case 'DEV':
//             //dev db setting
//             mongodbURL = 'mongodb://localhost:27017/Noddy';
//             break;
//         default:
//             console.log('env_string is not valid！');
//             return -1;
//     }
//
// }

//mongodb
MongoClient.connect( mongodbURL , function ( err , dbConnection ){
    assert.equal(null,err);
    console.log( ' connected successfully to mongodb server ' + mongodbURL);

    db = dbConnection ; //全域
    app.set( 'dbConnection' , dbConnection ); //global
    app.set( 'mongooseDbConnection' , mongoose.connect(mongodbURL));


    require('./routes/things')(app);
    require('./routes/users')(app);

    app.get('/hello',function(req,res){
        res.type('text/plain');
        res.status(200);
        res.send('aloha~');
    });

    //routes
    app.set( 'public' , path.join( __dirname , 'public'));
    app.use(express.static(app.get('public'))); //在靜態資料夾裡會自動找到index.html
    app.use(function ( req , res , next ){
        res.status(404);
        res.sendFile(path.join( app.get('public') , '404.html'));
    });
    app.use(function ( err , req , res , next){
        console.log(err.stack);

        res.status(500);
        res.sendfile(app.get('public') , '500.html');
    });

    app.listen(Number(port_value) , function(){
        console.log('server is running on ' + Number(port_value));
    });

    //why????????????????????????
    //module.exports = app; //for testing

});

//why????????????????????????
module.exports = app; //for testing

console.log(process.argv.length);
console.log('prgram_name = process.argv[0]：' + process.argv[0]);
console.log('script_path/entry file = process.argv[1]：' + process.argv[1]);
console.log('_dirname：' + __dirname); //must type two continuous underline...
console.log('_filename：'+ __filename); //must type two continuous underline...

