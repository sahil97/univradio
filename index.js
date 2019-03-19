const express = require('express');
var path = require('path');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const moment = require('moment');

app.use(express.json());

// app.use(express.bodyParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://meet:meet1234@ds349175.mlab.com:49175/univradio');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

var showSchema = new mongoose.Schema({
  day: String,
  duration:String,
  host:String,
  desc:String
});

var Show = mongoose.model('show', showSchema);
// var Allshows;

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/getshows',(req,res)=>{
  Show.find(function (err, shows) {
    if (err) return console.error(err);
    // console.log(shows);
    res.json(shows);

  })
});

app.post('/api/newshow',(req,res)=>{
  console.log(req.body);
  // console.log(re);
  show = new Show ({host:req.body.host,desc:req.body.desc,day:req.body.date,duration:req.body.dur});
  show.save((err,show)=>{
    if (err) return console.error(err);

  });
  res.json("saved");
});

const PORT = process.env.PORT||3030;

app.listen(PORT,()=>{
  console.log("listening on"+PORT);
})
