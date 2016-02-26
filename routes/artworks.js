var express = require('express');
var router = express.Router();



/*
 * GET userlist.
 */
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('artworks');
    var limitArtwork = 40;
    collection.find({}, {
        limit: limitArtwork
    }, function (e, docs) {
        res.json(docs);
    });
});



//joins here
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



module.exports = router;
