var moment = require('moment'),
	handler, 
	login,
	check;

index = function(req, res){
	res.render('./admin/index.html');
};

handler = {
	index: index
};

module.exports = handler;