# WeLunch
WeLunch is an app designed to help you meet likeminded professionals for lunch.

Demo: http://www.welunch.uk/
![We♥Lunch](http://i1301.photobucket.com/albums/ag118/francescatabor89/We%20Lunch/10469770_985689724816595_2687632634406091301_n_zpsucx3clvc.jpg)
Powered by Linkedin


##Build: 
- Back-end: Node.js, MongoDB, Mongoose
- Front-end: Foundation, SASS, jQuery, Animate.css, AJAX
- APIs: Linkedin Oauth
- Languages: Javascript, HTML, CSS

##Objectives

* Design a RESTful JSON API
* Retrieve Data from the API
* Use JQuery to append data to HTML elements
* Contrast how Handlebars can refactor your code
* Send data to the API and, on success, maintain state between the DB and the DOM
* Deleting, Updating and Editing through Ajax


#ERD
![We Lunch User/Event/Invitaiton Model](#)


#Wireframes
![Wireframes_Landing Page & Signup](http://i1301.photobucket.com/albums/ag118/francescatabor89/We%20Lunch/WeLunch_Landing%20Page%20amp%20Sign%20up_zpsp5rg8vj1.png)
![Wireframes_Event Mangement](http://i1301.photobucket.com/albums/ag118/francescatabor89/We%20Lunch/WeLunch_Lunch%20Event%20Managment_zpskg3fivcx.png)
![Wireframes_Invitations & Upgrading](http://i1301.photobucket.com/albums/ag118/francescatabor89/We%20Lunch/WeLunch_Invitations%20amp%20Upgrading_zpsc36rulbp.png)


##WDI Presentation

###Demo

* Show how the app responds to our AJAX requests with the exact data it needs

1. * Make an AJAX GET request to /users/:id/invitations
2. * When the responce is recieved we will need to append the data to the page:
3. * Create an empty unordered list
4. * Loop through the AJAX response and on each iteration create an li that contains the event title, location, organiser and time - based on the events data, which is the parent of invitation. 
5. * We then append the li to the ul
6. * After all the li's have been appended to the ul, we append the ul to the list. 

##Discussion Points

* The differences between a typical API and a JSON API
* What are the implications of have a centralized API? 
* SPA CRUD: Single-page app's (SPAs) are made possible due to asynchronicity. They provide fluid user experiences akin to native applications.
