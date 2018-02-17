require("dotenv").config();

var keys = require("./key.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var usrRequest = process.argv;

var type = "";
var searchReq = "";


//for loop for parsing through the argument and setting them up to be used.
for (var i = 2; i < usrRequest.length; i++) {

    if( i > 2) {
        switch (type) {
            case "spotify-this-song":
                if (i > 3){
                    searchReq += " " + usrRequest[i];
                } else {
                    searchReq += usrRequest[i];
                }
                break;
            case "movie-this":
                if (i > 3) {
                    searchReq += "+" + usrRequest[i];
                } else {
                    searchReq += usrRequest[i];
                }
                break;
            default:
        }
    } else {
        type = usrRequest[i];
    }

}


//function to check song argument
function checkSongArg(songName) {
    var defaultName = "The Sign"; //default song name

    //if songname is empty set the songNam with a default song
    if(songName === ""){
        return defaultName;
    } else {
        return songName;
    }
}

function buildCreationDate(dat) {
    return    dat[0] + " " + dat[1] + " " + dat[2] + " " + dat[5] + " " +  dat[3];
}

//functions that get your tweets
function getTweets() {
    var params = { screen_name: 'newCoding' };
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (!error) {

            console.log("Your Tweets");
            console.log("================================");
            for (var i = 0; i < tweets.length; i++){
                var d = tweets[i].created_at;
                var dat = d.split(" ");
                var created = buildCreationDate(dat);
                console.log("Created: " + created);
                console.log("Tweet: "  + tweets[i].text);
                console.log("------------------------------");
            }
        }
    });
}

//function perform the spotify search
function searchSpotify(song) {

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Song Search: " + song);
        console.log("=================================");

        var songArrLength = data.tracks.items.length;

        for (var i = 0; i < songArrLength; i++ ) {
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Preview URL: " + data.tracks.items[i].preview_url);
            for (var j = 0; j < data.tracks.items[i].artists.length; j++){
                console.log("Artist: " + data.tracks.items[i].artists[j].name);
            }
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("--------------------------------");
        }

    });
}


//fuction perform the move request search
function searchMovie(movie) {
    // Then run a request to the OMDB API with the movie specified
    request(movie, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Movie Title: " +  JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
    });
}

function readData() {
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then re-display the content as an array for later use.
        searchSpotify(data);

    });
}


switch (type) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        var songNam = checkSongArg(searchReq);
        searchSpotify(songNam);
        break;
    case "movie-this":
        var urlMoviesarch = "http://www.omdbapi.com/?t=" + searchReq + "&y=&plot=short&apikey=trilogy"
        searchMovie(urlMoviesarch);
        break;
    case "do-what-it-says":
        readData();
        break;
    default:
}
