request.oneerr = function() {
  //there was a connection error or something else went wrong
  console.log("connection didnt go through");
}

function getEvent (id) {
  $.ajax('/api/events/'+ id, {
        success: function(data) {
          console.log(data)
        }});
  $.get('http://localhost:8000/api/events/'+ id, function (data) {
    console.log(data)
  })
}





//** SOCIAL SHARE ********************

//https://github.com/carrot/share-button