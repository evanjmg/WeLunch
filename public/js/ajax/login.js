
//** RENDER HTML *****************************


var toggleForm = function() { 
	$("#link-to-sign-up").on('click', function() {
		event.preventDefault();
		$('#toggle-local-login').fadeOut('slow');
		$('#login-container').html("

			<div id='toggle-local-sign-up'>
				<h1>Sign up</h1></br>
				<strong><a href='#' id='link-to-log-in'>Already have an account? Login</a></strong>
				</br>	<strong><a href='/api/users/auth/linkedin'>Login with Linkedin</a></strong></br>

				<form>
				  <ul>
				    	<li><input type='text' id='name' name='name' value=''></input></li>
				    	<li><input type='text' id='email' name='email' value=''></input></li>
				    	<li><input type='text' id='password' name='password' value=''></input></li>
				    	<li><input type='text' id='headline' name='headline' value=''></input></li>
				    	<li><input id='callAjax' class='btn btn-default' type='submit' value='Submit'></input></li>
				  </ul>
				</form>
			</div>

			");
	}); 

	$('#link-to-log-in').on('click', function() {
		$('#local-sign-up').fadeOut('slow');
		$('#login-container').html("

			<div id='toggle-local-login'>
				<h1>Login</h1></br>
				<strong><a href='/api/users/auth/linkedin'>Login with Linkedin</a></strong></br>
				<strong><a href='#' id='link-to-sign-up'>No Account? Sign up here</a></strong></br>

				<form>
				  <ul>
				    	<li><input type='text' id='email' name='email' value=''></input></li>
				    	<li><input type='text' id='password' name='password' value=''></input></li>
				    	<li><input id='callAjax' class='btn btn-default' type='submit' value='Submit'></input></li>
				  </ul>
				</form>
			</div>

		");
}); 


var generateLogIn = function() {
	$('#login-container').html("<div id='local-login'><h2>Login</h2></br><a href='/api/users/auth/linkedin'>Login with Linkedin</a></br><a href='#' id='link-to-sign-up'>No Account? Sign up here</a><form method='post' action='/api/users/login'<div class='form-group'><div class='form-group'<label for='email'>Email</label><input class='form-control' type='text' name='email' id='email'></div<div class='form-group'	<label for='password'>Password</label><input class='form-control' type='password' name='password' id='password'</div<input class='btn btn-default' type='submit'></form></div>");
}

//** AJAX REQUEST *****************************


$(document).ready(function() {
	toggleForm();
	generateLogIn();
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

