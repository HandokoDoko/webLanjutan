var router = require('./router'),
	nunjucks = require('nunjucks'),
	middleware;

middleware = function(app){
	router(app);
	nunjucks.configure('views',{
		autoescape: true,
		express: app
	});
};


module.exports = middleware;