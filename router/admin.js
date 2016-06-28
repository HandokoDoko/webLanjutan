var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	auth = require('../auth'),
	router;

router = function(app){
	r.get('/admin', h.index);
	//r.get('/admin/data_kafe', auth,h.add_kafe);
	r.post('/admin/tambah_kafe', h.add_kafe);
	//r.ed
	r.delete('/admin/:id', h.deleteKafe);
	//r.post('/admin/tambah_kafe', auth, h.add_kafe);
	r.get('/admin/edit/:id', h.editKafe);
	r.post('/admin/edit',h.edit);
	r.get('/admin/detail/:id',h.detailKafe);
	r.get('/admin/addMenu/:id',h.addMenu);
	r.post('/admin/submitMenu',h.submitMenu);
	app.use(r);
};
module.exports = router;
