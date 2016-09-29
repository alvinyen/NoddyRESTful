var path = require('path');
var express = require('express');
var app = express();

var port_value = 4000;
var env_string = process.argv[2];
var port_string = process.argv[3];
var mongodbURL ;

if( typeof port_string !== 'undefined' && port_string.length != 0 ){
    port_value = port_string ;
}

if( typeof env_string === 'undefined'){
    console.log('env_string is not set！');
    return -1;
}else{
    switch(env_string){
        case 'DEV':
            //dev db setting
            mongodbURL = 'mongodb://localhost:27017/Noddy2';
            break;
        default:
            console.log('env_string is not valid！');
            return -1;
    }

}

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



app.get('/hello',function(req,res){
    res.type('text/plain');
    res.send('aloha~');
});


app.listen(port_value);

console.log(process.argv.length);
console.log('prgram_name = process.argv[0]：' + process.argv[0]);
console.log('script_path/entry file = process.argv[1]：' + process.argv[1]);
console.log('_dirname：' + __dirname); //must type two continuous underline...
console.log('_filename：'+ __filename); //must type two continuous underline...

