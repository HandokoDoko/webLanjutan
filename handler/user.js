var moment = require('moment'),
	user,
	handler,
	home;

home = function(req, res){
	res.render('./user/home.html');
};
detail_tempat = function(req, res){
	res.render('./user/detail_tempat.html');
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
	detail_tempat: detail_tempat,
	lihat_peta: lihat_peta,
	login: login,
	check: check
};

module.exports = handler;