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
    var url = "http://" + req.headers.host + "/v1/artists/" + req.params.id;

    request(url, function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('artist', {
            title: 'Home',
            data: dataGram
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
    var temp = null;
    async.waterfall([
    function (callback) {
                request("http://localhost:3000/v1/artworks/" + artworkId, function (err, response, body) {
                    var artwork = JSON.parse(body);
                    try {
                        temp = artwork[0].contributors[0].id;
                    } catch (err) {}
                    callback(null, artwork);
                });
        },
        function (artwork, callback) {
                // arg1 now equals 'one' and arg2 now equals 'two'

                request("http://localhost:3000/v1/artists/" + temp, function (err, response, body) {
                    var artist = JSON.parse(body);
                    callback(null, artwork, artist);
                });
    }],
        function (err, result, artist) {
            console.log(temp);



            res.render('artwork', {
                title: 'Home',
                data: result,
                data2: artist
            })

        });


});






module.exports = router;
