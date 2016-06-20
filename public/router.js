var express = require('express'),
	r = express.Router(),
	h = require('./handler'),
	router;

router = function(app){
	r.get('/', h.home);
	r.get('/detail_tempat', h.detail_tempat);
	r.get('/lihat_peta', h.lihat_peta);
	app.use(r);
};
module.exports = router;