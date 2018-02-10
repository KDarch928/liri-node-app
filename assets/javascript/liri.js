require("dotenv").config();

var spotify = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var request = process.argv[2];
var song = process.argv[3];

var defaultSong = "The Sign";

console.log(request);
