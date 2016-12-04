/**
 * Created by YuAng on 2016-11-22.
 */

var should = require('should');
var req = require('request');
var expect = require('expect.js');
var Artists = require('../model/artists.js');

var controller = require("../controller/profile.js");


var firstResponse = {
    viewName: "profile"
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};
var secondResponse = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};
before(function(done){
    new Artists({
        "username": "MockName",
        "pwd": "1234567",
        "firstname":"YuAng",
        "lastname":"Zhang",
        "gender": "male",
        "email":"leonzhang1996@hotmail.com",
        "status": "Undergraduate",
        "country": "China"

    }).save(function(err, doc){
        testUser = doc;
        new Product({
            "name": "MockProduct",
            "Description": "abcdefg",
            "releaseTime":Date.now,
            "onSaleStatus":true
        }).save(function(err, doc){
            testProject = doc;
        });
    });
    done();
});
after(function(done){

    User.find({"username": "Mock Name"}).remove().exec();
    done();
});
describe("Find profile", function(){
        it("Main view", function(){
            controller.findProfile('/profile', firstResponse);
            firstresponse.viewName.should.equal("profile");
        });
});

it('Search ', function(done){
    it("Search view", function(){
        routes.findArtists('/artists?username=', secondResponse);
        response.viewName.should.equal("search");
    });
});

it('Check create Artist', function(done){
    var mockUser = {
        "username": "MockAlice",
        "Pwd": "AliceMock",
        "NickName": "XianYu"

    };
    server
        .post('/add_product')
        .send(mockUser)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.text.should.containEql('Success');

            done();
        });
});


it('delete product', function(done){
    server
        .delete('/artists/MockName/product?name=MockProduct')
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.text.should.containEql('Success');
            done();
        });
});

it('Get all products from main', function(done){
    server
        .get('/main' )
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);

            done();
        });
});

it('Getting all artists', function(done){
    server
        .get('/artists' )
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
       //     res.body.should.be.an.Array();
            done();
        });
});

it('Get all products', function(done){
    server
        .get('/products' )
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.should.be.an.Array();
            done();
        });
});
