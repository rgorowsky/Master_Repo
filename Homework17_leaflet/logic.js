// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3
});

// this is the first tile layer - that has the base model of the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
// THIS IS PULLED FROM A PREVIOUS EXAMPLE - LEAVING IT IN FOR NOW 'CUZ IT'S AN EXAMPLE OF MANIPULATING
// THE MARKER SIZE BASED ON POPULATION - WANT TO CHANGE IT TO MAGNITUDE EVENTUALLY
// function markerSize(population) {
//   return population / 40;
// }

// Perform an API call to the USGS 'all' earthquakes geoJSON point
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(earthquakes) {

  // // This is where I pull each measurement with all it's data and set as var
    var measurement = earthquakes.features
      console.log(measurement);

      // BEFORE I CAN MAKE THAT LOOP, LET'S START WITH WITH DEFINING LAT/LONG
    for (var i = 0; i < measurement.length; i++) {

      //this is "late when "measurement" IS defined
    var lat = measurement[i].geometry.coordinates[0]
    var long = measurement[i].geometry.coordinates[1]
    var magnitude = measurement[i].geometry.coordinates[2]

      // HERE IS WHERE WE PUT THE FUNCTION TO PUT THE LAT/LONG ON MAP
    var newMarker = L.circle([long, lat], {
      color: "purple",
      });
      
      // add the new marker to the map / layer
      newMarker.addTo(myMap);
    }
 
  });

  // // LOOKING AT MAGNITUDE, IF CONDITIONS FOR COLOR
  // if (!magnitude < 1) {
  //   //this is where I'll input that the color of the circle is YELLOW
  //   //don't forget semicolon ";"
  // } else if (!magnitude < 3) {
  //   //this is where I'll input that the color of the circle is ORANGE
  //   //don't forget semicolon ";"
  // } else {
  //   //this is where I'll input that the color of the circle is RED
  //   //don't forget semicolon ";"
  // }