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


handler = {
	home: home,
	detail_tempat: detail_tempat,
	lihat_peta: lihat_peta
};

module.exports = handler;