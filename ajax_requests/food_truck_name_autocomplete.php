<?php
/**
 * PHP file to retrieve to get the list of food trucks that start with the letters that the user entered
 *
 * PHP version 5
 *
 * @author    Sydney Dsouza <dsouza.syds@gmail.com>
 * @copyright 2015 Sydney Dsouza - All rights reserved
 */

//Url for column metadata
require_once 'socrata.php';

$text = $_GET["text"];

// Using the soda api to get list of food trucks that start with the letters that the user entered
$socrata = new Socrata("https://data.sfgov.org");
$params = array("\$q" => "$text", "\$select" => "applicant");
$response = $socrata->get("/resource/rqzj-sfat.json", $params);
// Returning the response in json format
echo json_encode($response)
?>