/*
* Express server running at http://localhost:3000
* TODO: add routing
* */

var express = require('express');
var firebaseRequestHandler = require('./middleware/authFirebase');
var listController = require('./lists/listController.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/smart-shopping');

listController.createUser();

app.use(bodyParser.json());
//static files will be served from the public directory

var firebaseAuth = require('./middleware/authFirebase');
var session = require('express-session');
var app = express();


app.use(function (req, res, next) {
  var ts = new Date();
  console.log(req.url + ' - ' + req.method);
  console.log('Time:', ts);
  next();
});


app.use(express.static(__dirname + '/../public'));

app.get('/api/list', listController.getList);
app.post('/api/item/add', listController.addItem); 

//creates sessions 
app.use(session({
  secret: 'savage tadpole',
  resave: false,
  saveUninitialized: true
}))

//static files will be served from the public directory
app.use(express.static('public'));



//server is listening on port 3000
var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Smart Shopping listening at http://localhost:%s', port);
});
