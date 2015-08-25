$(function () {
  
  //   $.get('/api/users/authenticated', function (data) {
  //       console.log(data);
  //     window.localStorage.setItem('token', data.token); 
  //       var token = window.localStorage.getItem('token');

  //       if (token) {
  //         $.ajaxSetup({
  //           headers: {
  //             'x-access-token': token
  //           }
  //         });
  //       }
   
  // });
    $.get('/api/events', function(data){
      console.log(data)
    })
}); 

