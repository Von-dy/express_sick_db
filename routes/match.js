var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Match = require('../models/Match');

/* GET home page. */
router.get('/', function(req, res, next) {
    match_data=mongoose.connection.collection('match').find(); //finding all matches
    res.render('match', { title: 'Express', matches: match_data});
});

router.get('/all', function(req, res, next) {
    mongoose.connection.collection('match').find().toArray(
        function(err, results){
            res.send(results);
        });
});

router.post('/add', function(req, res, next) {
    var players=[req.body.p1, req.body.p2];
    var match_attempt = new Match({tournament: req.body.tournament, players:players, winner: req.body.winner});
    match_attempt.addNewMatch();
    res.redirect('../match');
});

router.post('/update', function(req, res, next) {
    var oldplayers=[req.body.oldp1, req.body.oldp2];
    var newplayers=[req.body.newp1, req.body.newp2];
    //var match_attempt = new Match({tournament: req.body.tournament, players:players, winner: req.body.winner});
    //match_attempt.addNewMatch();
    mongoose.connection.collection('match').findOneAndUpdate({tournament:req.body.oldT,players:oldplayers,winner:req.body.ow},{$set: {tournament:req.body.newT,players:newplayers,winner:req.body.nw}});
    res.redirect('../match');
});

router.post('/remove', function(req, res, next) {
    //var temp = new Player({gamertag: req.body.gamertag});
    //temp.remove({})
    mongoose.connection.collection('match').remove({tournament:req.body.tournament,winner:req.body.winner});
    res.redirect('../match')
});

router.post('/count',function(req,res,next){
    mongoose.connection.collection('match').count({winner:req.body.winner}, function(err, count){
        //console.log("Number of wins: "+count);
        res.send(String(count))
    });
    //res.redirect('../match')
});

router.post('/countAll',function(req,res,next) {
    mongoose.connection.collection('match').find({}).toArray(
        function (err, results) {
            //results;
            //res.send(results);
            var dict = {};
            results.forEach(function (element) {
                if (element.winner in dict) {
                    dict[element.winner] += 1

                } else {
                    dict[element.winner] = 1
                }
            });

            res.send(dict)
            /*mongoose.connection.collection('match').count({winner:req.body.winner}, function(err, count){
                //console.log("Number of wins: "+count);
                res.send(String(count))
            });*/
            //res.redirect('../match')
        });
});


module.exports = router;
