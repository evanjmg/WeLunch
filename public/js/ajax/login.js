
//** LOGIN *****************************

var toggleForm = function() { 
	$("#link-to-sign-up").on('click', function () {
		event.preventDefault();
		$('#local-login').fadeOut('slow');
		$('#login-container').html("<div id='local-sign-up'><strong>Sign up:</strong><a id='link-to-log-in'>Login</a><form><input type='text' id='name' name='name' value='' /><input type='text' id='email' name='email' value='' /><input type='text' id='password' name='password' value='' /><input type='text' id='headline' name='headline' value='' /><input id='callAjax' type='button' value='Call Ajax' /></form><div>");
	}); 

	$('#link-to-log-in').on('click', function () {
		$('#local-sign-up').fadeOut('slow');
		generateLogIn();
	})
}

var generateLogIn = function () {
	$('#login-container').html("<div id='local-login'><h2>Login</h2><a href='#' id='link-to-sign-up'>No Account? Sign up here</a><form method='post' action='/api/users/login' id='login'><div class='form-group'><div class='form-group'><label for='email'>Email</label><input class='form-control' type='text' name='email' id='email'></div><div class='form-group'><label for='password'>Password</label><input class='form-control' type='password' name='password' id='password'></div><input class='btn btn-default' type='submit'></form></div>");
}

//toggle between local sign up - fade in fade out. 
//fade in



//option 1

$(document).ready(function() {
	toggleForm();
	generateLogIn();
	$('#login').on('submit', function () {
		event.preventDefault()
	$.post('/api/users/login', $(this).serialize(), function(data){
			console.log(data);
			if(data.error){
				$('#message').text(data.error)
			}
			if(data.success){
				$('body').append(data);
				$('#message').text(data.success)
			}
	}); 
});
	$("#signup").on("submit", function(event){
		event.preventDefault()
		//make a post request to our /signup endpoint
		// serialize - takes form and looks through input and grabs value out of them
		$.post('/signup', $(this).serialize(), function(data){
			console.log(data);
			if(data.error){
				$('#message').text(data.error)
			}
			if(data.success){
				$('body').append(data);
				$('#message').text(data.success)
			}
		})
	});
});

// //option 2

// $(document).ready(function() {

// 	$("#signup").on("submit", function(event){
// 		event.preventDefault();
// 		var form = event.signup;
// 		// Issue an ajax request
// 		$.ajax({     
// 		    // the forms 'action' attribute
// 		    type: 'POST',
// 		    url: "http://localhost:8000/api/users/signup" ,
// 		    contentType: "application/json",              
// 		    data: $JSON.serialize({ 
// 		    // Serialize the form's fields and values
// 		    name: name
// 		    email: email
// 		    password: password
// 		    headline: headline
// 		  }),
// 		    dataType: "text",
// 		    success: function() {},
// 		    error: function() {}
// 		  });
// 		  // Prevent the browser from submitting the form

// 		});
// });


//** SIGN UP *****************************


