var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {

 var url = "http://" + req.headers.host +"/v1/artists/";

    request(url , function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('index', {
            title: 'Home',
            data: dataGram
        })
    });
});


/* GET home page. */
router.get('/artists', function(req, res) {
  var url = "http://" + req.headers.host + "/v1/artists/";

    request(url , function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('index', {
            title: 'Home',
            data: dataGram
        })
    });
});




/* GET home page. */
router.get('/artist/:id', function(req, res) {
 var url = "http://" + req.headers.host +"/v1/artists/" + req.params.id;

    request(url , function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('artist', {
            title: 'Home',
            data: dataGram
        })
    });
});

/* GET home page. */
router.get('/artworks', function(req, res) {
 var url = "http://" + req.headers.host +"/v1/artworks/" ;

    request(url , function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('artworks', {
            title: 'Home',
            data: dataGram
        })
    });
});



/* GET home page. */
router.get('/artworks/:id', function(req, res) {
  var url = "http://" + req.headers.host +"/v1/artworks/" + req.params.id;

    request(url , function (err, response, body) {
        var dataGram = JSON.parse(body);
        res.render('artwork', {
            title: 'Home',
            data: dataGram
        })
    });
});




module.exports = router;
