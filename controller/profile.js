/**
 * Created by YuAng on 2016-11-22.
 */

//------------------Ziyao 2016-11-24----------------------------

var Artists = require('../model/artists.js');

exports.getById = function(req, res) {

	var targetid = req.query.id;

	Artists.findOne({ id: targetid }, function(err, artist) {
 		if (err) throw err;

  		res.send(artist);
	});
};

exports.addArtist = function(req, res) {

	var id = req.query.id;
	var newArtist = new Artists({

	});

	newArtist.save(function(err){
		if (err) throw err;
	});
};

exports.getArtistBylastname = function(req, res) {
	var targetlastname = req.query.lname;

	Artists.findOne({ lastname: targetlastname }, function(err, artist) {
 		if (err) throw err;

  		res.send(artist);
	});

};

exports.getArtistByCountry = function(req, res) {
	var targetcountry = req.query.country;

	Artists.find({ country: targetcountry }, function(err, artist) {
 		if (err) throw err;

  		res.send(artist);
	});
}

//-----------------2016-11-24-------------------------------------------
