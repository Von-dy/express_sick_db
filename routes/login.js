var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    //sess=req.session;
    //sess.name;
    res.render('login', { title: 'Express' });
});

router.post('/login_request', function(req, res, next){
    var login_attempt = new User({ name: req.body.name, pass:req.body.password });
    login_attempt.authenticateUser(function(err, result) {
        //if (result)
        //    sess.name=req.body.name;
            res.redirect();
    });
});

module.exports = router;