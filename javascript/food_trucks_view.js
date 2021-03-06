$( document ).ready(function() {
  // Creating the application namespace
  window.app = window.app || {};
  
  /**
   * Handlebar template to display dropdown of streets which have food trucks
   *
   * @type {string}
   */  
  var streetList = '<select id="user-selection"> \
                    <option value="0">Select a street</option> \
                    {{#each locations}} \
                      <option value="{{location}}">{{location}}</option> \
                    {{/each}} \
                    </select>';

  window.app.foodTruckView = Backbone.View.extend({
    el :  '#info',

    collection : new window.app.foodTruckCollection(),

    model: new window.app.foodTruckMap(),
    
    /**
     * Function to bind all listeners to events from the collection
     */
    bindListeners: function() {
      this.listenTo(this.collection, 'loadedNearByFoodTrucks', this.displayNearByFoodTrucks);
      this.listenTo(this.collection, 'loadedStreets', this.displayStreetsList);
      this.listenTo(this.collection, 'updatedResults', this.displayUpdatedResults);
      this.listenTo(this.collection, 'loadedFoodTrucksByType', this.displayTrucksByFood);
      google.maps.event.addListener(this.model.get('map'), 'click', this.getCoOrds);
    },

    /**
     * List of events from UI that needs to be handled
     */
    events: {
      'change #user-selection' : 'updateResults',
      'keyup #search-by-name' : 'autocomplete',
      'change #user-food-type': 'filterTrucksByFood',
      'change #user-distance' : 'userDistanceUpdate',
      'click #use-your-location' : 'useYourLocation'
    },

    /**
     * Initialization to the view that need to be made when the page starts up
     */
    initialize : function () {
      console.log('View Initialized');
      $('#logo').attr("src", 'images/trucks.png');
      var self = this;
      self.bindListeners();

      var marker = new google.maps.Marker({
        position: self.model.getMyLocation(),
        icon:'images/arrow.png'
      });
      self.model.setCenter(marker)
      marker.setMap(self.model.get('map'));
      self.setMapCircle(self.model.get('latitude'), self.model.get('longitude'));      
      self.collection.getNearByTrucks($('#user-distance').val(), self.model.get('latitude'), self.model.get('longitude'));
      self.collection.getFoodTrucksOnStreet();
    },
    
    /**
     * Sets the map on all markers in the array.
     */
    setAllMap: function () {
      var self = this;
      var markers = self.model.get('markers');
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(self.model.get('map'));
      }
    },
    
    /**
     * Clears all amrker on the map
     */
    clearAllMarkers: function () {
      var self = this;
      var markers = self.model.get('markers');
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },
    
    /**
     * Function to get the users current location using geo location
     */
    useYourLocation: function() {
      var self = this, lat, lng;
      if ($('#use-your-location').prop('checked')) {
        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            self.model.setNewLocation(lat, lng);
            
            // Remove olds markers
            self.clearAllMarkers();        
            self.model.setMarkers([]);
            
            var circle = self.model.get('circle');
            if (circle) {
              circle.setMap(null);
            }
            self.model.resetCircle();
            
            var center = self.model.get('center');
            if (center) {
              center.setMap(null);
            }
            self.model.resetCenter();
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lat, lng),
              icon:'images/arrow.png'
            });
            self.model.setCenter(marker);
            marker.setMap(self.model.get('map'));
      
            self.setMapCircle(lat, lng);
            self.collection.getNearByTrucks($('#user-distance').val(), lat, lng);
          }, function() {
            console.log('Able to use users location');
          });
        } else {
          console.log('Unable to use users location');
        }
      }
    },

    /**
     * Function to get the near by trucks when the users search distabce increases
     */
    userDistanceUpdate: function() {
      $('#spinner').removeClass('hidden');
      var self = this;
      this.collection.getNearByTrucks($('#user-distance').val(), self.model.get('latitude'), self.model.get('longitude'));
    },

    /**
     * Function to get the food trucks when the user searched by a food type
     */
    filterTrucksByFood: function() {
      $('#spinner').removeClass('hidden');
      this.collection.getFoodTrucksByFood();
    },
    
    /**
     * Function to display the food trucks when the collection is repopulated with filtered info
     */
    displayTrucksByFood: function() {
      var self = this;
      self.clearAllMarkers();        
      self.model.setMarkers([]);
      self.markTrucksOnMap(self.collection.foodTrucks.toJSON());
      var text = 'Food trucks where you get ' + $('#user-food-type').val() + ' food';
      $('#user-food-type').val('0');
      $('#filtered-results').text(text);
      $('#spinner').addClass('hidden');
    },
    
    /**
     * Function to display the food trucks names when the user starts typing in the input search box
     */
    autocomplete: function() {
      var self = this;
      if ($('#search-by-name').val().length > 1) {
        $("#search-by-name").autocomplete({
          source: function (request, response) {
            $.ajax({
              type: 'GET',
              url: 'ajax_requests/food_truck_name_autocomplete.php',
              data: {'text': $('#search-by-name').val()},
              datatype: 'json'
            }).done(function(data) {
              var parsed = JSON.parse(data);
              var newArray = [];
              _.each(parsed, function(value, key) {
                var newObject = {
                  label: value.applicant
                };
                newArray[key] = newObject;
              });
              response(newArray);
            });
          },
          minLength: 3,
          select: function(event, ui) {
            $(this).val(ui.item.label);
            var values = ui.item.label;
            $.ajax({
              type: 'GET',
              url: 'ajax_requests/get_food_truck_by_name.php?truck_name=' + values,
              datatype: 'json',
              data: {'truck_name': values}
            })
              .done(function (data) {
                $('#spinner').removeClass('hidden');
                self.clearAllMarkers();        
                self.model.setMarkers([]);
                $('#search-by-name').val('');
                self.markTrucksOnMap($.parseJSON(data));
                $('#spinner').addClass('hidden');
              });
            var text = 'Location where ' + values + ' are located';
            $('#filtered-results').text(text);
          }
        });
      }
    },

    /**
     * Function to update the results when the user selects a street
     */
    updateResults: function() {
      $('#spinner').removeClass('hidden');
      this.collection.updateResults();
    },

    /**
     * Function to display the food trucks on the screen when the collection is populated with new filtered info
     */
    displayUpdatedResults: function() {
      var self = this;      
      self.clearAllMarkers();        
      self.model.setMarkers([]);
      self.markTrucksOnMap(self.collection.foodTrucks.toJSON());
      
      var text = 'Food trucks on ' + $('#user-selection').val() + ' street';
      $('#user-selection').val("0");
      $('#filtered-results').text(text);
      $('#spinner').addClass('hidden');
    },

    /**
     * Function to render the handlebars template to display the list of streets when the streets information has been received
     */
    displayStreetsList: function() {
      var self = this;
      var template = Handlebars.compile(streetList);
      $("#user-preference").html(template({locations : self.collection.streetsList.toJSON()}));
    },

    /**
     * Function to display markers on scrren when a users location is updated
     */
    displayNearByFoodTrucks: function() {
      var self = this;
      self.clearAllMarkers();        
      self.model.setMarkers([]);
      
      var circle = self.model.get('circle');
      if (circle) {
        circle.setMap(null);
      }
      self.model.resetCircle();
      self.setMapCircle(self.model.get('latitude'), self.model.get('longitude'));
      self.markTrucksOnMap(self.collection.foodTrucks.toJSON());
      var text = 'Near by food trucks in a ' + $('#user-distance').val() + ' radius';
      $('#filtered-results').text(text);
      $('#spinner').addClass('hidden');
    },

    /**
     * Function to get the users new coordinates when he/she clicks on a new location on the map
     */
    getCoOrds: function(event) {
      var self = window.app.view;
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      self.model.setNewLocation(lat, lng);
      
      // Remove olds markers
      self.clearAllMarkers();        
      self.model.setMarkers([]);
      
      var circle = self.model.get('circle');
      if (circle) {
        circle.setMap(null);
      }
      self.model.resetCircle();
      
      var center = self.model.get('center');
      if (center) {
        center.setMap(null);
      }
      self.model.resetCenter();
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        icon:'images/arrow.png'
      });
      self.model.setCenter(marker);
      marker.setMap(self.model.get('map'));
      
      self.setMapCircle(lat, lng);
      self.collection.getNearByTrucks($('#user-distance').val(), lat, lng);
    },
    
    /**
     * Function to set all markers on the map
     */
    markTrucksOnMap: function(foodTrucks) {
      var markers = [];
      var self = this;
      _.each(foodTrucks, function(value){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
          title: value.applicant,
          icon:'images/foodtruck.png'
        });
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
          var infowindow = new google.maps.InfoWindow({
            content: value.applicant + '<br>' + value.fooditems + '<br>' + value.locationdescription
          }).open(self.model.get('map'), marker);
        });
      });
      self.model.setMarkers(markers);
      self.setAllMap();
    },
    
    /**
     * Function to create a circle around the central marker and set it on the map
     */
    setMapCircle: function(lat, lng) {
      var self = this;
      var myCity = new google.maps.Circle({
        center: new google.maps.LatLng(lat, lng),
        radius: parseFloat($('#user-distance').val()) * 1609,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
      });
      self.model.setCircle(myCity);
      myCity.setMap(self.model.get('map'));
    }
  });
});