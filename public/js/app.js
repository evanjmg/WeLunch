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
      html += "<li class='pane"+index+"'><div>"+meeting.title+"</div><div>"+meeting.location+"</div><div>"+meeting.message+"</div><div class='like'></div><div class='dislike'></div></li>"
    });

    // Append the HTML string
    $('#tinderslide ul').append(html);

    // Make the Tinderslide work for the ul
    $("#tinderslide").jTinder({
      onDislike: function(item) {
        $('#status').html('Invitation Declined ' + (item.index()+1));
      },
      onLike: function (item) {
        $('#status').html('Invitation Accepted ' + (item.index()+1));
      },  
        animationRevertSpeed: 200,
        animationSpeed: 400,
        threshold: 1,
        likeSelector: '.like',
        dislikeSelector: '.dislike'
      });

    // Setup LIKE/DISLIKE buttons
    $('.actions .like, .actions .dislike').click(function(e){
      e.preventDefault();
      $("#tinderslide").jTinder($(this).attr('class'));
    });
  });
};