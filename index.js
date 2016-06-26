var express = require('express'),
	middleware = require('./middleware'),
	MongoClient = require('mongodb').MongoClient,
	app = express();
	
middleware(app);

app.use('/', express.static(__dirname + '/public/assets'));



MongoClient.connect('mongodb://tenomed:12345678@ds023684.mlab.com:23684/tenomed', (err, database) => {
  	if (err) return console.log(err)
  	db = database
  	app.set('port', process.env.PORT || 1235);
	app.listen(app.get('port'), function(){
		console.log('Server Hidup Port : ' + app.get('port'));
	});
})
