$(function () {
  // showCurrentEvent() 
})


function countDown(startTime) {
      var date = new Date(startTime);
      var today = new Date();

      var dif = date.getTime() - today.getTime();

      var timeLeft = Math.abs(dif/1000)/60;


      var clock = $('.clock').FlipClock({
          autoStart: false,
          clockFace: 'DailyCounter',
          countdown: true
      });

      clock.setTime(timeLeft);
      clock.start();   
  
}

function showCurrentEvent () {

  console.log('running');
  $.ajax({
   type: "get",
   url: "/api/events/current",
   contentType: "json", 
   dataType: "json"
 }).done(function(data, response){
   console.log(data,response)
   var html = "<h2>"+data.event.title+"</h2></br><h3 style='font-style:italic'>"+data.event.message+"</h3></br><h3>"+moment(data.event.start_time).format('MMMM Do, h:mm -')+moment(data.event.end_time).format('h:mm')+"</h3><h4><div class='.clock'></div></h4></br><h3>"+data.event.place+"</h3><h4 class='event-location'>"+data.event.location+"</h4><a href='#' id='map-click'><h4 style='color:#1dc39f'>click for map</h4></a></br><h3>Host:</h3><div class='row' style='width:50%;'><div class='small-6 columns'><img src='"+data.event._owner.linkedin.avatar+"' style='display:inline-block'></div><div class='small-6 columns'><h3>"+data.event._owner.local.name+"</h3></div></div></br><h2>Who's Invited?</h2></br></div>"
   
   countDown(data.event.start_time)

   var animatedHTML = $(html).hide().fadeIn();
   $('.current-event-container').append(animatedHTML);
   var i=0;
   for (i;i< data.event.invites.length;i++) {
    var html = "<div class='row'><div class='medium-4 large-4 columns text-center'><img src='"+data.event.invites[i]._invitee.linkedin.avatar+"'><h4>"+data.event.invites[i]._invitee.local.name+"</h4></div>"
    var animatedHTML = $(html).hide().slideDown('slow');
    $('.current-event-container').append(animatedHTML);
  }
    
  $('#map-click').insertAfter('<div id="googleMap" class="row googleMap"></div>');
  $('#map-click').hide();
  $('.event-location').hide();
  if (data.event.latitude && data.event.longitude) { 
    $('.event-location').show();
    $('#map-click').show();
    $('#map-click').on('click', function () {
     event.preventDefault();

     var myCenter = new google.maps.LatLng(data.event.latitude,data.event.longitude);
     console.log(myCenter);
     var mapProp = {
       center:myCenter,
       zoom:14,
       mapTypeId:google.maps.MapTypeId.ROADMAP
     };
     console.log(mapProp)
     var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
     var marker=new google.maps.Marker({
       position:myCenter,
     });
     marker.setMap(map);

     google.maps.event.addDomListener(window, 'load', initialize);
   })
  }
  });
}







 //   <div class="medium-4 large-4 columns text-center">
 //     <img src="http://placehold.it/300x250&text=[things]">
 //     <h4>Francesca Tabor</h4>
 //   </div>
 //   <div class="medium-4 large-4 columns text-center">
 //     <img src="http://placehold.it/300x250&text=[things]">
 //     <h4>Francesca Tabor</h4>
 //   </div>
 //   <div class="medium-4 large-4 columns text-center">
 //     <img src="http://placehold.it/300x250&text=[things]">
 //     <h4>Francesca Tabor</h4>
 //   </div>
 //   <div class="medium-4 large-4 columns text-center">
 //     <img src="http://placehold.it/300x250&text=[things]">
 //     <h4>Francesca Tabor</h4>
 //   </div>
