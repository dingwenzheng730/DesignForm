/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var crypto = require('crypto');
var Products = require('../model/products.js');


var Picture = new Schema(
    { img:
    { data: Buffer, contentType: String }
    }
);

var Artist = new Schema(
    {
        id: {
            type: String, required: true,unique: true
        },
        pwd: {
            type: String, required: true,unique: true
        },
        givenname: {
            type: String, requried: true
        },
        lastname: {
            type: String, required: true, unique: true
        },
        gender: {
            type: String, required: true,
        },
        email: {
            type: String, required: true,unique: true
        },
        country: {
            type: String
        },
        status: {
            type: String
        },
        role: {
            type: String
        },

        products: [Products]},
        //picture: [Picture]},


    {
        collection: 'artists'
    }
    );

mongoose.connect('mongodb://localhost/artistsdb');


module.exports = Artist;
var Person  = mongoose.model('Artist', Artist);

var SunMeng = new Person({

    "id": "9780143194798",
    "pwd": "1234151249098",
    "givenname": "Meng",
    "familyname": "Sun",
    "gender": "Female",
    "email": "artist@hotmail.com",
    "country": "China",
    "status": "Undergrad",
    "role": "Fashion Designer",
    "products": [
        {
            "name": "asdfsdf",
            "description": "random work",
            "releaseTime": "Oct.11th",
            "reviews": [
                {
                    "id": "asdfasdfasfd",
                    "rating": 4,
                    "author": "Yu Ang",
                    "releaseTime": "Oct.11th",
                    "text": "Nice work!"
                }
            ]
        },
        {
            "name": "blue",
            "description": "shitty work",
            "releaseTime": "Oct.11th",
            "reviews": [
                {
                    "id": "asdfasdfasfd",
                    "rating": 1,
                    "author": "Liya",
                    "releaseTime": "Oct.11th",
                    "text": "bad work...."
                },
                {
                    "id": "fababsdgsf",
                    "rating": 1,
                    "author": "Lisa",
                    "releaseTime": "Oct.15th",
                    "text": "really bad work...."
                }
            ]
        },
        {
            "name": "river",
            "description": "good work",
            "releaseTime": "Oct.12th",
            "reviews": [
                {
                    "id": "asdfasdfasfd",
                    "rating": 5,
                    "author": "Yu Ang",
                    "releaseTime": "Oct.11th",
                    "text": "master piece work!"
                }
            ]

        },

    ]});
SunMeng.save(function(err){
   // if (err) return handleError(err);
});
