$(function (){
  getInvites();
})

function getInvites (){
  console.log("your current invitations...")
  $.ajax({
    type: "get",
    url: "/api/invites",
    contentType: "json",
    dataType: "json"
  }).done(function(data, response){
    console.log(data);
    var html='',i=0;
    for(i;i< data.invites.length;i++) {
      html += "<div class='row'><div class='large-12 columns'><div class='row'><div class='large-12 columns'><div class='large-8 columns'><div class='row'><div class='large-4 small-6 columns'><img src='"+ data.invites[i].linkedin.avatar+ "'><div class='alert-box'><strong>Invite</strong>'"+ data.invites[i].local.name+ "'<a href='#' class='close'>+</a></div></div></div></div></div></div></div></div>"
    };console.log(html)
    $('#usersInvite').append(html)
  });
};

/*function getInvites() {
  console.log("Getting your invitations...")
  $.ajax({
    type: "get",
    url: "/api/invites/",
    contentType: "json",
    dataType: "json"
  }).done(function(data, response){

    // Loop through the events received and create an HTML string
    var html = "";
    $.each(data, function(index, meeting){
      html += "<li class='pane"+index+"'><div>"+meeting.title+"</div><div>"+meeting.location+"</div><div>"+meeting.message+"</div><div class='like'></div><div class='dislike'></div></li>"
    });
*/