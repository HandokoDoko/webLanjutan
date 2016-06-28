var express = require('express'),
	r = express.Router(),
	h = require('../handler').admin,
	auth = require('../auth'),
	router;

router = function(app){
	r.get('/admin', auth, h.index);
	//r.get('/admin/data_kafe', auth,h.add_kafe);
<<<<<<< HEAD
	r.post('/admin/tambah_kafe', h.add_kafe);
	r.delete('/admin/:id', h.deleteKafe);
=======
	r.post('/admin/tambah_kafe', auth, h.add_kafe);
	
>>>>>>> d224ac97fecfc9af18542dba630e2c7cb34d2c3d
	app.use(r);
};
module.exports = router;
