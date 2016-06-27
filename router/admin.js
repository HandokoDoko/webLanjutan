var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	auth = require('../auth'),
	router;

router = function(app){
	r.get('/admin', auth,h.index);
	r.get('/admin/data_kafe', auth,h.add_kafe);
	app.use(r);
};
module.exports = router;
