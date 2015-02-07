<?php
/**
 * PHP file to retrieve the list of food trucks located on a partcular street
 *
 * * PHP version 5
 *
 * @author    Sydney Dsouza <dsouza.syds@gmail.com>
 * @copyright 2015 Sydney Dsouza - All rights reserved
 */

//Url for column metadata
require_once 'socrata.php';

$text = $_GET["text"];

// Using the sod api to get the food truck

$socrata = new Socrata("https://data.sfgov.org");
// Retrieving the filtered information list
$params = array("\$q" => "$text","\$select" => "applicant,fooditems,locationdescription,location");
// Making the call to get the data
$response = $socrata->get("/resource/rqzj-sfat.json", $params);

// Since some of the food trucks do not have locations set we will ignore these for this request
$valid_result = [];
foreach ($response as $result) {
  if (isset($result['location'])) {
    $valid_result[] = $result;
  }

}
echo json_encode($valid_result)
?>
