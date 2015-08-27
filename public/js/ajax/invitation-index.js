$(function (){

  inviteClick();
}) 

function acceptInvites (eventId){
  console.log(eventId);
  $.ajax({
    type: "post",
    url: "api/invites/accept",
    data: { "eventId": eventId }
  }).done(function(data, response){
    console.log(data,response);
  });
}

function deleteInvites (eventId){
  console.log("Invite Deleted");
  $.ajax({
    type: "post",
    url: "api/invites/accept",
    data: { "eventId": eventId }
  }).done(function(data, response){
    console.log(data,response);
  });
}
/*function postInvite (userid) {
  $.post("/api/invite", { "userId" : userid }).done(function (data) {
    console.log(data);
  });
*/

/*  }
// Setup INVITE buttons
function inviteClick() {
  $('.inviteButton').on('click', function(e){
    console.log('clicked')
    e.preventDefault();
    var inviteeId = $(this).children('.invitee-id').val()
    postInvite(inviteeId);
    $(this).removeClass('alert-box');
  });
}*/