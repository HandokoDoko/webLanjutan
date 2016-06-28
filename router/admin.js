var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	auth = require('../auth'),
	router;

router = function(app){
	r.get('/admin', auth, h.index);
	//r.get('/admin/data_kafe', auth,h.add_kafe);
	r.post('/admin/tambah_kafe', auth, h.add_kafe);
	//r.ed
	r.delete('/admin/:id', auth, h.deleteKafe);
	//r.post('/admin/tambah_kafe', auth, h.add_kafe);
	r.get('/admin/edit/:id',auth, h.editKafe);
	r.post('/admin/edit',auth, h.edit);
	r.get('/admin/detail/:id',auth, h.detailKafe);
	r.get('/admin/addMenu/:id',auth, h.addMenu);
	r.post('/admin/submitMenu',auth, h.submitMenu);
	r.get('/admin/edit/:id', auth, h.editKafe);
	r.post('/admin/edit', auth, h.edit);
	app.use(r);
};
module.exports = router;
