var moment = require('moment'),
	MongoClient = require('mongodb').MongoClient,
	mongoose=require("mongoose"),
	Kafe = require('../model').kafe,
	db,
	handler, 
	login,
	check;

MongoClient.connect('mongodb://data:12345@ds023634.mlab.com:23634/tenomed', (err, database) => {
  	if (err) return console.log(err)
  	db = database;
})

index = function(req, res){
	res.render('./admin/index.html');
};
add_kafe = function(req, res){
	db.collection('data').save(req.body,(err, result) => {
		if (err) return console.log(err);
		//renders index.ejs
		console.log('saved to database');
		res.redirect('/admin');
	})
};

handler = {
	index: index,
	add_kafe: add_kafe
};

module.exports = handler;