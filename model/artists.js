/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');
var crypto = require('crypto');
var Products = require('../model/products.js');


var Picture = new Schema(
    { img:
    { data: Buffer, contentType: String }
    }
);

var Artist = new Schema(
    {
        id: {
            type: String, required: true
        },
        pwd: {
            type: String, required: true
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
        college: {
            type: String, required: true,
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

        products: [Products],
        picture: [Picture],
        hash: String,
        salt: String

    });
var Artists = new Schema(
    {

        artist: [Artist]
    });


Artists.plugin(findOrCreate());
mongoose.model('Artists', Artists);