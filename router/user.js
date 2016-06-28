var express = require('express'),
	r = express.Router(),
	h = require('../handler').user,
	router;

router = function(app){

	r.get('/', h.home);
	r.get('/detail_tempat', h.data_kafe);
	r.get('/detail_tempat/:id', h.view_cafe);
	//r.get('/lihat_peta', h.lihat_peta);
	r.get('/lihat_peta/:id', h.lihat_peta);
	r.get('/login',h.login);

	r.get('/logout', function (req, res) {
		req.session.user = "";
	  res.redirect('/');
	});

	r.post('/check', h.check);

	r.get('/.', function(req, res){
		res.send('404: Page not Found', 404);
	})

	app.use(r);
};
module.exports = router;