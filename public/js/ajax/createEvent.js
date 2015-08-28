$(function () {
  timeSlider();
  addTimesToInputs();
  createButton();
});
// Geolocation
 function GeoL(position) {
   latitude = position.coords.latitude;
   longitude = position.coords.longitude;
 }
  var columnleft, latitude, longitude, type,counter=0;
  
  function geoCodeLocation (query, Event){
    geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': $('#location').val(), 'componentRestrictions':{'country':'GB'}}, 
function(results, status){
                if (status == google.maps.GeocoderStatus.OK) {
     var latitude = results[0].geometry.location.lat();
     var longitude = results[0].geometry.location.lng();
     console.log(results, status);
  var latlon = [latitude, longitude]
     Event['longitude'] = latlon[1]
     Event['latitude'] = latlon[0];
     console.log(Event);
     postEvent(Event);
     $('.create-event-form-container').slideUp();
     getUsers();
        }});
      }

var eventFields = ["title", "location", "message", "place" ]
function createButton () {
  $('.eventsCreateButton').on('click', function () {
    event.preventDefault();
    var Event = {}
    $.each(eventFields, function (i, field) {
      Event[field] = $('#createEventForm').children('#' + field).val()
    });
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = year + "/" + month + "/" + day;
    Event['start_time'] = newdate +" "+ $('#start_time').html() + ":00";
    Event['end_time'] = newdate +" "+ $('#end_time').html() + ":00";
    geoCodeLocation($('#location').val(), Event);
    $('.main-container').append("<div class='invite-users-page'></div>")
  })
}
// 'start_time', 'end-time'
function postEvent (Event) {
  console.log(Event);
  $.ajax({
      type: "post",
      url: "/api/events",
      data: Event
  })
}
// function putUserLocation(Event) {
//   console.log(Event);
//   $.ajax({
//       type: "put",
//       url: "/api/users/id..",
//       data: { latitude: , longitude: }
//   })
// }


function addTimesToInputs() {
  $('#start-time').val($('.slider-time').html());
  $('#end-time').val($('.slider-time2').html());
}

function getDateTime() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return  hour + ":" + min + ":" + sec; 
}

Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

function timeSlider () {
  var dt_from ="2014-11-01 " + getDateTime();
  var dt_to = "2014-11-01 " + String(23) + ":" + getDateTime().substring(3,8); 

  $('.slider-time').html(dt_from.substring(11,16));
  $('.slider-time2').html(dt_to.substring(11,16));
  var min_val = Date.parse(dt_from)/1000;
  var max_val = Date.parse(dt_to)/1000;


$("#slider-range").slider({
  range: true,
  min: min_val,
  max: max_val,
  step: 10,
  values: [min_val, max_val],
  slide: function (e, ui) {
      var dt_cur_from = new Date(ui.values[0]*1000); //.format("yyyy-mm-dd hh:ii:ss");
      $('.slider-time').html(formatDT(dt_cur_from));

      var dt_cur_to = new Date(ui.values[1]*1000); //.format("yyyy-mm-dd hh:ii:ss");                
      $('.slider-time2').html(formatDT(dt_cur_to));
    }
  });
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function formatDT(__dt) {
  var year = __dt.getFullYear();
  var month = zeroPad(__dt.getMonth()+1, 2);
  var date = zeroPad(__dt.getDate(), 2);
  var hours = zeroPad(__dt.getHours(), 2);
  var minutes = zeroPad(__dt.getMinutes(), 2);
  var seconds = zeroPad(__dt.getSeconds(), 2);
  return  hours + ':' + minutes
};


       


