var db = require('./db');
module.exports={

	getById: function(id, callback){

		var sql = "select * from users where id=?";
		db.getResults(sql, [id], function(result){

			//console.log(result);
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		console.log(user);
		var sql = "select * from admin where admin_name=? and admin_password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result ) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from users";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insert : function(user, callback){
		var sql = "INSERT INTO users values('', ?, ?, ? , ? , ?);";
		db.execute(sql, [user.username, user.password, user.fullname, user.gender, user.role], function(success){
			callback(success);
			console.log(user.username);
			console.log(user.password);

		});
	},
	update : function(user, callback){
		var sql = "update users set username=?, password=? where id=?";		
			db.execute(sql, [user.username, user.password, user.id], function(status){
				callback(status);
			});
		
	},
	delete : function(user, callback){
		//var sql = "insert into user values('','"+ user.username+"', '"+user.password+"')";
		db.execute(sql, [],  function(status){
			callback(status);
		});
	},
	//register: function(user, callback){
		//var sql = "insert into users values('', ?, ?,?,?,?)";
		//db.execute(sql, [user.username, user.password, user.fullname, user.gender, user.role], function(status){
			//callback(status);
		//});
	//}

	admin_register : function(user, callback){
		console.log(user);
		var sql = "INSERT INTO admin values('', ?, ?, ?);";
		db.execute(sql, [user.admin_name, user.password, user.email], function(success){
			callback(success);
		});
	},

	admin_profile : function(username, callback){
		var sql = "select * from admin where admin_name=?";

		db.getResults(sql, [username], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	add_medicine : function(user, callback){
		console.log(user);
		var sql = "insert into medicine values('', ?, ?, ?)";
		db.execute(sql, [user.med_name, user.chemical_name, user.quantity], function(status){
			callback(status);
		});
	},

	medicine_list :  function(callback){
		var sql = "select * from medicine order by med_name";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	medicine_details :  function(med_id, callback){
		var sql = "select * from medicine where med_id=?";

		db.getResults(sql, [med_id], function(results){
			//console.log(results);
			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	edit_medicine : function(user, callback){

		//console.log(user);
		var sql = "update medicine set med_name=?,chemical_name=?,quantity=? where med_id=?";		
		db.execute(sql, [user.med_name, user.chemical_name, user.quantity, user.med_id], function(status){
			callback(status);
		});
		},

	delete_medicine : function(med_id, callback){
		var sql = "DELETE FROM medicine WHERE med_id=?";
		db.execute(sql, [med_id],  function(status){
			callback(status);
		});
		},

	customer_list :  function(callback){
	var sql = "select * from customer order by cust_name";

	db.getResults(sql, [], function(results){

		if(results.length > 0 ) {
			callback(results);
			}else{
			callback([]);
			}
		});
	},
	delete_customer : function(cust_id, callback){
		var sql = "DELETE FROM customer WHERE cust_id=?";
		db.execute(sql, [cust_id],  function(status){
			callback(status);
		});
		},

///////////////////////////////////////////////////
	cust_register : function(user, callback){
		console.log(user);
		var sql = "INSERT INTO customer values('', ?, ?, ?);";
		db.execute(sql, [user.cust_name, user.password, user.email], function(success){
			callback(success);
		});
	},

	cust_validate: function(user, callback){
		console.log(user);
		var sql = "select * from customer where cust_name=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result ) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	customer_profile : function(username, callback){
		var sql = "select * from customer where cust_name=?";

		db.getResults(sql, [username], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},

	insert_cart : function(user, callback){
		console.log(user);
		var sql = "INSERT INTO orders values('', ?, ?, ?);";
		db.execute(sql, [user.username, user.address, user.cart], function(success){
			callback(success);

		});
	},
	

}


