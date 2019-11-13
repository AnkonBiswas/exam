var express = require('express');
var userModel = require('./../models/user-model');

//var userModel = require('./../models/user-model');
var router = express.Router();
router.get('/login', function(req, res){
	res.render('admin/admin_login');
});

router.post('/login', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password
	}

	userModel.validate(user, function(status){
		
		if(status){
			res.cookie('username', req.body.username);
			res.redirect('/admin');	
		}else{
			res.send('invalid username/password');
		}
	});

});
router.get('/', function(req, res){
	var username= req.cookies['username'];
	userModel.admin_profile(username, function(result){
		//console.log(result);
		res.render('admin/index', {user: result});
	});
});

router.get('/add_med', function(req, res){
	res.render('admin/addmedicine');
});

router.post('/add_med', function(req, res){
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

router.get('/edit/:med_id', function(req, res){
	//console.log(req.params.user_id);
	res.clearCookie('med_id');
	res.cookie('med_id', req.params.med_id);
	//console.log(req.cookies['std_id']);
	userModel.medicine_details(req.params.med_id, function(results){
        res.render('admin/edit', {user: results});
        //console.log(results);		
	});

});

router.post('/edit/:med_id', function(req, res){
	//console.log(req.cookies['std_id']);

	var user = {
		med_id: req.cookies['med_id'],
		med_name:req.body.med_name,
		chemical_name:req.body.chemical_name,
		quantity:req.body.quantity
	};

	userModel.edit_medicine(user, function(status){
		var url= '/admin/medicine_list';
		if(status){
			res.redirect(url);
		}else{
			res.redirect(url);
		}
	});
});

router.get('/delete_medicine/:med_id', function(req, res){
	userModel.delete_medicine(req.params.med_id, function(result){
		var url= '/admin/medicine_list';
		if(result){
			res.redirect(url);
		}else{
			res.redirect(url);
		}
		
        //console.log(results);		
	});

});

module.exports = router;


