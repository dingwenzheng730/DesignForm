/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Picture = new Schema({
    img:
        { data: Buffer, contentType: String }
});
var Reviews = new  Schema({
    reviewID: {type: Number, required: true, unique: true},
    rating: {type: Number, "default": 0, min: 0, max: 5, required: true},
    author: {type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    text: {type: String, required: true}
});
var Product = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    image:Picture,
    onSaleStatus:{type: Boolean, "default": false},
    reviews:[Reviews]},
    {
        collection: 'products'
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
            type: String, required: true
        },
        gender: {
            type: String, required: true
        },
        email: {
            type: String,unique: true
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

        products: [Product],
        picture: Picture
        },

    {
        collection: 'artists'
    }
);


mongoose.connect('mongodb://localhost/artistsdb');

var findOrCreate = require('mongoose-findorcreate');
Artist.plugin(findOrCreate);
module.exports = mongoose.model('Products', Product);
module.exports = mongoose.model('Reviews', Reviews);

module.exports = mongoose.model('Artists', Artist);
 
