$(function (){
  acceptInvites();
  inviteClick();
}) 

function acceptInvites (){
  console.log("Invite Accepted");
  $.ajax({
    type: "get",
    url: "/api/invites",
    contentType: "json",
    dataType: "json"
  }).done(function(data, response){
    console.log(data);
    

    var html='',i=0;
    for(i;i< data.events.length;i++) {
      html += "<div class='row'><div class='large-12 columns'><div class='row'><img src='"+ data.invites[i].linkedin.avatar+ "'><button href='#' class='close inviteButton'><div class='alert-box'><input type='hidden' value='"+ data.invites[i]._id+"' class='invitee-id'><strong>Invite</strong>'"+ data.invites[i].local.name+ "'+</button></div></div></div></div>"
    }

    $('#InvitesPending').append(html)

  });
}
function postInvite (userid) {
  $.post("/api/invite", { "userId" : userid }).done(function (data) {
    console.log(data);
  });


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