var express = require('express'),
	app = express();

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
  res.render('index.html');
});


app.set('view engine', 'html');
app.set('views', __dirname);
app.use('/static', express.static(__dirname + '/static'));

var port = process.env.PORT || 5001;
app.listen(port, function() {
 console.log('Listening on', port);
});