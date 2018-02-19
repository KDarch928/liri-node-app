# liri-node-app

Welcome to the Liri Language Node Application!

Before you begin you will need to open the terminal to the directory where the package.json file resides. Once in the folder you will need to run the command "initi install". This command will install all the necessary packages to use the application. 

This application will allow you to be able to search for Songs, Movies, and read the latest tweets from newCoding. 

# How to use the application:
 

Twitter Search:
-

Enter the command:

- node liri.js my-tweets "twitter username here"

note: if you do not enter a username, then it will default to newCoding. 

Twitter Output:

- Creation Date
- Tweet text

Movies Search:
-

Enter the command:

- node liri.js movie-this "movie name here"

note: If you do not enter a movie name, then the output will default to "Mr. Nobody".

Movie output:

  - Title 
  - Year
  - IMDB Rating
  - Rotten Tomatoes Rating
  - Country
  - Language 
  - Movie Plot 
  - Actors

Spotify Search:
-

Enter command: 

- node liri.js spotify-this-song "song name here"

note: If you do not enter a song name, then the output will default to "The Sign".

Spotify output:

- Artist(s)
- The song's name
- preview link of the song from Spotify
- The album that the song is from

Do What I Say Search:
-

Enter the command:

- node liri.js do-what-it-says

This search will pick a random song name and use the Spotify search the song (See Spotify for the song's output).