var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	router;

router = function(app){
	r.get('/admin', h.index);
	r.get('/admin/data_kafe', h.add_kafe);
	app.use(r);
};
module.exports = router;
