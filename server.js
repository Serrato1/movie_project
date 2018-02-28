const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 1313;
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res){
  knex('movies').then((data)=> {
    res.render('movies', {Movies:data})
  })
});

app.post('/', function(req, res) {
  knex('movies').insert({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,

  }).then(()=>{
    res.redirect('/')
  })
});


app.listen(port, function () {
  console.log("running on port:", port);
});
