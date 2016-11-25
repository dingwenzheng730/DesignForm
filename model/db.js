var mongoose = require('mongoose');

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/artistsdb');
mongoose.connect('mongodb://localhost/productsdb');

mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
    console.log('Mongoose is now connecting to ' + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error :' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});
