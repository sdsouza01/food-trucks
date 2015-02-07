<?php

?>
<html>
<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="http://maps.googleapis.com/maps/api/js"></script>
  <script src="handlebars-v2.js"></script>
  <script src="php_test.js"></script>
  <script src="underscore.js"></script>
  <script src="backbone.js"></script>

  <!--<script id="some-template" type="text/x-handlebars-template">
    <select id="user-selection">
      {{#each locations}}
        <option value="{{location}}">{{location}}</option>
      {{/each}}
    </select>
  </script>-->

  <script>
    google.maps.event.addDomListener(window, 'load', initialize);

    /*function updateResults() {
      $.ajax({
        type: 'GET',
        url: 'php_test/php/php_filter_data.php',
        dataType: 'json',
        data: {text: $("#user-selection").val()}
      })
        .done(function(data){
          var myCenter = new google.maps.LatLng(37.7833,-122.4167);
          var mapProp = {
            center:myCenter,
            zoom:14,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
          var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
          $.each(data, function(key, value){
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
              map: map,
              title: value.applicant
            });

            google.maps.event.addListener(map, 'click', getCoOrds);

            google.maps.event.addListener(marker, 'click', function() {
              var infowindow = new google.maps.InfoWindow({
                content: value.applicant + '<br>' + value.fooditems + '<br>' + value.locationdescription
              });
              infowindow.open(map,marker);
            });
          });
        });
    }*/

    /*function getCoOrds (event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      var myCenter = new google.maps.LatLng(lat,lng);
      // populate yor box/field with lat, lng
      var mapProp = {
        center:myCenter,
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };

      var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

      var marker = new google.maps.Marker({
        position:myCenter,
      });

      marker.setMap(map);

      var myCity = new google.maps.Circle({
        center:myCenter,
        radius:1609,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
      });

      myCity.setMap(map);
      google.maps.event.addListener(map, 'click', getCoOrds);

    }*/


    function initialize() {
      /*var myCenter = new google.maps.LatLng(37.7833,-122.4167);
      var mapProp = {
        center:myCenter,
        zoom:14,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

      google.maps.event.addListener(map, 'click', getCoOrds);

      var marker=new google.maps.Marker({
        position:myCenter,
        icon:'arrow.png'
      });

      marker.setMap(map);

      var myCity = new google.maps.Circle({
        center:myCenter,
        radius:1609,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
      });

      myCity.setMap(map);*/

      /*$.ajax({
        type: 'GET',
        url: 'php_test_data.php',
        dataType: 'json'
      })
        .done(function(data){
          $.each(data, function(key, value){
            //console.log(value.applicant);
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
              map: map,
              title: value.applicant
            });

            google.maps.event.addListener(marker, 'click', function() {
              var infowindow = new google.maps.InfoWindow({
                content: value.applicant + '<br>' + value.fooditems + '<br>' + value.locationdescription
              });
              infowindow.open(map,marker);
            });
          });
        });*/

      /*$.ajax({
        type: 'GET',
        url: 'php_test/php/food_truck_locations.php',
        dataType: 'json'
      })
        .done(function(data){
          var source   = $("#some-template").html();
          var template = Handlebars.compile(source);
          console.log({'locations': data});
          $("#user-preference").html(template({locations : data}));
        });*/
    }

  </script>
</head>
<body>
<div id="food-trucks">
  <div>
    <span>Select distance in miles:</span>
    <span>
      <select id="user-distance">
        <option>1</option>
        <option>1.5</option>
        <option>2</option>
        <option>2.5</option>
        <option>3</option>
        <option>3.5</option>
        <option>4</option>
        <option>4.5</option>
        <option>5</option>
      </select>
    </span>
    <span>Select Location:</span>
    <span id="user-preference">
      <select style="width:205px;"></select>
    </span>
    <span>Whats on your mind?:</span>
      <select>
        <option>Select food type</option>
        <option>Breakfast</option>
        <option>Burgers</option>
        <option>Chinese</option>
        <option>Dessert</option>
        <option>Filipino</option>
        <option>Hot/Chili Dogs</option>
        <option>Indian</option>
        <option>Korean</option>
        <option>Mexican</option>
        <option>Middle Eastern</option>
        <option>Organic</option>
        <option>Peruvian</option>
        <option>Pizza</option>
        <option>Sandwiches</option>
        <option>Sea Food</option>
        <option>Soups</option>
        <option>Sushi</option>
        <option>Vietnamese</option>
      </select>
    </span>
    <span>Search for food truck by Name:</span>
    <span><input type="text" id="search-by-name"/></span>
  </div>
  <br/>
  <div id="googleMap" style="width:900px;height:480px;"></div>
  </div>
</body>
</html>
