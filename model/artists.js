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

        products: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
        picture: [{ type: Schema.Types.ObjectId, ref: 'Picture' }]},


    {
        collection: 'artists'
    }
    );

mongoose.connect('mongodb://localhost/artistsdb');



mongoose.model('Artist', Artist);
