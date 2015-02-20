<html>
  <head>
    <script src = '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
    <script src = 'https://maps.googleapis.com/maps/api/js'></script>
    <script src = 'library/handlebars-v2.js'></script>
    <script src = 'javascript/info_view.js'></script>
    <script src = 'javascript/food_trucks_collection.js'></script>
    <script src = 'javascript/food_trucks_model.js'></script>
    <script src = 'javascript/food_trucks_view.js'></script>
    <script src = 'library/underscore.js'></script>
    <script src = 'library/backbone.js'></script>
    <script src = '//code.jquery.com/ui/1.11.2/jquery-ui.js'></script>
    <script src = 'jquery.zweatherfeed.min.js" type="text/javascript'></script>
    <link rel = 'stylesheet' href = 'css/food_trucks.css' type = 'text/css'>
  </head>
  <body bgcolor = '#E6E6FA'>
    <div id = 'main'>
    <div id = 'tabs'>
      <ul id = 'nav' class = 'fixed-nav-bar'>
        <li id = 'nav-home'><a href = '#' id = 'nav-home-link'>Top</a></li>
        <li id = 'nav-about'><a href = '#about'>About</a></li>
        <li id = 'nav-contact'><a href = '#contact'>Contact Me</a></li>
        <img src = 'images/trucks.png' class = 'header-img'/>
      </ul>
    </div>
    <br><br><br><br><br><br>
    <div>
      <span>
        <ul class = 'vertical-list'>
          <li class = 'vertical-tab'><a href ='' class = 'tab-middle'>Home</a></li>
          <li class = 'vertical-tab'><a href = 'javascript:void(0)' id = 'food-truck' class = 'tab-middle'>Food Trucks</a></li>
          <li class = 'vertical-tab'><a href = '' class = 'tab-middle'>Movies</a></li>
          <li class = 'vertical-tab'><a href = '' class = 'tab-middle'>Transit</a></li>
          <li>
            <p class = 'weather'>
              <a href = 'http://weathertemperature.com/forecast/?q=San+Francisco,California,United+States+of+America' 
                 title = 'San Francisco, California, United States of America Weather Forecast' 
                 onclick = "this.target='_blank'">
                <img src = 'http://widget.addgadgets.com/weather/v1/?q=San+Francisco,California,United+States+of+America&amp;s=1&amp;u=2' 
                     alt = 'Weather temperature in San Francisco, California, United States of America' 
                     class = 'weather-img' />
              </a>
              <br />
              <a href = 'http://weathertemperature.com/' title = 'Get latest Weather Forecast updates' class = 'weather-txt' onclick = "this.target='_blank'">
              Weather Forecast
              </a>
            </p>
          </li>
        </ul>
      </span>
      <div id = 'main-info' class = 'main-display'>
        <img src = 'images/travel-wallpapers-golden-gate-bridge-night-wallpaper-34160.jpg' class='image-display'/>
        <img src = 'images/alcatraz.jpg' class='image-display'/>
        <img src = 'images/de-young-museum.jpg' class='image-display'/>
        <img src = 'images/exploratorium.jpg' class='image-display'/>
        <img src = 'images/fishermans-wharf.jpg' class='image-display'/>
        <img src = 'images/museum-of-modern-art.jpg' class='image-display'/>
        <img src = 'images/palace-of-fine-arts.jpg' class='image-display'/>
        <img src = 'images/twin-peaks.jpg' class='image-display'/>
      </div>
     </div>
    </div>
    <br>
    <br>
    <div id = 'about'>
      <div class = 'panel panel-primary'>
        <div class = 'panel-heading'>About</div>
        <div>This a project that I have worked on because I love eating at food trucks and always want to know where my favourite trucks are located.<br>
          This site is helpful for people who share a similar love for eating at food trucks</div>
      </div>
    </div>
    <br>
    <br>
    <div id = 'contact'>
      <div class = 'panel panel-primary'>
        <div class = 'panel-heading'>Contact Me</div>
        <div>If you have any question, comments or concerns you can contact me via email at <a href="mailto:dsouza.syds@gmail.com" target="_top">dsouza.syds@gmail.com</a></div>
      </div>
    </div>
  </body>
</html>