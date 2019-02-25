const express = require('express');
var path = require('path');
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

app.use('/public', express.static(path.join(__dirname, 'public')));
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
    console.log(shows);
    res.json(shows);

})
});

const PORT = process.env.PORT||3030;

app.listen(PORT,()=>{
  console.log("listening on"+PORT);
})
