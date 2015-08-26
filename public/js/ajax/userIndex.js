$(function (){
	getUsers();
})

function getUsers (){
	console.log("Getting users...")
	$.ajax({
		type: "get",
		url: "/api/users",
		contentType: "json",
		dataType: "json"
	}).done(function(data, response){
		console.log(data);
		//Loop through the users and create an HTML string
		var html='',i=0;
		for(i;i< data.users.length;i++) {
			html += "<div class='row'><div class='large-12 columns'><div class='row'><div class='large-12 columns'><div class='large-8 columns'><div class='row'><div class='large-4 small-6 columns'><img src='"+ data.users[i].linkedin.avatar+ "'><div class='alert-box'><strong>Invite</strong>'"+ data.users[i].local.name+ "'<a href='#' class='close'>+</a></div></div></div></div></div></div></div></div>"
		};console.log(html)
		$('#usersInvite').append(html)

	});
};

// // Setup INVITE buttons
// function inviteClick()
// $('.actions .invite').click(function(e){
// 	e.preventDefault();
// 	postInvite()
// });