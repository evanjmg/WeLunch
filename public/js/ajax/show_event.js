var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8000/api/events/', true);
request.onload =  function() {
  if(request.status >= 200 && request.status < 400) {
  //Success
  var resp = request.responseText;
  console.log(resp);
  } else {
    // Reached target server but there is a problem...
    console.log("uh oh...");
     }
}
request.send();

request.oneerr = function() {
  //there was a connection error or something else went wrong
  console.log("connection didnt go through");
}

/*$(function () {
getEvent("55d9e7d7514778bfcd79ff04");
});

function getEvent (id) {
  $.ajax('/api/events/'+ id, {
        success: function(data) {
          console.log(data)
        }});
  $.get('http://localhost:8000/api/events/'+ id, function (data) {
    console.log(data)
  })
}
*/
$.ajax
({
  type: "POST",
  url: "http://localhost:8000/api/events/",
  crossDomain:true, 
  dataType: "json",
  data:JSON.stringify({title: "", location: "", message: "" )
 }).done(function ( data ) {
      alert("ajax callback response:"+JSON.stringify(data));
   })





//** SOCIAL SHARE ********************

//https://github.com/carrot/share-button