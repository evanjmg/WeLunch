$(function () {
timeSlider();
// addTimesToInputs Should be ran on form submit with ajax
addTimesToInputs();
});

var addTimesToInputs = function () {
  // console.log($('.slider-time').html())
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
 // messy thing we tried doing
var timeSlider = function () {
  var dt_from = "2014-11-01 " + String((parseInt(getDateTime().substring(0,2)))-1) + ":" + getDateTime().substring(3,8); 
  var dt_to = "2014-11-01 " + getDateTime();

  $('.slider-time').html(dt_from.substring(11,16));
  $('.slider-time2').html(dt_to.substring(11,16));
  var min_val = Date.parse(dt_from)/1000;
  var max_val = Date.parse(dt_to)/1000;

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
      return  hours + ':' + minutes + ':' + seconds;
  };


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