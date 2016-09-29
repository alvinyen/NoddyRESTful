var express = require('express');
var app = express();


app.get('/hello',function(req,res){
    res.type('text/plain');
    res.send('aloha~');
});

app.listen(4000);
