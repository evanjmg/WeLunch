
$(function () {
  getEvents();
})

function getEvents () {

   $.ajax({
     type: "get",
     url: "/api/events/",
     contentType: "json",
     dataType: "json"
   }).done(function(data, response){
    var html, i=0;
    for(i;i<data.length;i++) {
      html += "<li>"+data[i].title+"<p>"+data[i].location + "</p></li>"
    }
     $('body').prepend(html);
    
   });
}






//** SOCIAL SHARE ********************

//https://github.com/carrot/share-button