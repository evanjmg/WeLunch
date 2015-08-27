$(function () {
  showCurrentEvent();
})

function showCurrentEvent () {
  console.log('running');
   $.ajax({
     type: "get",
     url: "/api/events/current",
     contentType: "json", 
     dataType: "json"
   }).done(function(data, response){
   console.log(data,response)
   var html = "<h1>"+data.event.title+"</h1></br><h3>"+data.event.message+"</h3></br><h3>"+ moment(data.event.start_time).format('MMMM Do, h:mm -')+moment(data.event.end_time).format('h:mm')+"</h3><h4>coutdown</h4></br><h3>"+data.event.place+"</h3><h4>"+data.event.location+"</h4><a href='#' id='map-click'><h4 style='color:#1dc39f'>click for map</h4></a></br></br><h2>Who's Invited?</h2></br></div>"
  var animatedHTML = $(html).hide().fadeIn();
 $('.current-event-container').append(animatedHTML);
 var i=0;
  for (i;i< data.event.invites.length;i++) {
  var html = "<div class='row'><div class='medium-4 large-4 columns text-center'><img src='"+data.event.invites[i]._invitee.linkedin.avatar+"'><h4>"+data.event.invites[i]._invitee.local.name+"</h4></div>"

     var animatedHTML = $(html).hide().slideDown('slow');
    $('.current-event-container').append(animatedHTML);
}
    });
   $('#map-click').on('click', function () {
    event.preventDefault();
   console.log('clicked')
    var myCenter=new google.maps.LatLng(data.event.latitude,data.event.longitude);
      
        var mapProp = {
          center:myCenter,
          zoom:14,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };

        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        var marker=new google.maps.Marker({
          position:myCenter,
        });
        marker.setMap(map);
    
      google.maps.event.addDomListener(window, 'load', initialize);
    $(this).append('<div id="googleMap" class="row googleMap"></div>')
   })
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
