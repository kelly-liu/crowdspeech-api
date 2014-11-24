$(document).ready(function() {

	asyncTest("User document tests", function() {
/******************USER DOCUMENT TESTS*******************/
		var newUser = {
		    "username" : "eddie",
		    "password" : "eddied",
		    "posts" : [],
		    "groups" : []
		}
		var newUser = {
		    "username" : "eddied",
		    "password" : "eddied",
		    "posts" : [],
		    "groups" : []
		}
		var newUserBad = {
		    "password" : "eddied",
		    "posts" : [],
		    "groups" : []
		}
		var toDeleteUser = null;
		$.getJSON( '/users/', function( data ) {
			if(data && data.length > 0){
				toDeleteUser = data[0]._id;
				console.log("toDeleteUser");
				console.log(toDeleteUser);
				$.getJSON( '/users/'+toDeleteUser, function( data ) {
			        equal(data === null, false,"users TEST GET user valid id");
			    });
	    		$.ajax({
				    type: 'PUT',
				    url: '/users/'+toDeleteUser+'/groups/544719caed2871b70f6ac54e',
				    dataType: 'JSON'
				}).done(function(response) {
				    // Check for successful (blank) response
				    console.log("response ------");
				    console.log(response);
				    equal(response.msg, '',"users TEST PUT user add group");
				    
				});
				$.ajax({
					    type: 'DELETE',
					    url: '/users/'+toDeleteUser+'/groups/544719caed2871b70f6ac54e',
					    dataType: 'JSON'
					}).done(function(response) {
					    // Check for successful (blank) response
					    console.log(response);
					    equal(response.msg, '',"users TEST DELETE user remove group");   
					});
				$.getJSON( 'posts/feed/'+toDeleteUser, function( data ) {
			    	if(data && data.length > 0){
						toDeletePost = data[0]._id;
						console.log("toDeletePost");
						console.log(toDeletePost);
					}
			        equal(data === null, false,"posts TEST GET user feed");
			    });
			    $.getJSON( 'groups/', function( data ) {
					if(data && data.length > 0){
						toDeleteGroup = data[0]._id;

						$.getJSON( 'groups/'+toDeleteGroup+'/members', function( data ) {
			        		equal(data === null, false,"groups TEST GET members of group");
			    		});
			    		$.ajax({
						    type: 'PUT',
						    url: '/groups/'+toDeleteGroup+'/members/'+toDeleteUser,
						    dataType: 'JSON'
						}).done(function(response) {
						    // Check for successful (blank) response
						    console.log(response);
						    equal(response.msg, '',"groups TEST PUT add to members valid");
						    $.ajax({
							    type: 'DELETE',
							    url: '/groups/'+toDeleteGroup+'/members/'+toDeleteUser,
							    dataType: 'JSON'
							}).done(function(response) {
							    // Check for successful (blank) response
							    console.log(response);
							    equal(response.msg, '',"groups TEST DELETE remove from members valid");
							});
						});
						

					}
			        equal(data === null, false,"groups TEST GET  groups valid");
			    });
			}
	        equal(data === null, false,"users TEST GET users");
	    });
		$.getJSON( '/users/544719caed2871b70f6ac54e', function( data ) {
	        		equal(data === null, true,"users TEST GET user invalid id");
	    		});
	    
	    $.getJSON( '/users/eddie/id', function( data ) {
	        equal(data === null, false,"users TEST GET user id");
	        
	    });
	    $.getJSON( '/users/eddi/id', function( data ) {
	        equal(data === null, true,"users TEST GET user id invalid");
	    });
	    $.ajax({
		    type: 'POST',
		    data: newUser,
		    url: '/users/',
		    dataType: 'JSON'
		}).done(function(response) {
		    // Check for successful (blank) response
		    console.log(response);
		    equal(response.msg, '',"users TEST POST user valid");
		    
		});
		
		
		
		$.ajax({
		    type: 'DELETE',
		    url: '/users/'+toDeleteUser
		,
		    dataType: 'JSON'
		}).done(function(response) {
		    // Check for successful (blank) response
		    console.log(response);
		    equal(response.msg, '',"users TEST DELETE user valid");   
		});
/******************USER DOCUMENT TESTS END*******************/
/******************POST DOCUMENT TESTS*******************/

		var groups = ["54468f9241c907450bbf213e"];
		var newPost = {
		    "creator" : "544424f51495a9404d588192",
		    "startTime" : "12345",
		    "endTime" : "123456",
		    "location" : "maseeh",
		    "groups" : groups
		}
		var toDeletePost = null;
		console.log("posts");
	    $.ajax({
		    type: 'POST',
		    data: newPost,
		    url: '/posts/',
		    dataType: 'JSON'
		}).done(function(response) {
		    // Check for successful (blank) response
		    console.log(response);
		    equal(response.msg, '',"posts TEST POST post valid");
		    
		});
		
	    $.getJSON( 'posts/feed/544718be397fdaac0fb74ef2', function( data ) {
	        equal(data === null, true,"posts TEST GET user feed invalid");
	    });
	    $.getJSON( 'posts/'+toDeletePost, function( data ) {
	        equal(data === null, false,"posts TEST GET post");
	    });
	    $.getJSON( 'posts/54471dd4f34d40d60fd4cbab', function( data ) {
	        equal(data === null, true,"posts TEST GET post invalid");
	    });
	    $.ajax({
		    type: 'DELETE',
		    url: '/posts/'+toDeletePost,
		    dataType: 'JSON'
		}).done(function(response) {
		    // Check for successful (blank) response
		    console.log(response);
		    equal(response.msg, '',"posts TEST DELETE user remove group");   
		});
/******************POST DOCUMENT TESTS END*******************/
/******************GROUP DOCUMENT TESTS*******************/
		var newGroup = {
		    "admin" : "544424f51495a9404d588192",
		    "members" : [],
		    "name" : "name",
		    "posts" : []
		}
		var toDeleteGroup = null;
		$.ajax({
		    type: 'POST',
		    data: newGroup,
		    url: '/groups/',
		    dataType: 'JSON'
		}).done(function(response) {
		    // Check for successful (blank) response
		    console.log(response);
		    equal(response.msg, '',"groups TEST POST group valid");
		    
		});

		
		
			    
	    $.ajax({
		    type: 'DELETE',
		    url: '/groups/'+toDeleteGroup,
		    dataType: 'JSON'
		}).done(function(response) {
		    // Check for successful (blank) response
		    console.log(response);
		    equal(response.msg, '',"groups TEST DELETE remove group valid");
		    
		});
/******************GROUP DOCUMENT TESTS END*******************/
	});	

});

// $(document).ready(function() {

// 	asyncTest("User document tests", function() {
// /******************USER DOCUMENT TESTS*******************/
// 		var newUser = {
// 		    "username" : "eddied",
// 		    "password" : "eddied",
// 		    "posts" : [],
// 		    "groups" : []
// 		}
// 		var newUserBad = {
// 		    "password" : "eddied",
// 		    "posts" : [],
// 		    "groups" : []
// 		}
// 		var toDeleteUser = null;
// 		$.getJSON( '/users/', function( data ) {
// 			if(data.length > 0){
// 				toDeleteUser = data[0]._id;
// 				console.log(toDeleteUser);
// 			}
// 	        equal(data === null, false,"users TEST GET users");
// 	    });

// 	  	$.getJSON( '/users/544424f51495a9404d588191', function( data ) {
// 	        equal(data === null, false,"users TEST GET user valid id");
// 	    });
// 	    $.getJSON( '/users/544424f51495a9404d588192', function( data ) {
// 	        equal(data === null, true,"users TEST GET user invalid id");
// 	    });
// 	    $.getJSON( '/users/eddie/id', function( data ) {
// 	    	console.log(data);
// 	        equal(data === null, false,"users TEST GET user id");
// 	    });
// 	    $.getJSON( '/users/eddi/id', function( data ) {
// 	    	console.log(data);
// 	        equal(data === null, true,"users TEST GET user id invalid");
// 	    });
// 	    $.ajax({
// 		    type: 'POST',
// 		    data: newUser,
// 		    url: '/users/',
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"users TEST POST user valid");
		    
// 		});
// 		$.ajax({
// 		    type: 'DELETE',
// 		    url: '/users/'+toDeleteUser,
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"users TEST DELETE user valid");   
// 		});
// 		$.ajax({
// 		    type: 'PUT',
// 		    url: '/users/544424f51495a9404d588191/groups/544719caed2871b70f6ac54e',
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"users TEST PUT user add group");
		    
// 		});
// 		$.ajax({
// 		    type: 'DELETE',
// 		    url: '/users/544424f51495a9404d588191/groups/544719caed2871b70f6ac54e',
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"users TEST DELETE user remove group");   
// 		});
// /******************USER DOCUMENT TESTS END*******************/
// /******************POST DOCUMENT TESTS*******************/

// 		var groups = ["54468f9241c907450bbf213e"];
// 		var newPost = {
// 		    "creator" : "544424f51495a9404d588191",
// 		    "startTime" : "12345",
// 		    "endTime" : "123456",
// 		    "location" : "maseeh",
// 		    "groups" : groups
// 		}
// 		var toDeletePost = null;
// 		console.log("posts");
// 	    $.ajax({
// 		    type: 'POST',
// 		    data: newPost,
// 		    url: '/posts/',
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"posts TEST POST post valid");
		    
// 		});
// 		$.getJSON( 'posts/feed/544718be397feaac0fb74ef2', function( data ) {
// 	    	console.log(data);
// 	    	if(data.length > 0){
// 				toDeletePost = data[0]._id;
// 				console.log(toDeletePost);
// 			}
// 	        equal(data === null, false,"posts TEST GET user feed");
// 	    });
// 	    $.getJSON( 'posts/feed/544718be397fdaac0fb74ef2', function( data ) {
// 	    	console.log(data);
// 	        equal(data === null, true,"posts TEST GET user feed invalid");
// 	    });
// 	    $.getJSON( 'posts/54471df4f34d40d60fd4cbab', function( data ) {
// 	    	console.log(data);
// 	        equal(data === null, false,"posts TEST GET post");
// 	    });
// 	    $.getJSON( 'posts/54471dd4f34d40d60fd4cbab', function( data ) {
// 	    	console.log(data);
// 	        equal(data === null, true,"posts TEST GET post");
// 	    });
// 	    $.ajax({
// 		    type: 'DELETE',
// 		    url: '/posts/'+toDeletePost,
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"posts TEST DELETE user remove group");   
// 		});
// /******************POST DOCUMENT TESTS END*******************/
// /******************GROUP DOCUMENT TESTS*******************/
// 		var newGroup = {
// 		    "admin" : "544424be1495a9404d58818f",
// 		    "members" : [],
// 		    "name" : "name",
// 		    "posts" : []
// 		}
// 		var toDeleteGroup = null;
// 		$.ajax({
// 		    type: 'POST',
// 		    data: newGroup,
// 		    url: '/groups/',
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"groups TEST POST group valid");
		    
// 		});
// 		$.ajax({
// 		    type: 'PUT',
// 		    url: '/groups/544719caed2871b70f6ac54e/members/544424f51495a9404d588191',
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"groups TEST PUT add to members valid");
		    
// 		});
// 		$.ajax({
// 		    type: 'DELETE',
// 		    url: '/groups/544719caed2871b70f6ac54e/members/544424f51495a9404d588191',
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"groups TEST DELETE remove from members valid");
		    
// 		});
// 		$.getJSON( 'groups/544719caed2871b70f6ac54e/members', function( data ) {
// 	    	console.log(data);
// 	        equal(data === null, false,"groups TEST GET members of group");
// 	    });
// 	    $.getJSON( 'groups/', function( data ) {
// 	    	console.log(data);
// 	    	if(data.length > 0){
// 				toDeleteGroup = data[0]._id;
// 				console.log(toDeleteGroup);
// 			}
// 	        equal(data === null, false,"groups TEST GET  groups valid");
// 	    });
// 	    $.ajax({
// 		    type: 'DELETE',
// 		    url: '/groups/'+toDeleteGroup,
// 		    dataType: 'JSON'
// 		}).done(function(response) {
// 		    // Check for successful (blank) response
// 		    console.log(response);
// 		    equal(response.msg, '',"groups TEST DELETE remove group valid");
		    
// 		});
// /******************GROUP DOCUMENT TESTS END*******************/
// 	});	

// });