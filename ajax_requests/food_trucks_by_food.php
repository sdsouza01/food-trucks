<?php
/**
 * PHP file to retrieve the list of food trucks by food type
 *
 * * PHP version 5
 *
 * @author    Sydney Dsouza <dsouza.syds@gmail.com>
 * @copyright 2015 Sydney Dsouza - All rights reserved
 */

//Url for column metadata
require_once 'socrata.php';

$text = $_GET["food_type"];

// Using the soda api to get the food truck
$socrata = new Socrata("https://data.sfgov.org");
$response = [];
// Since some of the food types could have one more delicacies I am searching my all of them
switch($text) {
  case 'burgers ':
    $params = array("\$q" => "burgers","\$select" => "applicant,fooditems,locationdescription,location");
    $response = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "sliders","\$select" => "applicant,fooditems,locationdescription,location");
    $response1 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $response = array_merge($response, $response1);
    break;
  case 'mexican ':
    $params = array("\$q" => "burritos","\$select" => "applicant,fooditems,locationdescription,location");
    $response = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "tacos","\$select" => "applicant,fooditems,locationdescription,location");
    $response1 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $response = array_merge($response, $response1);
    break;
  case 'sea-food ':
    $params = array("\$q" => "lobster","\$select" => "applicant,fooditems,locationdescription,location");
    $response = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "crabs","\$select" => "applicant,fooditems,locationdescription,location");
    $response1 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "fish","\$select" => "applicant,fooditems,locationdescription,location");
    $response2 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $response = array_merge($response, $response1, $response2);
    break;
  case 'middle-eastern':
    $params = array("\$q" => "falafel","\$select" => "applicant,fooditems,locationdescription,location");
    $response = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "gyros","\$select" => "applicant,fooditems,locationdescription,location");
    $response1 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $response = array_merge($response, $response1);
    break;
  case 'dessert':
    $params = array("\$q" => "cupcakes","\$select" => "applicant,fooditems,locationdescription,location");
    $response = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "donuts","\$select" => "applicant,fooditems,locationdescription,location");
    $response1 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "cookies","\$select" => "applicant,fooditems,locationdescription,location");
    $response2 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $response = array_merge($response, $response1, $response2);
    break;
  case 'beverages ':
    $params = array("\$q" => "drinks","\$select" => "applicant,fooditems,locationdescription,location");
    $response = $socrata->get("/resource/rqzj-sfat.json", $params);
    $params = array("\$q" => "beverages","\$select" => "applicant,fooditems,locationdescription,location");
    $response1 = $socrata->get("/resource/rqzj-sfat.json", $params);
    $response = array_merge($response, $response1);
    break;
  default:
    $params = array("\$q" => "$text","\$select" => "applicant,fooditems,locationdescription,location");
    $response = $socrata->get("/resource/rqzj-sfat.json", $params);
}

// Since some of the food trucks do not have locations set we will ignore these for this request
$valid_result = [];
foreach ($response as $result) {
  if (isset($result['location'])) {
    $valid_result[] = $result;
  }
}

// Returning the data in json format
echo json_encode($valid_result)
?>