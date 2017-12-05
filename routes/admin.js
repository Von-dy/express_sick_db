var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
    var collection = db.get().collection('players');
    collection.find().toArray(function(err, docs) {
        res.render('admin', { title: 'Admin Page', users: docs });
    })

});

module.exports = router;