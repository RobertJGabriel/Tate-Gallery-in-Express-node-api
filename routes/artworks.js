var express = require('express');
var router = express.Router();



/**
 * Get All Artworks from the database
 * @param {Objects} req 
 * @param {Objects} res 
 * @return {none} none
 */
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('artworks');
    var limitArtwork = 10;

    collection.find({}, {
        limit: limitArtwork,
        skip: Math.random()
    }, function (e, docs) {
        res.json(docs);
    });
});



/**
 * Get Artwork by Id
 * @param {Objects} req 
 * @param {Objects} res 
 * @param {int} artworkId 
 * @return {none} none
 */
router.get('/:id', function (req, res) {

    var artworkId = req.params.id;
    var db = req.db;
    var collection = db.get('artworks');
    var limitArtwork = 1;
    collection.find({
        "id": parseInt(artworkId)
    }, function (e, docs) {
        res.json(docs);
    });
});


/**
 * Get Artwork by artist Id
 * @param {Objects} req 
 * @param {Objects} res 
 * @param {int} ArtistId 
 * @return {none} none
 */
router.get('/findartist/:id', function (req, res) {
    console.log(req.params.id);
    var artworkId = req.params.id;
    var db = req.db;
    var collection = db.get('artworks');
    collection.find({
        contributors: {
            $elemMatch: {
                id: parseInt(artworkId)
            }
        }
    }, function (e, docs) {
        res.json(docs);
    });
});


module.exports = router;
