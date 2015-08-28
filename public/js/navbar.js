$(function () {
	navLunch()
	navInvite()

	if ($('.welunch').html() == "WeLunch") {
	$('.welunchnav').hide()
		$('.main-container').css('padding-top', '0')
	}

})

function navInvite() {
	$('#navInvite').on('click', function () {
		event.preventDefault();
		getUsers();
		$('.current-event-container').slideUp()
	});
}

function navLunch() {
	$('#navLunch').on('click', function () {
		event.preventDefault();
		$('.invite-users-page').slideUp()
		showCurrentEvent();	
	});
}

function navInvite() {
	$('#navInvite').on('click', function () {
		event.preventDefault();
			getUsers();
		$('.current-event-container').slideUp()
	});
}


// function navLogout() {
// 	console.log("nav logout working");
// 	$('#navLogout').on('click', function () {
// 		event.preventDefault();
// 	$('.invites').onclick()
// 	getUsers()	
// 	})
// }

// $( on click for lunch 
// $('.invite-users-page').slideUp()
// showCurrentEvent ()

// $( on click for .invites).on click
//  getUsers() 
// $(.



