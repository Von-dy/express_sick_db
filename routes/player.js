var express = require('express');
var router = express.Router();
var session=require('express-session')

var mongoose = require('mongoose');
var Player = require('../models/Player');

/* GET home page. */
router.get('/', function(req, res, next) {
    //sess=req.session;
    //if (sess.name)
    res.render('player', { title: 'Express' });
    //else
    //    res.send(sess)
});

router.get('/all', function(req, res, next) {
    mongoose.connection.collection('players').find().toArray(
        function(err, results){
            res.send(results);
        });
});

router.post('/findOne', function(req, res, next) {
    mongoose.connection.collection('players').find({gamertag:req.body.gamertag}).toArray(
        function(err, results){
            res.send(results);
        });
});

router.post('/remove', function(req, res, next) {
    //var temp = new Player({gamertag: req.body.gamertag});
    //temp.remove({})
    mongoose.connection.collection('players').remove({gamertag:req.body.gamertag});
    res.redirect('../player')
});

router.post('/update',function(req,res,next){
    mongoose.connection.collection('players').findOneAndUpdate({gamertag:req.body.oldGamertag},{$set: {gamertag:req.body.newGamertag}})
    res.redirect('../player')
})

router.post('/add', function(req, res, next) {
    var player_attempt = new Player({ gamertag: req.body.gamertag });
    player_attempt.addNewPlayer();
    res.redirect('../player')
});

module.exports = router;
