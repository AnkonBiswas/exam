var express = require('express');
var db = require('./../models/db.js');
var router = express.Router();

router.get('/', function(req, res){

	res.render('home/index');
});



module.exports = router;


