var express = require('express');
var router = express.Router();


/**
 * Get All Artists from the database
 * @param {Objects} req 
 * @param {Objects} res 
 * @param {int} ArtistId 
 * @return {none} none
 */
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('artists');
    var limitArtists = 10;

    collection.find({}, {
        limit: limitArtists,
        skip: Math.random()
    }, function (e, docs) {
        res.json(docs);
    });
});


/**
 * Get Artist by Id
 * @param {Objects} req 
 * @param {Objects} res 
 * @param {int} ArtistId 
 * @return {none} none
 */
router.get('/:id', function (req, res) {

    var artistId = req.params.id;
    var db = req.db;
    var collection = db.get('artists');
    var limitArtists = 1;
    collection.find({
        "id": parseInt(artistId)
    }, function (e, docs) {
        res.json(docs);
    });
});




module.exports = router;
