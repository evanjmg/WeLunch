$(function () {

  $(".test").on("click", function(){
    event.preventDefault();
    $.ajax({
      type: "get",
      url: $(this).attr("href"),
      dataType: "json"
    }).done(function(data, response){
      console.log(data, response);
    });
  });

}); 

