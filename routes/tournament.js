var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Tournament = require('../models/Tournament');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('tournament', { title: 'Express' });
});

router.get('/all', function(req, res, next) {
    mongoose.connection.collection('tournament').find().toArray(
        function(err, results){
            res.send(results);
    });
});

router.post('/add', function(req, res, next) {
    var tourn_attempt = new Tournament({ name: req.body.name, date: req.body.date, year: req.body.year, location: req.body.location, placements: {} });
    tourn_attempt.addNewTournament();
    res.redirect('../tournament')
});
router.post('/update',function(req,res,next){
    mongoose.connection.collection('tournament').findOneAndUpdate({name:req.body.oname},{$set: {name:req.body.newName,location:req.body.nLoc,year:req.body.nYear,date:req.body.nDate}})
    res.redirect('../tournament')
});

router.post('/remove', function(req, res, next) {
    //var temp = new Player({gamertag: req.body.gamertag});
    //temp.remove({})
    mongoose.connection.collection('tournament').remove({name:req.body.name});
    res.redirect('../tournament')
});

router.post('/findMatches', function(req, res, next) {
    mongoose.connection.collection('match').find({tournament:req.body.name}).toArray(
        function(err, results) {
            //results;
            //res.send(results);
            var dict={};
            results.forEach(function(element){
                if (element.winner in dict){
                    dict[element.winner]+=1

                } else{
                    dict[element.winner]=1
                }
            });

            res.send(dict)
            //res.render('tournament', {title: 'express', data:dict})
        }); //finding all matches
});

module.exports = router;
