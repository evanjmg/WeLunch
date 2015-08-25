
$(function () {
  getEvent('55d9e7d7514778bfcd79ff04');
})

function getEvent (id) {

   $.ajax({
     type: "get",
     url: "/api/events/" + id,
     contentType: "json",
     dataType: "json"
   }).done(function(data, response){
     $('body').prepend("<h2>"+data.location+"</h2>", data.title, data.message);
   });
}





//** SOCIAL SHARE ********************

//https://github.com/carrot/share-button