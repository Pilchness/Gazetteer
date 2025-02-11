<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<!-- JQuery UI CSS -->
		<link
      rel="stylesheet"
      href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"
    />
		<!-- Bootstrap CSS -->
		<link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
      integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
      crossorigin="anonymous"
    />
		<!-- Leaflet CSS -->
		<link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""
    />
		<!-- Custom CSS -->
		<link rel="stylesheet" type="text/css" href="libs/css/loaderstyles.css" />
		<link rel="stylesheet" type="text/css" href="libs/css/globalstyles.css" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<title>Gazetteer</title>
	</head>
	<body>
		<!-- Quiz Modal -->
		<div class="modal fade" id="quizModal" tabindex="-1" aria-labelledby="quizModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="quizModalLabel">Capital Cities Quiz</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body" id="quiz-body">
						<?php include 'libs/php/quizGenerator.php'; ?>
					</div>
					<div class="modal-footer"></div>
				</div>
			</div>
		</div>
	</main>
	<main>
		<div style="position: fixed; top: 10px; left: 10px; z-index: 9999">
			<nav  class="navbar navbar-light bg-transparent">
				<div>
					<ul class="navbar-nav">
						<li >
							<div id="dino-logo">
								<img src="images/worldasaurus.png" alt="dino logo" width="60vh" height="60vh"/>
								<div>
									<h1 id="main-title">Worldasaurus</h1>
									<div id="search-box">
										<div style="vertical-align: top">
											<input
            id="countrySearch"
            spellcheck="false"
            class="form-control mr-sm-2"
            type="search"
        
            aria-label="Search"
            style="background-color:  rgba(63, 127, 191, 0.1); color:  rgba(63, 127, 191, 0.7); height: 24px;"
          />
										</div>
									</div>
								</div>
							</div>
						</li>
						<div id="logo-nav">
							<li id="options">
								<svg
                  width="6vh"
                  height="6vh"
                  viewBox="0 0 16 16"
                  class="bi bi-geo-alt"
                  fill="white"
									xmlns="http://www.w3.org/2000/svg"
                  style="margin-bottom: 20px"
                >
									<path
                    fill-rule="evenodd"
                    d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                  />
									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
							</li>
							<li id="info">
								<svg
                  width="6vh"
                  height="6vh"
                  viewBox="0 0 16 16"
                  class="bi bi-info-circle"
                  fill="white"
									xmlns="http://www.w3.org/2000/svg"
                  style="margin-bottom: 20px"
                >
									<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
									<path
                    d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"
                  />
									<circle cx="8" cy="4.5" r="1" />
								</svg>
							</li>
							<li id="maptype">
								<svg
                  width="6vh"
                  height="6vh"
                  viewBox="0 0 16 16"
                  class="bi bi-map"
                  fill="white"
									xmlns="http://www.w3.org/2000/svg"
                  style="margin-bottom: 20px"
                >
									<path
                    fill-rule="evenodd"
                    d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98l4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                  />
								</svg>
							</li>
							<li id="weather">
								<svg
                  width="6vh"
                  height="6vh"
                  viewBox="0 0 16 16"
                  class="bi bi-sun"
                  fill="white"
									xmlns="http://www.w3.org/2000/svg"
                  style="margin-bottom: 20px"
                >
									<path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z" />
									<path
                    fill-rule="evenodd"
                    d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.155l-.36 1.508a.25.25 0 0 1-.282.19l-1.532-.245a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.508a.25.25 0 0 0-.374-.155l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"
                  />
								</svg>
							</li>
							<li id="quiz">
								<svg
                  width="6vh"
                  height="6vh"
                  viewBox="0 0 16 16"
                  class="bi bi-question-octagon"
                  fill="white"
									xmlns="http://www.w3.org/2000/svg"
                >
									<path
                    fill-rule="evenodd"
                    d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"
                  />
									<path
                    d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                  />
								</svg>
							</li>
						</div>
					</ul>
				</div>
			</nav>
		</div>
		<div id="preloader"></div>
		<div id="mapid"></div>
		<!-- Weather Modal -->
		<div class="modal fade" id="weatherModal" tabindex="-1" aria-labelledby="weatherModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="weatherModalLabel">Weather</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<table id="city-weather-table">
							<tr>
								<th>City</th>
								<th>Weather</th>
								<th>Wind</th>
								<th>Temp(°C)</th>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Map Modal -->
		<div class="modal fade" id="mapModal" tabindex="-1" aria-labelledby="mapModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="mapModalLabel">Map Style</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div
                style="display: flex; align-items: center; justify-content: space-around; margin: auto; flex-wrap: wrap"
              >
							<button id="stadia" class="map-button" style="padding: 5px">
								<img src="images/smapthumb.png" alt="map style 1" />
							</button>
							<button id="here" class="map-button" style="padding: 5px">
								<img src="images/hmapthumb.png" alt="map style 2" />
							</button>
							<button id="jawg" class="map-button" style="padding: 5px">
								<img src="images/jmapthumb.png" alt="map style 3" />
							</button>
							<button id="forest" class="map-button" style="padding: 5px">
								<img src="images/fmapthumb.png" alt="map style 4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Options Modal -->
		<div class="modal options-modal"  id="optionsModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div id="modal-fader" class="modal-dialog enterSlowlyLeft animated ml-auto options-modal" role="document">
				<div class="modal-content options-modal">
					<div class="modal-body options-modal">
						<h6 style="color: white">Show when country selected:</h6>
						<ul style="padding: 0">
							<button id="cities-button" class="options-button-select options-modal" value="off">Cities</button>
							<button id="pois-button" class="options-button-select options-modal" value="off">POIs</button>
							<button id="names-button" class="options-button-select options-modal" value="off">Names</button>
						</ul>
						<h6 style="color: white">Show always:</h6>
						<ul style="padding: 0">
							<button id="current-button" class="options-button-select options-modal" value="off">Current Position</button>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- Info Modal -->
		<div class="modal info-modal"  id="infoModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog enterSlowlyLeft animated ml-auto info-modal" role="document">
				<div class="modal-content info-modal">
					<div class="modal-content info-modal">
						<div class="modal-body">
              <h3 id="currentloc"></h3>
							<div>
								<figure id="info-figure"style="margin-right: 5px; width:18em; height: auto">
                  <figcaption id="country-image-title">Sorry, no image available</figcaption>
                  <!-- <container style="position: relative; width:16em; height: 9em; background-color: black">
                  <img id="country-image" src="images/defaultcountry.png" alt="default image" width="100%" />
                  <div id="info-overlay" ></div>
                </container> -->
                <div id="parent">
      <img id="country-image" src="images/defaultcountry.png" alt="default image" width="100%" />
      <div id="info-overlay"></div>

                  </div>
								</figure>
								<button id="menu-facts" class="info-button-select options-modal" >Facts</button>
								<button id="menu-photographer" class="info-button-select options-modal" >Photographer</button>
								<button id="menu-next" class="info-button-select options-modal" >Next Photo</button>
								<button id="menu-timezones" class="info-button-select options-modal" >Timezones</button>
								<button id="menu-currencies" class="info-button-select options-modal" >Currencies</button>
								<button id="menu-borders" class="info-button-select options-modal" >Borders</button>
								<button id="menu-languages" class="info-button-select options-modal" >Languages</button>
								<button id="menu-pois" class="info-button-select options-modal" >POIs</button>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade info-modal" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
					<div class="modal-dialog info-modal">
						<div class="modal-content info-modal">
							<div class="modal-header info-modal">
								<h5 class="modal-title info-modal" id="infoModalLabel">
									<h3 id="selected-country">Current Location</h3>
								</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div style="display: grid; grid-template-columns: 1fr minmax(100px, 15%);">
									<figure id="info-figure"style="margin-right: 5px">
										<figcaption id="country-image-title">Sorry, no image available</figcaption>
										<img id="country-image" src="images/fmapthumb.png" alt="default image" width="100%" />
									</figure>
									<div style="position:absolute; top:0; left: 0"></div>
									<div>
										<ul style="list-style-type: none;
                  padding: 5px;
                  margin: 0;
                  text-align: left;
                  font-size: 0.8em;">
											<li id="menu-facts">Facts</li>
											<li id="menu-photographer">Photographer</li>
											<li id="menu-next-image">Next Image</li>
											<li id="menu-timezones">Timezones</li>
											<li id="menu-currencies">Currencies</li>
											<li id="menu-borders">Borders</li>
											<li id="menu-languages">Languages</li>
											<li id="menu-pois">POIs</li>
										</ul>
									</div>
									<div class="modal-footer"></div>
								</div>
							</div>
						</div>
						<!-- JQuery Script -->
						<script type="application/javascript" src="libs/js/jqueryv3.5.1.js"></script>
						<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
						<!-- Custom Script -->
						<script type="application/javascript" src="libs/js/loaderscript.js"></script>
						<script type="module" src="libs/js/mapscript.js"></script>
						<script type="module" src="libs/js/iconControl.js"></script>
						<script type="module" src="libs/js/optionButtons.js"></script>
						<script type="application/javascript" src="libs/js/quiz.js"></script>
						<script type="application/javascript" src="libs/js/topTens.js"></script>
						<!-- Leaflet Scripts -->
						<script
      src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      crossorigin=""
    ></script>
						<script src="libs/js/leaflet-providers.js"></script>
						<!-- Bootstrap Script -->
						<script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
      crossorigin="anonymous"
    ></script>
						<div display="hidden">
							<span id="current">on</span>
							<span id="zoom">0</span>
						</div>
					</body>
				</html>