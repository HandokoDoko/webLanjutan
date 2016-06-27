function unauthorized(res){
	res.redirect('/login');
};

function auth(req, res, next){
	if (typeof req.session.user !== 'undefined'){
		return next();
	};
	res.unauthorized(res);
};

module.exports = auth;