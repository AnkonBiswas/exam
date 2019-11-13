var express = require('express');
var userModel = require('./../models/user-model');

//var userModel = require('./../models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	var username= req.cookies['username'];
	userModel.profile(username, function(result){
		//console.log(result);
		res.render('admin/index', {user: result});
	});
});

router.get('/add_med', function(req, res){
	res.render('admin/addmedicine');
});

router.post('/add_med', function(req, res){
	//console.log(req.cookies['std_id']);
	//console.log('im here');

	var user = {
		med_name: req.body.med_name,
		chemical_name: req.body.chemical_name,
		quantity: req.body.quantity
	};
	userModel.add_medicine(user, function(status){
		var url1= '/admin';
		console.log(status);
		//var url1=url.concat('ATP3_1');
		if(status){
			res.redirect(url1);
		}else{
			res.redirect(url1);
		}
	});
});
router.get('/medicine_list', function(req, res){
    //res.render('courses/index');
    
    userModel.medicine_list(function(results){
		console.log(results);
		res.render('admin/medicine_list', {user: results});
	});

});

module.exports = router;


