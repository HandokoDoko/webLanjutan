function unauthorized(res){
	return res.sendStatus(401);
};

function auth(req, res, next){
	if (typeof req.session.user !== 'undefined'){
		return next();
	};
	res.unauthorized(res);
};

module.exports = auth;