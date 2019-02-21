# The LIRI Bot

## What is it?

This is LIRI, an app that runs like iPhone's SIRI. LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Commands for LIRI

### concert-this

Typing in this command, followed by the band or artist's name will display these results:

+ Name of the venue
+ Venue location (City/State)
+ Date of the event

The command pulls in the Bands in Town API using Axios. The Date is formatted in MM/DD/YYYY using moment.js.

### movie-this

Typing in this command, follwed by the title of a movie will display these results:

+ Title of the movie
+ Year the movie came out
+ IMDB Rating of the movie.
+ Rotten Tomatoes Rating of the movie.
+ Country where the movie was produced.
+ Language of the movie.
+ Plot of the movie.
+ Actors in the movie.

The command pulls in the OMDB API using Axios. 
If there is no entry, the default shown is "Mr. Nobody".

### spotify-this-song

Typing in this command, followed by a song title, will display these results:

+ Artist(s)
+ The song's name
+ A preview link of the song from Spotify
+ The album that the song is from

This command pulls from the npm node-spotify-api, which was added to the JSON package.
If there is no entry, the defauly shown is "The Sign" by Ace of Base.

### do-what-it-says

This command pulls in information from the random.txt file, and passes it through the command line, using fs.


