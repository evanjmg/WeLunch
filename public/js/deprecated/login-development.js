
<div>
      <br /><br />
      <input data-toggle=".was_checked" id="uncheck_me" name="uncheck_me" type="checkbox" value="1" checked="checked" />
      <label for="uncheck_me">Show the area below</label>

      <div class="was_checked">
        Showing by default.
      </div>
 
      <br /><br />
      <input data-toggle-prefix="." id="check_me" name="check_me" type="checkbox" value="Check Me" />
      <label for="check_me">Show the area below</label>

      <div class="check-me">
        Hidden by default.
      </div>
    </div>


//** RENDER HTML *****************************


var toggleForm = function() { 
	$("#link-to-sign-up").on('click', function() {
		event.preventDefault();
		$('#local-login').fadeOut('slow');
		$('#login-container').html("<div id='local-sign-up'><h2>Sign up</h2><a id='link-to-log-in'>Already have an account? Login</a><form><input type='text' id='name' name='name' value='' /><input type='text' id='email' name='email' value='' /><input type='text' id='password' name='password' value='' /><input type='text' id='headline' name='headline' value='' /><input id='callAjax' type='button' value='Call Ajax' /></form><div>");
	}); 

	$('#link-to-log-in').on('click', function() {
		$('#local-sign-up').fadeOut('slow');
		generateLogIn();
	})
}

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


//** OPTION 2 *****************************

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

// function getName(personid) {
//   var dynamicData = {};
//   dynamicData["id"] = personID;
//   return $.ajax({
//     url: "getName.php",
//     type: "get",
//     data: dynamicData
//   });
// }

// getName("2342342").done(function(data) {
//   // Updates the UI based the ajax result
//   $(".person-name").text(data.name); 
// });

//** ANCHOR SCROLL DOWN *****************************

//http://arbitrary-anchor.briangonzalez.org/#.how-to-use

