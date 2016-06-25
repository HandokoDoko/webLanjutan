var router = require('./router'),
	//bodyParser = require('body-parser'),
	nunjucks = require('nunjucks'),
	express = require('express'),
	session = require('express-session'),
	//uuid = require('uuid'),
	//RedisStore = require('connect-redis')(session),
	//redisClient = require('redis').createClient(),
	//dateFilter = require('nunjucks-date-filter'),
	middleware;

middleware = function(app){
	//app.use(express.static('public'));
	//app.use(bodyParser.urlencoded({extended: true}));
	app.use(session({
		store: new RedisStore({
			client: redisClient,
			host: '127.0.0.1',
			port: 6379
		}),
		genid: function(req){
			return uuid.v1();
		},
		secret: "Secret String"
	}));
	router(app);
	nunjucks.configure('templates',{
		autoescape: true,
		express: app
	});
};


module.exports = middleware;