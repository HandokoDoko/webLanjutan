var express = require('express'),
	middleware = require('./middleware'),
	MongoClient = require('mongodb').MongoClient,
	mongoose=require("mongoose"),
	fileUpload = require('express-fileupload'),
	app = express(),
	db;
	
middleware(app);

app.use(fileUpload());

app.use('/', express.static(__dirname + '/public/assets'));


MongoClient.connect('mongodb://data:12345@ds023634.mlab.com:23634/tenomed', (err, database) => {
  	if (err) return console.log(err);
  	db = database;
	app.set('port', process.env.PORT || 1235);
	app.listen(app.get('port'), function(){
		console.log('Server Hidup Port : ' + app.get('port'));
	});
})

// app.set('port', process.env.PORT || 1235);
// 	app.listen(app.get('port'), function(){
// 		console.log('Server Hidup Port : ' + app.get('port'));
// 	});


