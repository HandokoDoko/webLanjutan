var router = require('./router'),
	bodyParser = require('body-parser'),
	nunjucks = require('nunjucks'),
	express = require('express'),
	session = require('express-session'),
	uuid = require('uuid'),
	dateFilter = require('nunjucks-date-filter'),
	middleware;

middleware = function(app){
	//localStoreage = new LocalStoreage('./scratch');
	app.use(express.static('public'));
	app.use(function(err, req, res, next) {
	  // Do logging and user-friendly error message display
	  console.error(err);
	  res.status(500).send();
	});
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(session({
		genid: function(req){
			return uuid.v1();
		},
		secret: "Secret String"
	}));
	router(app);
	
	nunjucks.configure('templates',{
		autoescape: true,
		express: app
	}).addFilter('date', dateFilter);
};


module.exports = middleware;