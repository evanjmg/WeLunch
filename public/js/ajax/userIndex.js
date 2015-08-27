

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
		i=0;
		for(i;i< data.users.length;i++) {
			var html = "<div class='row parent text-center'><div class='large-12 columns'><div class='row'><div><div class='small-3 columns'><img src='"+ data.users[i].linkedin.avatar+ "'></div><div class='small-6 columns' style='text-align:left;'>"+ data.users[i].local.name+ "<br/><span class='industry' style='font-style:italic;text-align:left;font-weight:100'>"+data.users[i].linkedin.industry+"</div><div class='small-3 columns input-parent'><input type='hidden' value='"+ data.users[i]._id+"' class='invitee-id'><input type='submit' value='+' class='close inviteButton' style='font-size:25px'></div></div></div></div></div>"
			var animatedHTML = $(html).hide().fadeIn('slow');
			$('#usersInvite').append(animatedHTML)
		}

		// $('#usersInvite').hide().append(html).slideToggle();
		$('#invite-users-page').fadeIn();
		// $('#usersInvite').slideDown();
		console.log('')
		inviteClick();
	});
}
function postInvite (userid) {
	$.ajax({
	  type: "POST",
	  url: "/api/invites",
	  data: { "userId" : userid } }).done(function (data) {
		console.log(data);
	});
}
// Setup INVITE buttons
function inviteClick() {
	$('.inviteButton').on('click', function(e){
		console.log('clicked');
		e.preventDefault();
		var inviteeId = $(this).parents('.input-parent').children('.invitee-id').val()
		console.log(inviteeId);
		postInvite(inviteeId);
		$(this).closest('.parent').slideToggle("slow", "swing");
	});
}
