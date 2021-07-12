var express = require('express');
const mongoose = require("mongoose");

//Set up default mongoose connection
let mongoDB = 'mongodb://127.0.0.1:27017/myMoviesLibrary';

let app = express();
app.use(express.urlencoded())
app.use(express.json())

//Set up default mongoose connection
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
let db = mongoose.connection;

//Connected to database
db.once("open", function() {
	console.log("Connection Successful!");
});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var schema = mongoose.Schema({
	name: String,
});

let Model = mongoose.model("movies", schema, "movies-list");

app.get('/', (req, res) => {
	db.collection("movies-list").find({}).toArray(function(err, result) {
		if (err) throw err;
		db.close();
		res.send(result);
	});	
});

app.post('/', function (req, res) {
	
	let body = req.body;	
	var movies = new Model(body);

	movies.save((err, movie) => {
		if (err) console.error(err);
  		console.log("Document inserted succussfully!");
		res.status(200).send('Added: ' + movie);
	});
      });
    
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});