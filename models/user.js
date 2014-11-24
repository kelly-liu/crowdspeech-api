/* User Model */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// user schema
var userSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	password: String,
	history: [ { type:ObjectId, ref:'Phrase' } ],
	saved: [ { type:ObjectId, ref: 'Phrase'} ]
});

// get users
userSchema.statics.getUsers = function(callback){
	User.find({}, function(err, users){
		callback(users);
	});
}

// get user by id
userSchema.statics.getUserById = function(id, callback){
	User.findOne({"_id":id})
		.populate('history saved')
		.exec(function(err,user){
			if(err){
				throw err;
			} else {
				callback(user);
			}
		});
}

// create user
userSchema.statics.createUser = function(firstname, lastname, email, password, callback){
	var user = new User ({
		firstname: firstname,
		lastname: lastname,
		email: email,
		password: password,
		history: [],
		saved: []
	});

	user.save(function(err){
		if (err) {
			throw err;
		} else {
			callback();
		}
	});
}

// add phrase to history
userSchema.statics.addToHistory = function(user_id, phrase_id, callback){
	User.findOne({"_id":user_id}, function(err, user){
		if(err){
			throw err;
		} else {
			if(user.history.indexOf(phrase_id) < 0){
				user.history.push(phrase_id);
			}
			user.save(function(err, user){
				callback(user);
			});
		}
	});
}

// save phrase
userSchema.statics.save = function(user_id, phrase_id, callback){
	User.findOne({"_id":user_id}, function(err, user){
		if(err){
			throw err;
		} else {
			if(user.saved.indexOf(phrase_id) < 0){
				user.saved.push(phrase_id);
			}
			user.save(function(err, user){
				callback(user);
			});
		}
	});
}

// remove phrase from history
userSchema.statics.removeFromHistory = function(user_id, phrase_id, callback){
	User.findOne({"_id":user_id}, function(err, user){
		if(err){
			throw err;
		} else {
			if(user.history.indexOf(phrase_id) >= 0){
				user.history.remove(phrase_id);
			}
			user.save(function(err, user){
				callback(user);
			});
		}
	});
}

// clear history
userSchema.statics.clearHistory = function(user_id, callback){
	User.findOne({"_id":user_id}, function(err, user){
		if(err){
			throw err;
		} else {
			user.history = [];
			user.save(function(err){
				if (err){
					throw err;
				} else {
					callback(user);
				}
			});
		}
	});
}

// unsave 
userSchema.statics.unsave = function(user_id, phrase_id, callback){
	User.findOne({"_id":user_id}, function(err, user){
		if(err){
			throw err;
		} else {
			if(user.saved.indexOf(phrase_id) >= 0){
				user.saved.remove(phrase_id);
			}
			user.save(function(err, user){
				callback(user);
			});
		}
	});
}

// get all saved phrases by a certain user
userSchema.statics.getSavedByUser = function(user_id, callback){
	User.findOne({"_id":user_id}, function(err, user){
		if(err){
			throw err;
		} else {
			var saved = user.saved;
			callback(saved);
		}
	});
}

// get all saved phrases
userSchema.statics.getSaved = function(callback){
	User.find({}, function(err, users){
		if(err){
			throw err;
		} else {
			var all_saved = []
			for (var i=0; i < user.length; i++){
				var saved = user[i].saved;
				for (var j=0; j<saved.length; j++){
					var phrase = saved[j];
					all_saved.push(phrase);
				}
			}
			callback(all_saved);
		}
	});
}

// get user history
userSchema.statics.getHistoryByUser = function(user_id, callback){
	User.findOne({"_id":user_id}, function (err, user){
		if(err){
			throw err;
		} else {
			var history = user.history;
			callback(history);
		}
	});
}

// delete user's account
userSchema.statics.deleteUser = function(user_id, callback){
	User.findOneAndRemove({"_id":user_id}, function(err, user){
		callback(user);
	});
}










