$(function (){
  // Setup jTinder only on the tinderslide page
  if ($("#tinderslide").length > 0) { 
    getEvents();
  } 
})


function getEvents() {
  console.log("Getting events...")
  $.ajax({
    type: "get",
    url: "/api/invites/pending",
    error: function() {
      $('body').css('overflow', 'scroll !important');

          location.href = '/events/create'
         
          

      },
    contentType: "json",
    dataType: "json"
  }).done(function(data, response){
    var html = "";
    $.each(data.invites, function(index, meeting){
      html += "<li class='pane"+index+"'><input class='.pending-invitation-id' type='hidden' value='"+ meeting._id+"'><div><img src="+meeting._owner.linkedin.avatar+"></div><div>"+meeting._owner.local.name+"</div><div>"+meeting.title+"</div><div>"+ moment(meeting.start_time).format('h:mm a') +"</div><div>"+meeting.location+"</div><div>"+meeting.message+"</div><div class='like'></div><div class='dislike'></div></li>"
    });




    // Append the HTML string
    $('#tinderslide ul').append(html);

    // Make the Tinderslide work for the ul
    $("#tinderslide").jTinder({
      onDislike: function(item) {
        var invitationsUl = ($('#tinderslide').children('ul')[0]);
        var currentInvitation = $(invitationsUl).children().last('li')[0];
        console.log(data.currentUserId);
        deleteInvites($(currentInvitation).children('input').val(), data.currentUserId);
        currentInvitation.remove();
        $('#status').html('Invitation Declined');
      },

      onLike: function (item) {
        var invitationsUl = ($('#tinderslide').children('ul')[0]);
        var currentInvitation = $(invitationsUl).children().last('li')[0];
        acceptInvites($(currentInvitation).children('input').val());
        currentInvitation.remove();
        $('#status').html('Invitation Accepted');
      },  

      animationRevertSpeed: 200,
      animationSpeed: 400,
      threshold: 1,
      likeSelector: '.like',
      dislikeSelector: '.dislike'
    });

    $('.like').on('click', function (){
      e.preventDefault();
    })

    // Setup LIKE/DISLIKE buttons
    $('.actions .like, .actions .dislike').click(function(e){
      e.preventDefault();
      $("#tinderslide").jTinder($(this).attr('class'));

    });
    console.log(response.message)
  
  });

};