var moment = require('moment'),
	handler, 
	login,
	check;

index = function(req, res){
	res.render('./admin/index.html');
};
add_kafe = function(req, res){
	res.render('./admin/add_kafe.html');
};
handler = {
	index: index,
	add_kafe: add_kafe
};

module.exports = handler;