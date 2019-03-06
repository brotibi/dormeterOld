/*
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false});

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
});

app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/home', function(req, res){
  res.render('index');
});

app.get('/register', function(req, res){
  res.render('register');
});

app.get('/profile', function(req, res){
  res.render('profile');
});

app.get('/profile/:name', function(req, res) {
  console.log(req.query);
  res.render('profile',{username: req.params.name});
});

app.listen(3000);
