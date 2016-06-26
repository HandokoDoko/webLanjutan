var moment = require('moment'),
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
	res.render('./user/login.html');
};

check = function(req, res, next){
	var username = req.body.username;
	var pass = req.body.password;
	var realPass;
	if(username === "admin"){
		if(pass === "admin"){
			req.session.admin = true;
			res.re
		}
	}
	/*res.sendStatus(401);
	User.where('username',username).fetch()
	.then(function(user){
		realPass = user.get('password');
		if (pass===realPass){
			req.session.user = username;
			if(username==="admin"){
				req.session.admin = true;
			}
			res.redirect('/admin');
		}else{
			res.sendStatus(401);
		};
	}).catch(function(err){
		req.session.admin = true;
		res.redirect('/admin');
		console.log(err);
		res.sendStatus(401);
	}); */
}; 



handler = {
	home: home,
	detail_tempat: detail_tempat,
	lihat_peta: lihat_peta,
	login: login,
	check: check
};

module.exports = handler;