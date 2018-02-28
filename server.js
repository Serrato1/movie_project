const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const path = require('path');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res){
  knex('movies').then((data)=> {
    data = data.sort((a,b)=>{
      a.title = a.title.toLowerCase();
      b.title = b.title.toLowerCase();
      return b.title.charAt(0)  -  a.title.charAt(0)
    })
    res.render('movies', {movies:data, dir: __dirname + '/style/main.css'});
  })
});
app.get('/form', function (req, res){
  res.render('new_movie',{});
});
app.post('/create_movie',function(req,res){
  knex('movies').insert({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
  })
  .then(()=>{
    res.redirect('/')
  })
})

app.post('/', function(req, res) {
  knex('movies').insert({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    vote_count: parseInt(1)
  }).then(()=>{
    res.redirect('/')
  })
});

app.get('/upvote/:movie_id/:current_votes',function(req,res){
  knex('movies')
  .where('movies.id','=',`${req.params.movie_id}`)
  .update({
    vote_count : (parseInt(req.params.current_votes) + 1)
  })
  .then(()=>{
    res.redirect('/')
  })
})
app.get('/downvote/:movie_id/:current_votes',function(req,res){
  knex('movies')
  .where('movies.id','=',`${req.params.movie_id}`)
  .update({
    vote_count : (parseInt(req.params.current_votes) - 1)
  })
  .then(()=>{
    res.redirect('/')
  })
})


app.listen(port, function () {
  console.log("running on port:", port);
});
