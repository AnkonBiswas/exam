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
		var sql = "select * from users where username=? and password=?";

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
	}
	//register: function(user, callback){
		//var sql = "insert into users values('', ?, ?,?,?,?)";
		//db.execute(sql, [user.username, user.password, user.fullname, user.gender, user.role], function(status){
			//callback(status);
		//});
	//}
}	


