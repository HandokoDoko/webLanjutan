var moment = require('moment'),
	handler, 
	home;

home = function(req, res){
	res.render('home.html');
};
cek_lokasi = function(req, res){
	res.render('cek_lokasi.html');
};


handler = {
	home: home,
	cek_lokasi: cek_lokasi
};

module.exports = handler;