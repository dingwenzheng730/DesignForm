/**
 * Created by YuAng on 2016-11-22.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var Reviews = new  Schema({
    id: {type: Number, required: true},
    rating: {type: Number, "default": 0, min: 0, max: 5, required: true},
    author: {type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    text: {type: String, required: true}
});

var Products = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    releaseTime: {type: Date, "default": Date.now},
    onSaleStatus:{type: Boolean, "default": false},
    reviews: [Reviews]},
    {
        collection: 'products'
    }
);
//mongoose.connect('mongodb://localhost/productsdb');

mongoose.model('Products', Products);
