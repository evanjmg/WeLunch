
//** JQUERY ADDRESS PICKER *****************************

//http://xilinus.com/jquery-addresspicker/demos/index.html


$(function() {
    var addresspicker = $( "#addresspicker" ).addresspicker({
      componentsFilter: 'country:FR'
    });
    var addresspickerMap = $( "#addresspicker_map" ).addresspicker({
      language: "en",
      updateCallback: showCallback,
      mapOptions: {
        zoom: 4,
        center: new google.maps.LatLng(46, 2),
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      elements: {
        map:      "#map",
        street_number: '#street_number',
        route: '#route',
        locality: '#locality',
        country:  '#country',
        postal_code: '#postal_code',
      }
    });
    var gmarker = addresspickerMap.addresspicker( "marker");
    gmarker.setVisible(true);
    addresspickerMap.addresspicker( "updatePosition");
    $('#reverseGeocode').change(function(){
      $("#addresspicker_map").addresspicker("option", "reverseGeocode", ($(this).val() === 'true'));
    });
    function showCallback(geocodeResult, parsedGeocodeResult){
      $('#callback_result').text(JSON.stringify(parsedGeocodeResult, null, 4));
    }
    // Update zoom field
    var map = $("#addresspicker_map").addresspicker("map");
    google.maps.event.addListener(map, 'idle', function(){
      $('#zoom').val(map.getZoom());
    });
  });

//** RENDER HTML *****************************

//Default address picker, only autocomplete.

<div class='input'>
  <label>Address : </label><input id="addresspicker" />
</div>

//Address picker, with instant display selection on map.

<div class='clearfix'>
  <div class='input input-positioned'>
    <label>Address : </label> <input id="addresspicker_map" />   <br/>
    <label>Locality: </label> <input id="locality" disabled=disabled> <br/>
    <label>Country:  </label> <input id="country" disabled=disabled> <br/>
    <label>Postal Code: </label> <input id="postal_code" disabled=disabled> <br/>
  </div>

  <div class='map-wrapper'>
    <label id="geo_label" for="reverseGeocode">Reverse Geocode after Marker Drag?</label>
    <select id="reverseGeocode">
      <option value="false" selected>No</option>
      <option value="true">Yes</option>
    </select><br/>

    <div id="map"></div>
    <div id="legend">You can drag and drop the marker to the correct location</div>
  </div>
</div>










