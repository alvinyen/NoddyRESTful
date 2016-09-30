var db; //針對這個檔案的 (區域)db變數
var dbConnection; //針對這個檔案的 (區域)資料庫連接變數

exports.setDBConnectionFromApp = function ( app ) {
    dbConnection = app.get('dbConnection');
}

exports.findAll = function ( req , res ){
    var collection = dbConnection.collection('Things');

    var items = collection.find( {} ,function ( err , docsCursor ){
        res.type('application/json');

        if(err){
            res.type(500);
            res.send({ success:false , msg:'database error..'});
            return
        }

        var itemsList = [];
        docsCursor.each(function(err,item){
            if(item !== null){
                var newItem = {};
                newItem.id = item.id;
                newItem.name = item.name;
                newItem.location = item.location;

                itemsList.push(newItem);
            }else{//代表走完了！！
                res.status(200);
                res.json( { items : itemsList } );
            }
        });


    });




}