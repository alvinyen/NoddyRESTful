var express = require('express');
var app = express();


app.get('/hello',function(req,res){
    res.type('text/plain');
    res.send('aloha~');
});

app.listen(4000);

console.log(process.argv.length);
console.log('prgram_name = process.argv[0]：' + process.argv[0]);
console.log('script_path/entry file = process.argv[1]：' + process.argv[1]);
console.log('_dirname：' + __dirname); //must type two continuous underline...
console.log('_filename：'+ __filename); //must type two continuous underline...

