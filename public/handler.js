var moment = require('moment'),
	handler, 
	home;

home = function(req, res){
	res.render('home.html');
};
detail_tempat = function(req, res){
	res.render('detail_tempat.html');
};
lihat_peta = function(req, res){
	res.render('lihat_peta_tempat.html');
};


handler = {
	home: home,
	detail_tempat: detail_tempat,
	lihat_peta: lihat_peta
};

module.exports = handler;