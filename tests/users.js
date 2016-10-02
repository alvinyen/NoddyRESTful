var moongoose = require('mongoose');
var chai = require('chai');
var chai_http = require('chai-http');

var should = chai.should();

var Users = require('../models/User.model');
var server = require('../server');

chai.use(chai_http);

describe('Users' , function(){
    beforeEach(function(done){
        Users.remove({},function(err){
            done();
        });
    });

    after(function(done){
        Users.remove({},function(err){
            done();
        });
    });

    describe('/:id get_user',function(){
       it('it should GET a user by the given id',function(done){
          var user = new Users({
              'name':'Amy',
              'email':'amy@test.com',
              'password':'cestyyy',
          });

           user.save(function(err,returnItem){
               chai.request(server)
                   .get('/services/v1/users/' + user.id)
                   .send(user)
                   .end(function(err,res){
                       res.should.have.status(200);
                       res.should.be.a('object');
                       res.body.should.have.property('name');
                       done();
                   });
           });
       });

    });




});