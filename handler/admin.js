var moment = require('moment'),
	//fileUpload = require('express-fileupload'),
	MongoClient = require('mongodb').MongoClient,
	mongoose=require("mongoose"),
	Kafe = require('../model').kafe,
	ObjectId = require('mongodb').ObjectId,
	db,
	handler;


MongoClient.connect('mongodb://data:12345@ds023634.mlab.com:23634/tenomed', function(err, database) {
  	if (err) return console.log(err)
  	db = database;
})

index = function(req, res){
	db.collection('data').find().toArray(function(err, result){
		if(err)return console.log(err);
		res.render('./admin/index.html', {datas: result})
	})
	//res.render('./admin/index.html');
};
add_kafe = function(req, res){

	// var pathImage = req.body.gambar || 'img/noImage.gif';
	// console.log(pathImage);

	// pathImage.mv('/img/'+req.body.nama+'.jpg', function(err) {
	// 	if (err) {
	// 		//res.status(500).send(err);
	// 	}
	// 	else {
	// 		console.log('masok 2');
	// 		//res.send('File uploaded!');
	// 		req.gambar = '/img/'+req.nama+'.jpg';
	// 	}
	// });

/*	var pathImage = req.body.gambar || 'img/noImage.gif';
	console.log(pathImage);

	pathImage.mv('/img/'+req.body.nama+'.jpg', function(err) {
		if (err) {
			//res.status(500).send(err);
		}
		else {
			console.log('masok 2');
			//res.send('File uploaded!');
			req.gambar = '/img/'+req.nama+'.jpg';
		}
	});*/

	db.collection('data').save(req.body,function(err, result) {
		if (err) return console.log(err);
		//renders index.ejs
		console.log('saved to database');
		res.redirect('/admin');
	})
};

var deleteKafe = function(req, res){
	console.log(req.params.id);
/*	new User()
	.where({"_id":req.params.id})
	.destroy()
	.then(function(model){
		res.sendStatus(204);
	});*/

	db.collection('data').findOneAndDelete({ "_id" : ObjectId(req.params.id)}, (function(err, result){
		if(err)return console.log(err);
		res.sendStatus(204);
	}))
};

handler = {
	index: index,
	add_kafe: add_kafe,
	deleteKafe : deleteKafe
};

module.exports = handler;