$(function () {
	navLunch()
	navInvite()
})

function navInvite() {
	console.log("nav invites working");
	$('#navInvite').on('click', function () {
		event.preventDefault();
		getUsers();
	$('.current-event-container').slideUp(){	
}

function navLunch() {
	console.log("nav lunch working");
	$('#navLunch').on('click', function () {
		event.preventDefault();
	$('.invite-users-page').slideUp()
	showCurrentEvent();	
	})
}

function navInvite() {
	console.log("nav invites working");
	$('#navInvite').on('click', function () {
		event.preventDefault();
		getUsers();
	$('.current-event-container').slideUp(){	
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



