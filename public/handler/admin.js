var moment = require('moment'),
	handler, 
	home;

index = function(req, res){
	res.render('./admin/index.html');
};


handler = {
	index: index
};

module.exports = handler;