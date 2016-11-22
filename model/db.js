var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */

var Reviews = new  Schema({
    rating: {type: Number, "default": 0, min: 0, max: 5, required: true},
    author: {type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    text: {type: String, required: true}
});
var Picture = new Schema(
    { img:
    { data: Buffer, contentType: String }
    }
);

var Products = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    onSaleStatus:{type: Boolean, "default": false},
    reviews: [Reviews],
});
var Artist = new Schema(
    {

        id: {
            type: String, required: true
        },
        givenname: {
            type: String, requried: true
        },
        lastname: {
            type: String, required: true, unique: true
        },
        gender: {
            type: String, required: true, unique: true
        },
        college: {
            type: String, required: true, unique: true
        },
        country: {
            type: String, required: true, unique: true
        },
        status: {
            type: String, required: true, unique: true
        },
        role: {
            type: String, required: true, unique: true
        },

        products: [Products],
        picture: [Picture]


    });

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/artistsdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('Book', bookSchema);/**
 * Created by YuAng on 2016-11-22.
 */
