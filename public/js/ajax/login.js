var toggleForm = function() { 
	$("#link-to-sign-up").on('click', function() {
		event.preventDefault();
		$('#toggle-local-login').fadeOut('slow');
		$('#login-container').html("<div id='toggle-local-sign-up'><h1>Sign up</h1></br><strong><a href='/api/users/login' id='link-to-log-in'>Already have an account? Login</astrong></br>	<strong><a href='/api/users/auth/linkedin'>Login with Linkedin</astrong></b<form><ul><li><input type='text' id='name' name='name' value=''></input></li><li><input type='text' id='email' name='email' value=''></input></li><li><input type='text' id='password' name='password' value=''></inputli><li><input type='text' id='headline' name='headline' value=''></inputli><li><input id='callAjax' class='btn btn-default' type='submivalue='Submit'></input></li></ul></form></div>");
	}); 

	$('#link-to-log-in').on('click', function() {
		$('#local-sign-up').fadeOut('slow');
		generateLogIn();
	})
}

var generateLogIn = function() {
	$('#login-container').html("<div id='toggle-local-login'><h1>Login</h1></br><strong><a href='/api/users/auth/linkedin'>Login with Linkedin</a></strong></br><strong><a href='/api/users/signup' id='link-to-sign-up'>No Account? Sign up here</a></strong></br><form><ul><li><input type='text' id='email' name='email' value=''></input></li><li><input type='text' id='password' name='password' value=''></input></li><li><input id='callAjax' class='btn btn-default' type='submit' value='Submit'></input></li></ul></form></div>");
}

//** AJAX REQUEST *****************************


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
		$.post('/api/users/signup', $(this).serialize(), function(data){
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

