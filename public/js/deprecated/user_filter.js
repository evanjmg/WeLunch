
//** JQUERY********************



//** USER REAL TIME FILTER ********************

//https://github.com/cheeaun/jquery.livefilter

(function($){
	$.fn.liveFilter = function(inputEl, filterEl, options){
		var defaults = {
			filterChildSelector: null,
			filter: function(el, val){
				return $(el).text().toUpperCase().indexOf(val.toUpperCase()) >= 0;
			},
			before: function(){},
			after: function(){}
		};
		var options = $.extend(defaults, options);
		
		var el = $(this).find(filterEl);
		if (options.filterChildSelector) el = el.find(options.filterChildSelector);

		var filter = options.filter;
		$(inputEl).keyup(function(){
			var val = $(this).val();
			var contains = el.filter(function(){
				return filter(this, val);
			});
			var containsNot = el.not(contains);
			if (options.filterChildSelector){
				contains = contains.parents(filterEl);
				containsNot = containsNot.parents(filterEl).hide();
			}
			
			options.before.call(this, contains, containsNot);
			
			contains.show();
			containsNot.hide();
			
			if (val === '') {
				contains.show();
				containsNot.show();
			}
			
			options.after.call(this, contains, containsNot);
		});
	}
});

//** RENDER HTML ********************

<fieldset>
    <legend><label for="livefilter-input">Type anything.</label></legend>
    <input id="livefilter-input" type="text" value="">
    <ul id="livefilter-list">
      <li><a href="#">user1</a></li>
      <li><a href="#">user2</a></li>
      <li><a href="#">interesting</a></li>
      <li><a href="#">javascript</a></li>
      <li><a href="#">css</a></li>
      <li><a href="#">html</a></li>
      <li><a href="#">script</a></li>
      <li><a href="#">international</a></li>
    </ul>
  </fieldset>
		

//** GEOLOCATION SORT ********************

//https://github.com/teleject/HTML5-GeoLocation-jQuery-Plugin





 

