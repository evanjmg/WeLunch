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
    $('.tinder-container').slideUp();
    $('main-container').html();
    showEvent(eventId);
  });
}

function deleteInvites (eventId, userId){
  console.log(userId, eventId)
  console.log("Invite Deleted");
  $.ajax({
    type: "delete",
    url: "/api/invites",
    data: { "eventId": eventId, "userId": userId },
  }).done(function(data, response){
    console.log(data,response);
  });
}
function showEvent (eventId) {
  $('.main-container').append('<div class="current-event-container"></div>');
  $.ajax({
    type: "get",
    url: "/api/events/"+ eventId
  }).done(function (event){
      if(event) {
     var html = "<h2>"+event.title+"</h2></br><h3 style='font-style:italic'>"+event.message+"</h3></br><h3>"+moment(event.start_time).format('MMMM Do, h:mm -')+moment(event.end_time).format('h:mm')+"</h3><div class='clock'></div></br><h3>"+event.place+"</h3><h4 class='event-location'>"+event.location+"</h4><a href='#' id='map-click'><h4 style='color:#1dc39f'>click for map</h4></a></br><h3>Host:</h3><div class='row' style='width:50%;'><div class='small-6 columns'><img src='"+event._owner.linkedin.avatar+"' style='display:inline-block'></div><div class='small-6 columns'><h3>"+event._owner.local.name+"</h3></div></div></br><div class='row text-center'><input type='submit' id='cancelButton' value='Cancel'></div><h2>Who's Invited?</h2></br></div>"


     var animatedHTML = $(html).hide().fadeIn();
     $('.current-event-container').append(animatedHTML);
     countDown(event.start_time);
     var i=0;
     for (i;i< event.invites.length;i++) {
      var html = "<div class='row'><div class='medium-4 large-4 columns text-center'><img src='"+event.invites[i]._invitee.linkedin.avatar+"'><h4>"+event.invites[i]._invitee.local.name+"</h4></div>"
      var animatedHTML = $(html).hide().slideDown('slow');
      $('.current-event-container').append(animatedHTML);
    }
      
    }
      //  DELETE BUTTON 

      $('#cancelButton').on('click', function (e) {
        $('.flash-message').html();
        e.preventDefault();
        var EventId = event._id
        deleteInvites(EventId, "");
        $.get('/redirect');
        $('.current-event-container').fadeOut();
        $('.flash-message').prepend('<h4>We crossed you of the list</h4>');
      })
  })
}
