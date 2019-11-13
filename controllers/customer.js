var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

var cart=new Array();


router.get('/login', function(req, res){
	res.render('customer/cust_login');
});

router.post('/login', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password
	}

	userModel.cust_validate(user, function(status){
		
		if(status){
			res.cookie('username', req.body.username);
			res.redirect('/customer');	
		}else{
			res.send('invalid username/password');
		}
	});

});
router.get('/', function(req, res){
	var username= req.cookies['username'];
	userModel.customer_profile(username, function(result){
		//console.log(result);
		res.render('customer/index', {user: result});
	});
});

router.get('/medicine_list', function(req, res){
    //res.render('courses/index');
    
    userModel.medicine_list(function(results){
		//console.log(results);
		res.render('customer/medicine_list', {user: results});
	});

});


router.get('/medicine_details/:med_id', function(req, res){
	//console.log(req.params.user_id);
	res.clearCookie('med_id');
	res.cookie('med_id', req.params.med_id);
	userModel.medicine_details(req.params.med_id, function(results){
        res.render('customer/medicine_details', {user: results});
        //console.log(results);		
	});

});

router.post('/medicine_details/:med_id', function(req, res){
	//console.log(req.cookies['std_id']);

	var user = {
		med_id: req.cookies['med_id'],
		//med_name:req.body.med_name,
		//chemical_name:req.body.chemical_name,
		quantity:req.body.quantity
	};

	cart[cart.length++]=user;
	var myJSON = JSON.stringify(cart);
	//console.log(myJSON);
	res.render('customer/view_cart', {user: cart});
});

router.get('/check_out', function(req, res){
	res.render('customer/check_out');
});
router.post('/check_out', function(req, res){
	var myJSON = JSON.stringify(cart);
	console.log(myJSON);

	var user = {
		username: req.cookies['username'],
		address: req.body.address,
		cart: myJSON
	}
	console.log(user);

	userModel.insert_cart(user, function(status){
		if(status)
		console.log("success");
	});

});
module.exports = router;


