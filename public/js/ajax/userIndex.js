// var Evan = User.create({'local.name': 'Evan', 'linkedin.location': 'London', 'linkedin.industry': 'Technology', 'linkedin.avatar': 'https://avatars3.githubusercontent.com/u/9342155?v=3&s=460'});


function getUsers (){

	$.ajax({
		type: "get",
		url: "/api/users",
		contentType: "json",
		dataType: "json"
	}).done(function(data, response){
		var html='',i=1;
		for(i;i<data.length;i++) {
			html += "<"
		}
	})
}



