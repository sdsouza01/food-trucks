$( document ).ready(function() {
  
  window.app = window.app || { };
  

  window.app.foodTruckCollection = Backbone.Collection.extend({

    // Collection to hold the list of near by food trucks
    nearByTrucks: new Backbone.Collection(),

    // Collection to hold the list of street names
    streetsList: new Backbone.Collection(),

    // Collection to hold the list of food trucks on the selected street
    streetTrucks: new Backbone.Collection(),
    
    trucksByFood: new Backbone.Collection(),

    initialize: function() {
      console.log('Collection Initialized');
    },

    /**
     * Function to make an ajax call to get food trucks close to users location
     */
    getNearByTrucks: function(val, lat, lng) {
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
    },

    /**
     * Function to get the list of streets that have food trucks
     */
    getFoodTrucksOnStreet: function() {
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
    },

    /**
     * Function to get food trucks on a particular street
     */
    updateResults: function() {
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
    },
    
    /**
     * Function to make the ajax call to get the list of food trucks based on the users food type selection
     */
    getFoodTrucksByFood: function() {
      var self = this;
      $.ajax({
        type: 'GET',
        datatype: 'json',
        url: 'ajax_requests/food_trucks_by_food.php',
        data: {'food_type' : $('#user-food-type').val()}
      })
      .done(function(data) {
        self.trucksByFood.reset($.parseJSON(data));
        self.trigger('loadedFoodTrucksByType');
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
    
  });

});