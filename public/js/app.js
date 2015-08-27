$(function(){
  $(document).foundation({orbit: {animation: 'fade',
    timer_speed: 3000,
    animation_speed: 400,
    stack_on_small: false,
    navigation_arrows: false,
    slide_number: false,
    pause_on_hover: false,
    resume_on_mouseout: false,
    bullets: false,
    variable_height: false,}
  });

  // Setup jTinder only on the tinderslide page
  if ($("#tinderslide").length > 0) { 
    getEvents();
  }
});


function getEvents() {
  console.log("Getting events...")
  $.ajax({
    type: "get",
    url: "/api/invites/pending",
    contentType: "json",
    dataType: "json"
  }).done(function(data, response){

    // Loop through the events received and create an HTML string
    var html = "";
    $.each(data, function(index, meeting){
      html += "<li class='pane"+index+"'><input class='.pending-invitation-id' type='hidden' value='"+ meeting._id+"'><div>"+meeting.title+"</div><div>"+meeting.location+"</div><div>"+meeting.message+"</div><div class='like'></div><div class='dislike'></div></li>"
    });

    // Append the HTML string
    $('#tinderslide ul').append(html);

    // Make the Tinderslide work for the ul
    $("#tinderslide").jTinder({
      onDislike: function(item) {
        
        $('#status').html('Invitation Declined ');
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
  });
};