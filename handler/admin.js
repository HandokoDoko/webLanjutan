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

	db.collection('data').findOneAndDelete({ "_id" : ObjectId(req.params.id)}, (function(err, result){
		if(err)return console.log(err);
		res.sendStatus(204);
	}))
};

var deleteMenu = function(req, res){
	console.log(req.params.id);

	db.collection('data').findOneAndDelete({ "_id" : ObjectId(req.params.id)}, (function(err, result){
		if(err)return console.log(err);
		res.sendStatus(204);
	}))
};

var editKafe = function(req, res){
	db.collection('data').findOne(
	{
		"_id": ObjectId(req.params.id)

	},function(err, result){
			if (err) return res.send("Error Occurent");
			else{
				var data = result;
				res.render('./admin/edit.html', {kafe: data})
	//			res.sendStatus(204);
			}
	});
	//res.sendStatus(204);
};

var edit = function(req,res){
	db.collection('data')
	  .findOneAndUpdate({ "_id" : ObjectId(req.body.id)}, {
	    $set: {
	        nama: req.body.nama,
      		deskripsi : req.body.deskripsi,
      		alamat : req.body.alamat,
      		lat : req.body.lat,
      		lng : req.body.lng,
      		gambar : req.body.gbr
	    }
	  }, {
	    sort: {_id: -1},
	    upsert: true
	  }, function(err, result)  {
	    if (err) return res.send(err);
	    console.log(result);
	    res.redirect('/admin');
	  })
};

var detailKafe = function(req, res){
	db.collection('data').findOne(
	{
		"_id": ObjectId(req.params.id)

	},function(err, result){
			if (err) return res.send("Error Occurent");
			else{
				var data  = result;
				db.collection('data').find().toArray(function(err, result){
					if(err)return console.log(err);
					res.render('./admin/detailKafe.html', {kafe : data,datas : result})
				})
	//			res.sendStatus(204);
			}
	});
}

var addMenu = function(req,res){
	db.collection('data').findOne(
	{
		"_id": ObjectId(req.params.id)

	},function(err, result){
			if (err) return res.send("Error Occurent");
			else{
				var data = result;
				res.render('./admin/addMenu.html', {kafe: data})
	//			res.sendStatus(204);
			}
	});
}

submitMenu = function(req, res){
	db.collection('data').save(req.body,function(err, result) {
		if (err) return console.log(err);
		//renders index.ejs
		console.log('saved to database');
		res.redirect('/admin/detail/'+ req.body.idKafe);
	})
};

handler = {
	index: index,
	add_kafe: add_kafe,
	deleteKafe : deleteKafe,
	editKafe : editKafe,
	edit:edit,
	detailKafe : detailKafe,
	addMenu : addMenu,
	submitMenu : submitMenu,
	deleteMenu : deleteMenu
};

module.exports = handler;