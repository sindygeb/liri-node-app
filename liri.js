require("dotenv").config();
var keys = require("./keys.js");

//required npms
var moment = require('moment');
var axios = require("axios");
var fs = require('fs');
var dotenv = require('dotenv');

//spotify npm & keys
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var inputString = process.argv[2];
var inputParam = process.argv.slice(3).join(" ");

function concertThis() {
	var artistName = inputParam;

	console.log("The next show for " + inputParam + " is...");
	//concert info
	axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp&date=upcoming").then(
		function(response) {
			
			if (response != undefined) {
			
			console.log('=============== Concert Info ================');
			console.log("VENUE: " + response.data[0].venue.name);
			console.log("CITY/STATE: " + response.data[0].venue.city + ", " + response.data[0].venue.region);

			var oldTime = response.data[0].datetime
			var newTime = moment(oldTime).format("l");
			console.log("TIME: " + newTime);
			console.log('============= Pretty Cool Show. =============');
			
			}
			
			else {
				console.log("Sorry, " + inputParam + "doesn't have any upcoming shows.");
			}
		}
	);
};

function findSong() {

	var songName = inputParam;

	//If no song is provided then your program will default to "The Sign" by Ace of Base
	//I had to go find "The Sign" by Ace of Base - it was result 10, so I added it using array 9.
	//Otherwise I was getting a song from the Spider-man: Into the Spiderverse movie.
	//This problem did NOT happen with OMDB.
	if (songName === "") {
		songName = "The Sign";
		
		spotify.search({ type: 'track', query: songName, limit: 10  }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}

			var aceOBase = data.tracks.items[9];

			console.log("ARTIST: " + aceOBase.album.artists[0].name + "\nSONG: " + aceOBase.name + "\nPREVIEW SONG: " + aceOBase.preview_url + "\nALBUM: " + aceOBase.album.name);
		}	
	)} else {
		spotify.search({ type: 'track', query: songName, limit: 1  }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
			console.log('=============== Song Info ================');
			console.log(
				"ARTIST: " + data.tracks.items[0].album.artists[0].name + 
				"\nSONG: " + data.tracks.items[0].name + 
				"\nPREVIEW SONG: " + data.tracks.items[0].preview_url + 
				"\nALBUM: " + data.tracks.items[0].album.name);
			console.log('=============== Neat Song! ===============');
		});
	};
};

function findMovie() {
	var movieName = inputParam;

	if (movieName == "") {
		movieName = "Mr. Nobody";
	}

	axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=96586bdf&t=" + movieName).then(
		function(response) {
			console.log('================ Movie Info ================');
			console.log(
				"TITLE: " + response.data.Title +
				"\nYEAR: " + response.data.Year +
				"\nIMDB RATING: " + response.data.Ratings[0].Value +
				"\nROTTEN TOMATOES RATING: " + response.data.Ratings[1].Value +
				"\nCOUNTRY WHERE PRODUCED: " + response.data.Country +
				"\nLANGUAGE: " + response.data.Language +
				"\nPLOT: " + response.data.Plot +
				"\nACTORS: " + response.data.Actors);
			console.log('================ Cool Movie. ================');

		}
	)
};

function doItNow() {

	fs.readFile("random.txt", "utf8", function(error, data) {
		if (!error) {

			var nameArr = data.split(",");

			console.log("This is what you're pulling: " + nameArr);

			newSong = nameArr[1];

			spotify.search({ type: 'track', query: newSong, limit: 1  }, function(err, data) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}
				console.log('=============== Song Info ================');
				console.log(
					"ARTIST: " + data.tracks.items[0].album.artists[0].name + 
					"\nSONG: " + data.tracks.items[0].name + 
					"\nPREVIEW SONG: " + data.tracks.items[0].preview_url + 
					"\nALBUM: " + data.tracks.items[0].album.name);
				console.log('=============== Neat Song! ===============');
			});
		}
	});

};

//if the input is concert-this
if (inputString === "concert-this"){
	concertThis();
	
//if the input is spotify-this-song
} else if (inputString === "spotify-this-song") {
	findSong();

//if the input is movie-this
} else if (inputString === "movie-this") {
	findMovie();

//If the input is that rando one
} else if (inputString === "do-what-it-says") {
	doItNow();
};