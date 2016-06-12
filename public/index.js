var express = require('express'),
	middleware = require('./middleware'),
	app = express();
	
middleware(app);

app.use('/', express.static(__dirname + '/css'));
app.use('/', express.static(__dirname + '/img'));
app.use('/', express.static(__dirname + '/js'));
app.use('/', express.static(__dirname + '/fonts'));
app.use('/', express.static(__dirname + '/font-awesome'));

app.set('port', process.env.PORT || 1234);
app.listen(app.get('port'), function(){
	console.log('Server Hidup Port : ' + app.get('port'));
});