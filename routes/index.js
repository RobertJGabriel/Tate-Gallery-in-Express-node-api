var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');



/**
 * Rend page for Homepage
 * @param {Objects} req 
 * @param {Objects} res
 * @return {none} Json and jade file
 */
router.get('/', function (req, res) {

    async.waterfall([
        function (callback) {
            request("http://" + req.headers.host + "/v1/artists/",
                function (err, response, body) {
                    var artist = JSON.parse(body);
                    callback(null, artist);
                });
        },
        function (artist, callback) {
            try {
                request("http://" + req.headers.host + "/v1/artworks/",
                    function (err, response,
                        body) {
                        var artwork = JSON.parse(body);
                        callback(null, artist, artwork);
                    });
            } catch (err) {}
        }
    ], function (err, artist, artwork) {
        res.render('index', {
            title: "Tate Gallery",
            heading: "Welcome to Tate Gallery ",
            subheading: "Donate £5 today to receive a digital artwork exclusively created by John Baldessari as a ‘thank you’ for donating to the new Tate Modern. Your donation will help go towards funding the new Tate Modern, including workshops and events, school visits and resources to help fulfil our mission to make art accessible to everyone",
            artists: artist,
            artworks: artwork
        })
    });

});




/**
 * Rend page for All Artists
 * @param {Objects} req 
 * @param {Objects} res
 * @return {none} Json and jade file
 */
router.get('/artists', function (req, res) {
    var url = "http://" + req.headers.host + "/v1/artists/";
    request(url, function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('artists', {
            title: 'Home',
            heading: 'All the Artists Tate Gallery',
            subheading: 'Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.',
            data: dataGram
        })
    });
});



/**
 * Rend page for Artist by there Id
 * @param {Objects} req 
 * @param {Objects} res
 * @return {none} Json and jade file
 */
router.get('/artist/:id', function (req, res) {
    var artistId = req.params.id;
    async.waterfall([
        function (callback) {
            request("http://localhost:3000/v1/artists/" + req.params.id,
                function (err, response, body) {
                    var artist = JSON.parse(body);
                    callback(null, artist);
                });
        },
        function (artist, callback) {
            try {
                request("http://localhost:3000/v1/artworks/findartist/" + req.params.id,
                    function (err, response,
                        body) {
                        var artwork = JSON.parse(body);
                        callback(null, artist, artwork);
                    });
            } catch (err) {}
        }
    ], function (err, artist, artwork) {
        res.render('artist', {
            title: artist[0].fc,
            heading: artist[0].fc,
            subheading: "Born " + artist[0].birthYear + " \n\n" + artist[0].totalWorks + " peices of works",
            artists: artist,
            artworks: artwork
        })
    });
});






/**
 * Rend page for All Artworks
 * @param {Objects} req 
 * @param {Objects} res
 * @return {none} Json and jade file
 */
router.get('/artworks', function (req, res) {
    var url = "http://" + req.headers.host + "/v1/artworks/";
    request(url, function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('artworks', {
            title: 'Artworks',
            heading: 'All the Artworks Tate Gallery',
            subheading: 'Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.',
            data: dataGram
        })
    });
});





/**
 * Rend page artworks by id
 * @param {Objects} req 
 * @param {Objects} res
 * @return {none} Json and jade file
 */
router.get('/artworks/:id', function (req, res) {
    var artworkId = req.params.id;
    async.waterfall([

        function (callback) {
            request("http://localhost:3000/v1/artworks/" +
                artworkId,
                function (err, response, body) {
                    var artwork = JSON.parse(body);
                    callback(null, artwork);
                });
        },
        function (artwork, callback) {
            try {
                for (i = 0; i < artwork[0].contributorCount; i++) {
                    request("http://localhost:3000/v1/artists/" +
                        artwork[0].contributors[i].id,
                        function (err, response, body) {
                            var artist = JSON.parse(body);
                            callback(null, artwork, artist);
                        });
                }
            } catch (err) {}
        }
    ], function (err, artwork, artist) {
        res.render('artwork', {
            title: artwork[0].title,
            heading: artwork[0].title,
            subheading: artwork[0].creditLine,
            artwork: artwork,
            artist: artist
        })
    });
});
module.exports = router;
