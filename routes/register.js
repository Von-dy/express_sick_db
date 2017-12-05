var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

router.post('/register_request', function(req, res, next) {
    var register_attempt = new User({ name: req.body.name, pass: req.body.password });
    register_attempt.addNewUser();
    res.redirect('../login')
});

module.exports = router;
