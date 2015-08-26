$(function (){
	getUsers();
	inviteClick();
}) 

function getUsers (){
	console.log("Getting users...");
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
			html += "<div class='row'><div class='large-12 columns'><div class='row'><img src='"+ data.users[i].linkedin.avatar+ "'><button href='#' class='close inviteButton'><div class='alert-box'><input type='hidden' value='"+ data.users[i]._id+"' class='invitee-id'><strong>Invite</strong>'"+ data.users[i].local.name+ "'+</button></div></div></div></div>"
		}

		$('#usersInvite').append(html)

	});
}
function postInvite (userid) {
	$.post("/api/invite", { "userId" : userid }).done(function (data) {
		console.log(data);
	});
	// $.ajax({
	// 		type: "POST",
	// 		url: "/api/invites/",
// 			data: { "userId": userid },
// 			success: function 
// 			contentType: "json",
// 			dataType: "json"
// 		}).done(function(data, response){
// 			console.log(response, data)
// });
	}
// Setup INVITE buttons
function inviteClick() {
	$('.inviteButton').on('click', function(e){
		console.log('clicked')
		e.preventDefault();
		var inviteeId = $(this).children('.invitee-id').val()
		postInvite(inviteeId);
		$(this).removeClass('alert-box');
	});
}
