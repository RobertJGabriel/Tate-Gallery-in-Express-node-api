#Tate Gallery In Node

Using the likes of Node, express, angular.js and mongodb.


## Contents

* /public - static directories suchs as /images
* /routes - route files for tutorial project
* /views - views for tutorial project
* README.md - this file
* server.js - central app file for tutorial project
* package.json - package info for tutorial project



## import

1. mongod --dbpath /Users/robertgabriel/Documents/College/Advanced_Javascript/tategallery/data 
2. mongoimport --db assesstment --collection artworks --drop --file /Users/robertgabriel/Documents/College/Advanced_Javascript/tategallery/public/json/artworks.json
3. mongoimport --db assesstment --collection artists --drop --file /Users/robertgabriel/Documents/College/Advanced_Javascript/tategallery/public/json/artists.json