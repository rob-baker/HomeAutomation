var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io').listen(http);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(require('./controllers')(io));


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

//load after routers have bound
var db = require('./db');
db.loadDatabase();


http.listen(app.get('port'));
//app.listen(3000);
console.log("doing stuff on " + app.get('port'));
//console.log("DIR:"+__dirname);






