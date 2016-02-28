var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');





/* GET home page. */
router.get('/', function (req, res) {

    var url = "http://" + req.headers.host + "/v1/artists/";

    request(url, function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('index', {
            title: 'Home',
            data: dataGram
        })
    });
});


/* GET home page. */
router.get('/artists', function (req, res) {
    var url = "http://" + req.headers.host + "/v1/artists/";

    request(url, function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('index', {
            title: 'Home',
            data: dataGram
        })
    });
});




/* GET home page. */
router.get('/artist/:id', function (req, res) {

    var artistId = req.params.id;
    async.waterfall([
    function (callback) {
                request("http://localhost:3000/v1/artists/" + req.params.id, function (err, response, body) {
                    var artist = JSON.parse(body);

                    callback(null, artist);
                });
        },
            function (artist, callback) {
                try {
                    console.log(artist);
                    request("http://localhost:3000/v1/artworks/findartist/" + req.params.id, function (err, response, body) {
                        var artwork = JSON.parse(body);
                        callback(null, artist, artwork);
                    });

                } catch (err) {}
}
              ],
        function (err, artist, artwork) {
            res.render('artist', {
                title: 'Home',
                data: artist,
                data2: artwork
            })
        });








});









/* GET home page. */
router.get('/artworks', function (req, res) {
    var url = "http://" + req.headers.host + "/v1/artworks/";

    request(url, function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('artworks', {
            title: 'Home',
            data: dataGram
        })
    });
});





/* GET home page. */
router.get('/artworks/:id', function (req, res) {
    var artworkId = req.params.id;
    async.waterfall([
    function (callback) {
                request("http://localhost:3000/v1/artworks/" + artworkId, function (err, response, body) {
                    var artwork = JSON.parse(body);
                    callback(null, artwork);
                });
        },
        function (artwork, callback) {
                try {
                    for (i = 0; i < artwork[0].contributorCount; i++) {
                        request("http://localhost:3000/v1/artists/" + artwork[0].contributors[i].id, function (err, response, body) {
                            var artist = JSON.parse(body);
                            callback(null, artwork, artist);
                        });
                    }

                } catch (err) {}

    }],
        function (err, result, artist) {
            res.render('artwork', {
                title: 'Home',
                data: result,
                data2: artist
            })

        });
});






module.exports = router;
