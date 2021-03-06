<?php
/**
 * PHP file to retrieve the list of streets which have food trucks
 *
 * PHP version 5
 *
 * @author    Sydney Dsouza <dsouza.syds@gmail.com>
 * @copyright 2015 Sydney Dsouza - All rights reserved
 */

require_once 'socrata.php';

//Url for column metadata
$socrata = new Socrata("https://data.sfgov.org");
// Getting food trucks location info
$params = array("\$group" => "locationdescription","\$select" => "locationdescription");
$response = $socrata->get("/resource/rqzj-sfat.json", $params);

// Looping through and checking if the street is already in he list of streets and ignore if it does.
// The reason I am using 2 array is because 1 will be a 1 dimensional array of the locations against which new location will be checked to remove duplicates
// The second array is store the data with an index array['location' => $location] 
$locations = [];
$location_one_dim_array = [];
foreach ($response as $location) {
  $position = strpos($location['locationdescription'], ':');
  if ($position) {
    $short_location = substr($location['locationdescription'], 0, $position);
    if (!in_array($short_location, $location_one_dim_array)) {
      $locations[] = ['location' => $short_location];
      $location_one_dim_array[] = $short_location;
    }
  } else {
    if (!in_array($location['locationdescription'], $location_one_dim_array)) {
      $locations[] = ['location' => $location['locationdescription']];
      $location_one_dim_array[] = $location['locationdescription'];
    }
  }
}

//Returning the result in json format
echo json_encode($locations);
?>