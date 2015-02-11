$( document ).ready(function() {
  /**
   * Handlebar template to display dropdown of streets which have food trucks
   *
   * @type {string}
   */
  window.app = window.app || { };
  
  var streetList = '<select id="user-selection"> \
                    <option value="0">Select a street</option> \
                    {{#each locations}} \
                      <option value="{{location}}">{{location}}</option> \
                    {{/each}} \
                    </select>';

  /*var foodTruckCollection = Backbone.Collection.extend({

    // Collection to hold the list of near by food trucks
    nearByTrucks: new Backbone.Collection(),

    // Collection to hold the list of street names
    streetsList: new Backbone.Collection(),

    // Collection to hold the list of food trucks on the selected street
    streetTrucks: new Backbone.Collection(),

    initialize: function() {
      console.log('Collection Initialized');
    },*/

    /**
     * Function to make an ajax call to get food trucks close to users location
     */
    /*getNearByTrucks: function(val, lat, lng) {
      var self = this;      
      $.ajax({
        type: 'GET',
        url: 'ajax_requests/near_by_food_trucks.php',
        dataType: 'json',
        data: {
          'radius': val,
          'lat' : lat,
          'lng' : lng
        }
      })
        .done(function(data){
          self.nearByTrucks.reset(data);
          //self.set('near_by_trucks', data);
          self.trigger('loadedNearByFoodTrucks');
        });
    },*/

    /**
     * Function to get the list of streets that have food trucks
     */
    /*getFoodTrucksOnStreet: function() {
      var self = this;
      $.ajax({
        type: 'GET',
        url: 'ajax_requests/food_truck_locations.php',
        dataType: 'json'
      })
        .done(function(data){
          self.streetsList.reset(data);
          self.trigger('loadedStreets');
        });
    },*/

    /**
     * Function to get food trucks on a particular street
     */
   /* updateResults: function() {
      var self = this;
      $.ajax({
        type: 'GET',
        url: 'ajax_requests/filter_food_trucks_by_street.php',
        dataType: 'json',
        data: {text: $("#user-selection").val()}
      })
      .done(function(data){
        self.streetTrucks.reset(data);
        self.trigger('updatedResults');
      });
    },*/
    
    /**
     * Function to make the ajax call to get the list of food trucks based on the users food type selection
     */
    /*getFoodTrucksByStreet: function() {
      $.ajax({
        type: 'GET',
        datatype: 'json',
        url: 'ajax_requests/food_trucks_by_food.php',
        data: {'food_type' : $('#user-food-type').val()}
      })
      .done(function(data) {
      });
    },
    
    getListOfFoodTruckNamesForAutocomplete: function() {
      $.ajax({
        type: 'GET',
        url: 'ajax_requests/food_truck_name_autocomplete.php',
        data: {'text': $('#search-by-name').val()},
        datatype: 'json'
      }).done(function(data) {
      });
    },
    
    getListOfFoodTrucksByName: function() {
      $.ajax({
        type: 'GET',
        url: 'ajax_requests/get_food_truck_by_name.php?truck_name=' + values,
        datatype: 'json',
        data: {'truck_name': values}
      }).done(function(data) {
      });
    }
    
  })*/

  ///var foodTruckMap = Backbone.Model.extend({
    /**
     * Function to change the latitude and longitude of the model
     *
     * @param int lat Latitude of the new location
     * @param int lng Longitude of the new location
     */
   /* setNewLocation: function(lat, lng) {
      var self = this;
      var myCenter = new google.maps.LatLng(lat,lng);
      // populate yor box/field with lat, lng
      var mapValue = self.get('map');
      var map = new foodTruckMap({
        latitude: lat,
        longitude: lng,
        map: mapValue
      });
      self.set(map);
    },
    
    getMyLocation: function() {
      var self = this;
      return new google.maps.LatLng(self.get('latitude'), self.get('longitude')); 
    },
    
    resetModel: function(data) {
      this.set(data);
    },
    
    setMarkers: function(newMarkers) {
      this.set({markers: newMarkers});
    },
    
    resetCircle: function() {
      this.set({circle: null});
    },
    
    setCircle: function(newCircle) {
      this.set({circle: newCircle});
    },
    
    resetCenter: function() {
      this.set({center: null});
    },
    
    setCenter: function(newCircle) {
      this.set({center: newCircle});
    }
  });*/

  var foodTruckView = Backbone.View.extend({
    el :  '#food-trucks',

    collection : new window.app.foodTruckCollection(),

    model: new window.app.foodTruckMap(),
    
    bindListeners: function() {
      this.listenTo(this.collection, 'loadedNearByFoodTrucks', this.displayNearByFoodTrucks);
      this.listenTo(this.collection, 'loadedStreets', this.displayStreetsList);
      this.listenTo(this.collection, 'updatedResults', this.displayUpdatedResults);
      this.listenTo(this.collection, 'loadedFoodTrucksByType', this.displayTrucksByFood);
      google.maps.event.addListener(this.model.get('map'), 'click', this.getCoOrds);
    },

    events: {
      'change #user-selection' : 'updateResults',
      'keyup #search-by-name' : 'autocomplete',
      'change #user-food-type': 'filterTrucksByFood',
      'change #user-distance' : 'userDistanceUpdate',
      'click #use-your-location' : 'useYourLocation'
    },

    /**
     *
     */
    initialize : function () {
      console.log('View Initialized');
      var self = this;
      self.bindListeners();

      var marker = new google.maps.Marker({
        position: self.model.getMyLocation(),
        icon:'images/arrow.png'
      });
      self.model.setCenter(marker)
      marker.setMap(self.model.get('map'));

      var myCity = new google.maps.Circle({
          center: self.model.getMyLocation(),
          radius: 1609,
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor:" #0000FF",
          fillOpacity: 0.4
        });
      self.model.setCircle(myCity);
      myCity.setMap(self.model.get('map'));
      
      self.collection.getNearByTrucks('1', self.model.get('latitude'), self.model.get('longitude'));
      self.collection.getFoodTrucksOnStreet();
    },
    
    // Sets the map on all markers in the array.
    setAllMap: function () {
      var self = this;
      var markers = self.model.get('markers');
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(self.model.get('map'));
      }
    },
    
    clearAllMarkers: function () {
      var self = this;
      var markers = self.model.get('markers');
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },
    
    useYourLocation: function() {
      var self = this;
      if ($('#use-your-location').prop('checked')) {
        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

          var infowindow = new google.maps.InfoWindow({
          map: self.model.get('map'),
            position: pos,
            content: 'Location found using HTML5.'
          });

          self.model.get('map').setCenter(pos);
          }, function() {
            console.log('Able to use users location');
          });
        } else {
          console.log('Unable to use users location');
        }
      }
    },

    userDistanceUpdate: function(){
      var self = this;
      this.collection.getNearByTrucks($('#user-distance').val(), self.model.get('latitude'), self.model.get('longitude'));
    },

    filterTrucksByFood: function(){
      this.collection.getFoodTrucksByFood();
    },
    
    displayTrucksByFood: function() {
      var self = this;
      self.clearAllMarkers();        
      self.model.setMarkers([]);

      var markers = [];
      console.log(self.collection.trucksByFood.toJSON());
      _.each(self.collection.trucksByFood.toJSON(), function(value){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
          //map: map,
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
      var text = 'Food trucks where you get ' + $('#user-food-type').val() + ' food';
      $('#user-food-type').val("0");
      $('#filtered-results').text(text);
    },
    
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
              var newArray = new Array(parsed.length);
              var i = 0;

              parsed.forEach(function (entry) {
                var newObject = {
                  label: entry.applicant
                };
                newArray[i] = newObject;
                i++;
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
                self.clearAllMarkers();        
                self.model.setMarkers([]);
                $('#search-by-name').val("");

                var markers = [];
                _.each($.parseJSON(data), function(value){
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
                    map: self.model.get('map'),
                    title: value.applicant,
                    icon:'images/foodtruck.png'
                  });

                  google.maps.event.addListener(marker, 'click', function() {
                    var infowindow = new google.maps.InfoWindow({
                      content: value.applicant + '<br>' + value.fooditems + '<br>' + value.locationdescription
                    }).open(self.model.get('map'),marker);
                  });
                  markers.push(marker);
                });
                self.model.setMarkers(markers);
                self.setAllMap();
              });
            var text = 'Location where ' + values + ' are located';
            $('#filtered-results').text(text);
          }
        });
      }
    },

    updateResults: function() {
      this.collection.updateResults();
    },

    displayUpdatedResults: function() {
      var self = this;      
      self.clearAllMarkers();        
      self.model.setMarkers([]);
      
      var markers = [];
       _.each(self.collection.streetTrucks.toJSON(), function(value){
         var marker = new google.maps.Marker({
           position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
           title: value.applicant,
           icon:'images/foodtruck.png'
         });

         google.maps.event.addListener(marker, 'click', function() {
           var infowindow = new google.maps.InfoWindow({
             content: value.applicant + '<br>' + value.fooditems + '<br>' + value.locationdescription
           });
           infowindow.open(self.model.get('map'),marker);
         });
         markers.push(marker);
       });
      self.model.setMarkers(markers);
      self.setAllMap();
      
      var text = 'Food trucks on ' + $('#user-selection').val() + ' street';
      $('#user-selection').val("0");
      $('#filtered-results').text(text);
    },

    displayStreetsList: function() {
      var self = this;
      //var source   = $("#some-template").html();
      var template = Handlebars.compile(streetList);
      $("#user-preference").html(template({locations : self.collection.streetsList.toJSON()}));
    },

    displayNearByFoodTrucks: function() {
      var self = this;
      var markers = [];
      
      self.clearAllMarkers();        
      self.model.setMarkers([]);
      
      
      if ($('#user-distance').val() !== '1') {
        console.log('In here');
        var circle = self.model.get('circle');
        if (circle) {
          circle.setMap(null);
        }
        self.model.resetCircle();
        
        var myCity = new google.maps.Circle({
          center: self.model.getMyLocation(),
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
      
      _.each(this.collection.nearByTrucks.toJSON(), function(value){

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(value.location.latitude, value.location.longitude),
          //map: self.model.get('map'),
          title: value.applicant,
          icon:'images/foodtruck.png'
        });

        google.maps.event.addListener(marker, 'click', function() {
          var infowindow = new google.maps.InfoWindow({
            content: value.applicant + '<br>' + value.fooditems + '<br>' + value.locationdescription
          }).open(self.model.get('map'),marker);
        });
        markers.push(marker);
      });
      self.model.setMarkers(markers);
      self.setAllMap();
      var text = 'Near by food trucks in a ' + $('#user-distance').val() + ' radius';
      $('#filtered-results').text(text);
      //$('#user-distance').val("1");
    },

    getCoOrds: function(event) {
      var self = view;
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      self.model.setNewLocation(lat, lng);
      
      var circle = self.model.get('circle');
      console.log(circle);
      if (circle) {
        circle.setMap(null);
      }
      self.model.resetCircle();
      
      var center = self.model.get('center');
      if (center) {
        console.log('remove center');
        center.setMap(null);
      }
      self.model.resetCenter();
      
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        icon:'images/arrow.png'
      });
      self.model.setCenter(marker);
      marker.setMap(self.model.get('map'));

      var myCity = new google.maps.Circle({
        center: new google.maps.LatLng(lat, lng),
        radius:1609,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
      });
      self.model.setCircle(myCity);
      myCity.setMap(self.model.get('map'));
      google.maps.event.addListener(self.model.get('map'), 'click', this.getCoOrds);
      
      $('#user-distance').val('1');
      self.collection.getNearByTrucks('1', lat, lng);
    }
  })

  var mapProp = {
    center: new google.maps.LatLng(37.7833,-122.4167),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapValue = new google.maps.Map(document.getElementById('googleMap'), mapProp);

  var map = new window.app.foodTruckMap({
    latitude: 37.7833,
    longitude: -122.4167,
    map: mapValue,
    markers: []
  });
  var view = new foodTruckView({
    model : map
  });
});