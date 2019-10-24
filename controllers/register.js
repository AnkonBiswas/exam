var express = require('express');
var userModel = require('./../models/user-model');
var router = express.Router();

router.get('/', function(request, response){
	response.render('register/index');
});

router.post('/', function(request, response){
	
	 var user = {
	 	username: request.body.username,
		password: request.body.password,
		fullname: request.body.fullname,
		gender  : request.body.gender,
		role    : request.body.role
	};

	userModel.insert(user, function(status){
		if(status){
			response.redirect('/user/userlist');
		}else{
			response.redirect('/user/adduser');
		}
	});
	// userModel.validate(user, function(status){
	// 	if(status){
	// 		response.cookie('username', request.body.username);
	// 		response.redirect('/home');
	// 	}else{
	// 		response.send('invalid username/password');		
	// 	}
	// });

});

module.exports = router;


