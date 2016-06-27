var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	auth = require('../auth'),
	MongoClient = require('mongodb').MongoClient,
	mongoose=require("mongoose"),
	Kafe = require('../model').kafe,
	db,
	router;


MongoClient.connect('mongodb://data:12345@ds023634.mlab.com:23634/tenomed', (err, database) => {
  	if (err) return console.log(err)
  	db = database;
})

router = function(app){
	r.get('/admin', h.index);
	//r.get('/admin/data_kafe', auth,h.add_kafe);
	r.post('/admin/tambah_kafe',
		(req, res) => {
			db.collection('data').save(req.body,(err, result) => {
				if (err) return console.log(err)
				//renders index.ejs
				console.log('saved to database')
				res.redirect('/admin')
			})
/*
			var newKafe = new Kafe();
			newKafe.nama_kafe = req.body.nama_kafe;
			newKafe.deskripsi = req.body.deskripsi;
			newKafe.alamat = req.body.alamat;
			newKafe.lat = req.body.lat;
			newKafe.lng = req.body.lng;
			newKafe.img = req.body.gambar;
			newKafe.type = "kafe";

			newKafe.save(function(err, kafe){
				if(err){
					res.send("Error Saving Kafe");
				}else{
					console.log(kafe);
					res.send(kafe);
				}
			});*/
	});
	app.use(r);
};
module.exports = router;
