const express = require('express');
var app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://meet:meet1234@ds349175.mlab.com:49175/univradio');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

var showSchema = new mongoose.Schema({
  day: String,
  time:String,
  host:String,
  desc:String
});

var Show = mongoose.model('show', showSchema);
// var Allshows;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/",(req,res)=>{
  res.send("Sample data");
});

app.get('/api/getshows',(req,res)=>{
  Show.find(function (err, shows) {
    if (err) return console.error(err);
    console.log(shows);
    res.json(shows);

})
});

app.listen('3030',()=>{
  console.log("listening on 3030");
})
