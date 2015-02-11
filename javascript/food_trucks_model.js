$( document ).ready(function() {
  
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
      var map = new window.app.foodTruckMap({
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
  });
});