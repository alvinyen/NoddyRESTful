var ObjectID = require('mongodb').ObjectID;

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
        docsCursor.each(function( err , item ){
            if(item !== null){
                var newItem = {};
                newItem.id = item.id;
                newItem.name = item.name;
                newItem.location = item.location;

                itemsList.push(newItem);
            }else{//代表走完了！！
                res.status(200);
                res.json( itemsList );
            }
        });


    });
}

exports.findById = function ( req , res ){
    var collection = dbConnection.collection('Things');
    res.type('application/json');


    var objectId ;
    try{
        objectId = ObjectID(req.params.id);
    }catch (e) {
        console.log(req.params.id);
        console.log(objectId);
        res.status(500); //why???
        res.send( { success:false , msg:'invalid object id..'});
        return ;
    }

    var item = collection.findOne( { _id : objectId} , function ( err , returnItem ){
        if( returnItem != null ){
            var newItem = {};
            newItem.id = returnItem._id;
            newItem.name = returnItem.name;
            newItem.location = returnItem.location;
            res.status(200);
            res.json( newItem);
        }else{
            res.status(400);
            res.send({ success:false , msg:'item not found' });
        }
    });

}