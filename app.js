// 1. server.js
const fs = require('fs');
var express = require('express');
var app = express();
app.use(express.urlencoded())
app.use(express.json())

app.post('/', function (req, res) {
	res.status(200).send('Add movies');
	let movies = req.body;	
	fs.readFile('movies-library.json', 'utf8', function(err, data) {
	      if (err) throw err;
	      let moviesList = JSON.parse(data);
	      moviesList.push(movies);
	      fs.writeFileSync("movies-library.json", JSON.stringify(moviesList));
	});
      });
    
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});