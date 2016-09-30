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

exports.add = function ( req , res ){
    var collection = dbConnection.collection('Things');
    var item = req.body;
    res.type('application/json');

    var newItem = {};
    newItem.name = req.body.name;
    newItem.location = req.body.location;
    newItem.time = Date.now() / 1000;

    var checkItem = collection.findOne({ name : item.name}, function ( err , returnItem){
       if( returnItem != null ) {
           res.status(201);
           res.json(returnItem);

       }else{
           collection.insertOne( newItem , function ( err , returnItem ){
               if(returnItem != null){
                   res.status(201);
                   res.json( newItem );
               }else{
                   console.log('insert failed..');
                   res.status(400); //???why???
                   res.send( { success:false , msg:'insert failed..' });
               }
           });
       }

    });
}

exports.update = function ( req , res ){
    collection = dbConnection.collection('Things');
    res.type('application/json');

    var item = req.body;

    var objectId ;
    try{
        objectId = ObjectID(req.params.id);
    }catch (e){
        console.log('update failed because of invalid object id..');
        res.status();
        res.send({ success:false , msg:'update failed because of invalid object id..'});
    }

    var items = collection.update( { _id:objectId } , { "$set" : item } ,function(err,returnItem){
        if(returnItem == null){
            console.log('update failed during db update operation..');
            res.status(400);
            res.send( { success : false , msg : 'update failed during db update operation..' } );
        }else{
            res.status(200);
            res.json( { success : true ,  msg : 'success to update！！' } );
        }
    });
}

exports.delete = function ( req , res ){
    collection = dbConnection.collection('Things');
    res.type('application/json');

    var objectId ;
    try{
        objectId = ObjectID(req.params.id);
    }catch (e){
        res.status(400);
        res.send({success:false,msg:'invalid object id'});
        return;
    }

    var items = collection.remove( { _id:objectId } , function ( err , status){
        console.log('status = ' + status);
        if( status.n == 0 ){
            //刪除失敗
            console.log('failed to delete during db remove operation..');
            res.status();
            res.send({success:false,msg:'failed to delete during db remove operation..'});
        }else{
            res.status(204);
            res.json({success:true,msg:'success to delete！'});
            console.log('success to delete！');
        }
    });
}