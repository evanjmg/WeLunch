$(function () {
getEvent("55d9e7d7514778bfcd79ff04");
});

function getEvent (id) {
  $.ajax('/api/events/'+ id, {
        success: function(data) {
          console.log(data)
        }});
  // $.get('http://localhost:8000/api/events/'+ id, function (data) {
  //   console.log(data)
  // })
}


//** SOCIAL SHARE ********************

//https://github.com/carrot/share-button