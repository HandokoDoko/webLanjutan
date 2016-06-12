var express = require('express'),
	r = express.Router(),
	h = require('./handler'),
	router;

router = function(app){
	r.get('/', h.home);
	r.get('/cek_lokasi', h.cek_lokasi);
	app.use(r);
};
module.exports = router;