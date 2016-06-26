var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	router;

router = function(app){
	r.get('/admin', h.login);
	r.post('/check', h.check);
	app.use(r);
};
module.exports = router;
