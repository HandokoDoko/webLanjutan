var express = require('express'),
	middleware = require('./middleware'),
	MongoClient = require('mongodb').MongoClient,
	mongoose=require("mongoose"),
	app = express(),
	db;
	
middleware(app);

app.use('/', express.static(__dirname + '/public/assets'));



MongoClient.connect('mongodb://data:12345@ds023634.mlab.com:23634/tenomed', (err, database) => {
  	if (err) return console.log(err);
  	db = database;
	app.set('port', process.env.PORT || 1235);
	app.listen(app.get('port'), function(){
		console.log('Server Hidup Port : ' + app.get('port'));
	});
})


// var databaseUrl = "mongodb://tenomed:12345678@ds023684.mlab.com:23684/tenomed"; 
// var collections = ["tbl_galery","tbl_kafe","tbl_layanan","tbl_makanan","tbl_layanan"];
// db = require("mongojs").connect(databaseUrl, collections);

// mongoose.connect("mongodb://tenomed:12345678@ds023684.mlab.com:23684/tenomed");

