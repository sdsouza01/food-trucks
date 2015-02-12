$( document ).ready(function() {
  // Creating the application namespace
  window.app = window.app || { };
  
  window.app.foodTruckMap = Backbone.Model.extend({
    /**
     * Function to change the latitude and longitude of the model
     *
     * @param int lat Latitude of the new location
     * @param int lng Longitude of the new location
     */
    setNewLocation: function(lat, lng) {
      var self = this;
      var myCenter = new google.maps.LatLng(lat,lng);
      // populate yor box/field with lat, lng
      var mapValue = self.get('map');
      self.set({'latitude': lat});
      self.set({'longitude': lng});
    },
    
    /**
     * Function to get the user's location marker
     */
    getMyLocation: function() {
      var self = this;
      return new google.maps.LatLng(self.get('latitude'), self.get('longitude')); 
    },
    
    /**
     * Function to empty the model
     */
    resetModel: function(data) {
      this.set(data);
    },
    
    /**
     * Function to set the markers of food trucks that will be displayed on the map
     */
    setMarkers: function(newMarkers) {
      this.set({markers: newMarkers});
    },
    
    /**
     * Function to clear the circle surrounding the users marker
     */
    resetCircle: function() {
      this.set({circle: null});
    },
    
    /**
     * Function to set the circle surrounding the users marker
     */
    setCircle: function(newCircle) {
      this.set({circle: newCircle});
    },
    
    /**
     * Function to clear the users location marker
     */
    resetCenter: function() {
      this.set({center: null});
    },
    
    /**
     * Function to set the users location marker
     */
    setCenter: function(newCircle) {
      this.set({center: newCircle});
    }
  });
});