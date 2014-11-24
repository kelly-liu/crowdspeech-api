var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Phrase = require('../models/phrase');

// GET /users - get list of all users
router.get('/', function (req, res){
	User.getUser(function(users){
		res.json({users: users, session: req.session});
	});
});

// GET /users/:id - get user by id
router.get('/:id', function(req, res){
	var user_id = req.param("id");
	User.getUserById(user_id, function(user){
		res.json({user:user, session: req.session});
	});
});

//POST /users -  create new user
router.post('/', function(req, res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var history = [];
	var saved = [];
	User.createUser(firstname, lastname, email, password, history, saved, function(user){
		res.json({user:user, session: req.session});
	});
});

// POST /users/:id/saved
router.post('/users/:id/saved', function(req, res){
	var user_id = params("id");
	var phrase_id = req.body.phrase_id;
	User.save(user_id, phrase_id, function(user){
		res.json({user:user, session: req.session});
	});
});

// GET /users/:id/saved
router.get('/users/:id/saved', function(req, res){
	var user_id = params("id");
	User.getSavedByUser(user_id, function(user){
		res.json({user:user, session: req.session});
	});
});

//POST  /users/:id/history
router.post('/users/:id/history', function(req,res){
	var user_id = params("id");
	var phrase_id = req.body.phrase_id;
	User.addToHistory(user_id, phrase_id, function(user){
		res.json({user:user, session:req.session});
	});
});

//GET  /users/:id/history
router.get('/users/:id/history', function(req, res){
	var user_id = params("id");
	User.getHistoryByUser(user_id, function(user){
		res.json({user:user, session:req.sessions});
	});
});

//POST /users/:id/clearHistory
router.post('/users/:id/history/clear', function(req, res){
	var user_id = params("id");
	user.clearHistory(user_id, function(user){
		res.json({user:user, session:req.sessions});
	});
});

//DELETE /users/:id - delete user by id
router.delete('/:id', function(req, res){
	var user_id = req.param("id");
	User.deleteUser(user_id, function(user){
		res.json({user:user, session:req.session});
	});
});


module.exports = router;