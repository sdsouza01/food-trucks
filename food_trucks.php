<?php
/**
 * Starting php page to display food trucks in San Francisco
 *
 * PHP version 5
 *
 * @author    Sydney Dsouza <dsouza.syds@gmail.com>
 * @copyright 2015 Sydney Dsouza - All rights reserved
 */
?>
<html>
<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js"></script>
  <script src="library/handlebars-v2.js"></script>
  <script src="javascript/food_trucks_collection.js"></script>
  <script src="javascript/food_trucks_model.js"></script>
  <script src="javascript/food_trucks_view.js"></script>
  <script src="library/underscore.js"></script>
  <script src="library/backbone.js"></script>
  <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
  <link rel="stylesheet" href="css/food_trucks.css" type="text/css">
</head>
<body bgcolor="#E6E6FA">
<div id="tabs">
  <ul id="nav" class="fixed-nav-bar">
    <li id="nav-home"><a href="#" id="nav-home-link">Home</a></li>
    <li id="nav-about"><a href="#about">About</a></li>
    <li id="nav-contact"><a href="#contact">Contact Us</a></li>
    <img src="images/trucks.png" class="header-img"/>
  </ul>
</div>
<div class="header">
  <span>Where's your food truck?</span>
</div>
<br/>
<div id="food-trucks">
  <div class="panel panel-primary">
    <div class="panel-heading">Filter your results</div>
    <span>Select distance in miles:</span>
    <span class="custom-select">
      <select id="user-distance">
        <option>1</option>
        <option>1.5</option>
        <option>2</option>
        <option>2.5</option>
        <option>3</option>
        <option>3.5</option>
        <option>4</option>
        <option>4.5</option>
        <option>5</option>
      </select>
    </span>
    <span>Select Location:</span>
    <span id="user-preference" class="custom-select">
      <select style="width:205px;"></select>
    </span>
    <span>Whats on your mind?:</span>
    <span class="custom-select">
      <select id="user-food-type">
        <option value="0">Select food type</option>
        <option value="breakfast">Breakfast</option>
        <option value="burgers">Burgers</option>
        <option value="chinese">Chinese</option>
        <option value="dessert">Dessert</option>
        <option value="filipino">Filipino</option>
        <option value="dog">Hot/Chili Dogs</option>
        <option value="indian">Indian</option>
        <option value="korean">Korean</option>
        <option value="mexican">Mexican</option>
        <option value="middle-eastern">Middle Eastern</option>
        <option value="organic">Organic</option>
        <option value="peruvian">Peruvian</option>
        <option value="pizza">Pizza</option>
        <option value="sandwich">Sandwiches</option>
        <option value="sea-food">Sea Food</option>
        <option value="soups">Soups</option>
        <option value="sushi">Sushi</option>
        <option value="vietnamese">Vietnamese</option>
      </select>
    </span>
    <span>Search for food truck by Name:</span>
    <span><input type="text" id="search-by-name"/></span>
  </div>
  <div>Displaying results for: <span id="filtered-results"></span></div>
  <div>Use your current location<input type="checkbox" id="use-your-location"/></div>
  <div id="googleMap" style="width:100%;height:70%;"></div>
  </div>
<br>
<br>
<div id="about">
  <div class="panel panel-primary">
    <div class="panel-heading">About Me</div>
    <div>Sydney Dsouza</div>
  </div>
</div>
<br>
<br>
<div id="contact">
  <div class="panel panel-primary">
    <div class="panel-heading">Contact Me</div>
    <div>If you have any question, comments or concerns you can contact me via email at dsouza.syds@gmail.com</div>
  </div>
</div>
</body>
</html>