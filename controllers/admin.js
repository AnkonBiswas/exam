var express = require('express');
//var userModel = require('./../models/user-model');
var router = express.Router();

router.get('/', function(request, response){
	response.render('admin/index');
});

router.get('/addproducts', function(request, response){
	response.render('admin/addproducts');
});
router.get('/deleteproducts', function(request, response){
	response.render('admin/deleteproducts');
});
router.get('/deletecustomer', function(request, response){
	response.render('admin/deletecustomer');
});
router.get('/addproducts', function(request, response){
	response.render('admin/addproducts');
});


router.post('/', function(request, response){
	
	// var user = {
	// 	username: request.body.username,
	// 	password: request.body.password
	// };

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


