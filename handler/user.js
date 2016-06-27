var moment = require('moment'),
	MongoClient = require('mongodb').MongoClient,
	mongoose=require("mongoose"),
	Kafe = require('../model').kafe,
	db,
	user,
	handler,
	home;


MongoClient.connect('mongodb://data:12345@ds023634.mlab.com:23634/tenomed', (err, database) => {
  	if (err) return console.log(err)
  	db = database;
})

home = function(req, res){
	db.collection('data').find().toArray((err, result)=>{
		if(err)return console.log(err);
		res.render('./user/home.html', {datas: result})
	})
};
data_kafe = function(req, res){
	console.log("Dapatkan semua tempat");
	db.collection('data').find().toArray(function(err, result){
		if(err){
			res.send("Error Occurent");
		}else{
			res.json(result);
		}
	})/*
	res.render('./user/detail_tempat.html');*/
};

view_cafe = function(req, res){
	console.log("Dapatkan 1 tempat");
	db.collection('data').findOne({"_id": req.params.id}
		,function(err, result){
			if (err) {
				console.log(err);
			}else{
				res.json(result);
			}
		})
};

lihat_peta = function(req, res){
	var data = [
		{
			lat: 3.597608,
			lng: 98.750229,
			tujuan: "ChIJmbe7_Mo2MTARxpIOmnPC2C0"
		},
		{
			lat: 3.597608,
			lng: 98.750229,
			tujuan: "KAMU"
		}
	];
	res.render('./user/lihat_peta_tempat.html', {data: data});
};


login = function(req, res){
	user = req.session.user || "";
	if (user === 'admin'){
		res.redirect('/admin');
		console.log("telah masuk");
	}
	else
		res.render('./user/login.html');
};

check = function(req, res){
	var username = req.body.username;
	var pass = req.body.password;
	if (username==="admin" && pass==="admin"){
		req.session.user = username;
		req.session.admin = true;
		res.redirect('/admin');

	}else{
		res.redirect('/login');
	};
};

handler = {
	home: home,
	data_kafe: data_kafe,
	lihat_peta: lihat_peta,
	login: login,
	check: check,
	view_cafe: view_cafe
};

module.exports = handler;