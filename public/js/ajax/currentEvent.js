$(function () {
  showCurrentEvent() 
})

function showCurrentEvent () {

  $.ajax({
   type: "get",
   url: "/api/events/current",
   contentType: "json", 
   dataType: "json"
 }).done(function(data, response){
    if(data.event) {
   var html = "<h2>"+data.event.title+"</h2></br><h3 style='font-style:italic'>"+data.event.message+"</h3></br><h3>"+moment(data.event.start_time).format('MMMM Do, h:mm -')+moment(data.event.end_time).format('h:mm')+"</h3><div class='clock'></div></br><h3>"+data.event.place+"</h3><h4 class='event-location'>"+data.event.location+"</h4><a href='#' id='map-click'><h4 style='color:#1dc39f'>click for map</h4></a></br><h3>Host:</h3><div class='row' style='width:50%;'><div class='small-6 columns'><img src='"+data.event._owner.linkedin.avatar+"' style='display:inline-block'></div><div class='small-6 columns'><h3>"+data.event._owner.local.name+"</h3></div></div></br><div class='row text-center'><input type='submit' id='cancelButton' value='Cancel'><input type='submit' id='inviteMoreButton' value='Invite More'></div><h2 id='whos-invited'>Who's Invited?</h2></br></div>"


   var animatedHTML = $(html).hide().fadeIn();
   $('.current-event-container').append(animatedHTML);
   countDown(data.event.start_time);
   var i=0;
   for (i;i< data.event.invites.length;i++) {
    var html = "<div class='row'><div class='medium-4 large-4 columns text-center'><img src='"+data.event.invites[i]._invitee.linkedin.avatar+"'><h4>"+data.event.invites[i]._invitee.local.name+"</h4></div>"
    var animatedHTML = $(html).hide().slideDown('slow');
    $('.current-event-container').append(animatedHTML);
  }
    
  }
  if(data.event.invites.length == 0) {
    $('#whos-invited').after("<h4>You haven't invited anyone. Please Click the Button Above</h4>")
  }
  // INVITE MORE init
    inviteMore()

    //  DELETE BUTTON 

    $('#cancelButton').on('click', function () {
      $('.flash-message').html();
      event.preventDefault();
      var EventId = data.event._id
     deleteEvent(EventId);
     })
    // MAP

  $('#map-click').insertAfter('<div id="googleMap" class="row googleMap"></div>');
  // $('#map-click').hide();
  // $('.event-location').hide();

  if (data.event.latitude && data.event.longitude) { 
    // $('.event-location').show();
    // $('#map-click').show();
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
function inviteMore() {
  $('#inviteMoreButton').on('click', function () {
    event.preventDefault();
    $('.main-container').html('');
    $('.current-event-container').html('');
    $('.main-container').append('<div class="row invite-users-page"></div>');
    getUsers() 

  })
}

function deleteEvent(EventId) {
  var url = '/api/events/'+ EventId
  $.ajax({
    type: 'delete',
    traditional: true,
    url: url, 
    data: EventId
  }).done( function (data,response) {
    $('.current-event-container').fadeOut();
    $('.flash-message').prepend('<h4>Succesfully Cancelled Event!</h4>');
    showCurrentEvent();
});
}


function countDown(startTime) {
  // setInterval(function time(){
  //   var beginHour = moment(startTime).format('h');
  //   var beginMinutes = moment(startTime).format('mm');
  //   var d = new Date();
  //   var hours = beginHour - d.getHours();
  //   var min = Math.abs(beginMinutes - d.getMinutes());
  //   if((min + '').length == 1){
  //     min = '0' + min;
  //   }
  //   var sec = 60 - d.getSeconds();
  //   if((sec + '').length == 1){
  //         sec = '0' + sec;
  //   }
  //   jQuery('.clock').html(hours+':'+min)
  // }, 1000);
  // $('.clock').countdown({startTime: "01:12:32:55"});
  // var mins = 10;  //Set the number of minutes you need
  // var secs = mins * 60;
  // var currentSeconds = 0;
  // var currentMinutes = 0;
  // /* 
  //  * The following line has been commented out due to a suggestion left in the comments. The line below it has not been tested. 
  //  * setTimeout('Decrement()',1000);
  //  */
  // setTimeout(Decrement,1000); 

  // function Decrement() {
  //     currentMinutes = Math.floor(secs / 60);
  //     currentSeconds = secs % 60;
  //     if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
  //     secs--;
  //     document.getElementById("timerText").innerHTML = currentMinutes + ":" + currentSeconds; //Set the element id you need the time put into.
  //     if(secs !== -1) setTimeout('Decrement()',1000);
  // }
      // var date = new Date(startTime);
      //    var today = new Date();
         
      //    var dif = date.getTime() - today.getTime();
         
      //    var timeLeft = Math.abs(dif/1000)/60;
         
      //    var clock = $('.clock').FlipClock({
      //        autoStart: false,
      //        clockFace: 'DailyCounter',
      //        countdown: true
      //    });
         
      //    clock.setTime(timeLeft);
      //    clock.start();     

      // var clock = $('.clock').FlipClock(diff,{
          // clockFace: 'TwentyFourHourClock',
      //     countdown: true
      // }); 
// clock.TwentyFourHourClock = FlipClock.Face.extend({
  
//   build: function() {
//       
  
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
