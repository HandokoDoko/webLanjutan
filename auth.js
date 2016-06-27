function unauthorized(res){
	res.redirect('/login');
};


function auth(req, res, next){
	user = req.session.user || "";
	if (user === 'admin'){
		return next();
	};
	return unauthorized(res);
};

module.exports = auth;