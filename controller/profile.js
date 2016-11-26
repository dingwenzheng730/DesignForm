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
	var pwd  ;
	var givenname;
	var lastname;
	var email;
	var gender;
	var newArtist = new Artists({
		id:{id},
		pwd:{pwd},
		givenname:{givenname},
		lastname:{lastname},
		gender:{gender},
		email:{email}
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


//----------------Zili 11/24---------------------

exports.getArtistProduct = function(req, res) {
	var targetid = req.params.id;

	Artists.findOne({ id: targetid })
               .populate("products")
               .exec(function(err, artistProducts) {
 		if (err) throw err;
                res.send(artistProducts);
	});

};


exports.addArtistProduct = function(req, res) {
	var targetid = req.params.id;
	var product = new Products(req.body);

	Artists.update(
        	{ _id: targetid }, 
        	{ $push: { products: product } },
        	done
        );
};

