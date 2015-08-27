

function getUsers (){
	var userIndexHeader = "<style>body {  overflow:scroll!important;}</style><div class='row' style='background-color:#051C2B'><div class='small-8 columns'><h2 style='text-align:left;color:white;font-weight:200;font-size:30px;display:inline-block'>Invite People</h2></div><div class='small-4 columns' ><input type='submit' href='#' value='Done' style='background-color:#1dc39f;border: 1px #1dc39f;margin-left:40%;'></div><div id='usersInvite'></div></div></div></div>"
	$('.invite-users-page').append(userIndexHeader).fadeIn(3000);
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
