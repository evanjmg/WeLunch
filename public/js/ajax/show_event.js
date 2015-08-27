
$(function () {
  getEvents();


});

//   /**
//    * Set button action to trigger jTinder like & dislike.
//    */
//   $('.actions .like, .actions .dislike').click(function(e){
//     e.preventDefault();
//     $("#tinderslide").jTinder($(this).attr('class'));
//   });
// })

function getEvents () {

   $.ajax({
     type: "get",
     url: "/api/events/",
     contentType: "json", 
     dataType: "json"
   }).done(function(data, response){
    var html='',i=1;
    for(i;i<data.length;i++) {
      html += "<li class='pane"+ String(i)+"'><div class='img'></div><div>"+data[i].title+"</div><div>"+data[i].location+"</div><div>"+data[i].message+"</div><div class='like'></div><div class='dislike'></div></li>"
    }
     $('ul').append(html);

     $("#tinderslide").jTinder({
       // dislike callback
         onDislike: function (item) {
           // set the status text
             $('#status').html('Dislike image ' + (item.index()+1));
         },
       // like callback
         onLike: function (item) {
           // set the status text
             $('#status').html('Like image ' + (item.index()+1));
         },  
       animationRevertSpeed: 200,
       animationSpeed: 400,
       threshold: 1,
       likeSelector: '.like',
       dislikeSelector: '.dislike'
     });
     $('.actions .like, .actions .dislike').click(function(e){
       e.preventDefault();
       $("#tinderslide").jTinder($(this).attr('class'));
     });


    
   });
}

