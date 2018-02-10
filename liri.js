require("dotenv").config();

var keys = require("./key.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var request = process.argv[2];
var song = process.argv[3];

//function to check song argument
function checkSongArg(songName) {
    var defaultName = "The Sign"; //default song name

    //if songname is empty set the songNam with a default song
    if(songName == null){
        return defaultName;
    } else {
        return songName;
    }
}

//functions that get your tweets
function getTweets() {
    var params = { screen_name: 'newCoding' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(JSON.stringify(tweets, null, 2));
            console.log(tweets.length);
        }
    });
}

var songNam = checkSongArg(song);



switch (request) {
    case "my-tweets":
        console.log("Tweet");
        getTweets();
        break;
    case "spotify-this-song":
        console.log("Song");
        break;
    case "movie-this":
        console.log("Movie");
        break;
    case "do-what-it-says":
        console.log("Say What?");
    default:
}
