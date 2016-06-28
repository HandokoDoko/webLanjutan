var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	auth = require('../auth'),
	router;

router = function(app){
	r.get('/admin', h.index);
	//r.get('/admin/data_kafe', auth,h.add_kafe);
	r.post('/admin/tambah_kafe', h.add_kafe);
	r.delete('/admin/:id', h.deleteKafe);
	app.use(r);
};
module.exports = router;
