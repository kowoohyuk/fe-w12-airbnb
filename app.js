const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use(express.static(__dirname + '/dist'));
app.get('/', function (req, res) {
  res.render('index.html');
});
app.get('/index', function (req, res) {
  res.render('index.html');
});

app.listen(3000);