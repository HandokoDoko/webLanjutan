var moment = require('moment'),
	handler, 
	login,
	check;

index = function(req, res){
	res.render('./admin/index.html');
};

login = function(req, res){
	res.render('./admin/login.html');
};

check = function(req, res, next){
	var username = req.body.username;
	var pass = req.body.password;
	var realPass;
	if(username === "admin"){
		if(pass === "admin"){
			req.session.admin = true;
		}
	}
	/*res.sendStatus(401);
	User.where('username',username).fetch()
	.then(function(user){
		realPass = user.get('password');
		if (pass===realPass){
			req.session.user = username;
			if(username==="admin"){
				req.session.admin = true;
			}
			res.redirect('/admin');
		}else{
			res.sendStatus(401);
		};
	}).catch(function(err){
		req.session.admin = true;
		res.redirect('/admin');
		console.log(err);
		res.sendStatus(401);
	}); */
}; 

handler = {
	index: index,
	login:login,
	check:check
};

module.exports = handler;