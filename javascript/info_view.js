$( document ).ready(function() {
  // Creating the application namespace
  window.app = window.app || {};
  
  var foodTruckTemplate = " <div id='info'> \
                            <div id = 'food-trucks'> \
                              <div class = 'panel panel-primary'> \
                                <div class = 'panel-heading'>Filter your results</div> \
                                <span>Select distance in miles:</span> \
                                <span class = 'custom-select'> \
                                  <select id = 'user-distance'> \
                                    <option>1</option> \
                                    <option>1.5</option> \
                                    <option>2</option> \
                                    <option>2.5</option> \
                                    <option>3</option> \
                                    <option>3.5</option> \
                                    <option>4</option> \
                                    <option>4.5</option> \
                                    <option>5</option> \
                                  </select> \
                                </span>  \
                                <span>Select Location:</span> \
                                <span id = 'user-preference' class = 'custom-select'> \
                                  <select class = 'drop-down'></select> \
                                </span> \
                                <span>Whats on your mind?:</span> \
                                <span class = 'custom-select'> \
                                  <select id = 'user-food-type'> \
                                    <option value = '0'>Select food type</option> \
                                    <option value = 'breakfast'>Breakfast</option> \
                                    <option value = 'burgers'>Burgers</option> \
                                    <option value = 'chinese'>Chinese</option> \
                                    <option value = 'dessert'>Dessert</option> \
                                    <option value = 'filipino'>Filipino</option> \
                                    <option value = 'dog'>Hot/Chili Dogs</option> \
                                    <option value = 'indian'>Indian</option> \
                                    <option value = 'korean'>Korean</option> \
                                    <option value = 'mexican'>Mexican</option> \
                                    <option value = 'middle-eastern'>Middle Eastern</option> \
                                    <option value = 'organic'>Organic</option> \
                                    <option value = 'peruvian'>Peruvian</option> \
                                    <option value = 'pizza'>Pizza</option> \
                                    <option value = 'sandwich'>Sandwiches</option> \
                                    <option value = 'sea-food'>Sea Food</option> \
                                    <option value = 'soups'>Soups</option> \
                                    <option value = 'sushi'>Sushi</option> \
                                    <option value = 'vietnamese'>Vietnamese</option> \
                                  </select> \
                                </span> \
                                <span>Search for food truck by Name:</span> \
                                <span><input type = 'text' id = 'search-by-name'/></span> \
                              </div> \
                              <div>Displaying results for: <span id = 'filtered-results'></span></div> \
                              <div>Use your current location<input type = 'checkbox' id = 'use-your-location'/> (Use only if in San Francisco)</div> \
                              <div id = 'spinner' class = 'loading-bg hidden'></div> \
                              <div id = 'googleMap' class = 'google-map'></div> \
                              </div> \
                            </div> \
                            <br> \
                            <br>";

  var mainView = Backbone.View.extend({
    el: '#main',

    initialize: function () {
      console.log('Initialized');
    },

    events: {
      'click #food-truck' : 'loadFoodTrucksInfo'
    },

    loadFoodTrucksInfo: function () {
      console.log('here');
      var template = Handlebars.compile(foodTruckTemplate);
      $('#main-info').html(template);
      // Loading the backbone view with a location at the center of San Francisco
      var mapProp = {
        center: new google.maps.LatLng(37.7833,-122.4167),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var mapValue = new google.maps.Map(document.getElementById('googleMap'), mapProp);

      // Populating the model info and setting it on the view
      var map = new window.app.foodTruckMap({
        latitude: 37.7833,
        longitude: -122.4167,
        map: mapValue,
        markers: []
      });
      window.app.view = new window.app.foodTruckView({
        model : map
      });
    }

  });
  var newView = new mainView();
});