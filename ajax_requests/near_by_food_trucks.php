<?php
//Url for column metadata
require_once 'socrata.php';


$socrata = new Socrata("https://data.sfgov.org");
// "\$where" => "within_box(location,37.80,-122.4,37.70,-122.38)",
/*$params = array("\$select" => "applicant,fooditems,location");
$response = $socrata->get("/resource/rqzj-sfat.json", $params);*/
//$lat = 37.7833; // latitude of centre of bounding circle in degrees
//$lon = -122.4167; // longitude of centre of bounding circle in degrees
$lat = $_GET['lat'];
$lon = $_GET['lng'];
$rad = 1.609; // radius of bounding circle in kilometers

$rad = ((int)$_GET['radius']) * $rad;

$er = 6371;  // earth's mean radius, km

// first-cut bounding box (in degrees)
$max_lat = $lat + rad2deg($rad/$er);
$min_lat = $lat - rad2deg($rad/$er);
// compensate for degrees longitude getting smaller with increasing latitude
$max_lon = $lon + rad2deg($rad/$er/cos(deg2rad($lat)));
$min_lon = $lon - rad2deg($rad/$er/cos(deg2rad($lat)));

$params = array("\$where" => "within_box(location,$max_lat,$min_lon, $min_lat, $max_lon)","\$select" => "applicant,fooditems,locationdescription,location");
$response = $socrata->get("/resource/rqzj-sfat.json", $params);

echo json_encode($response);
?>