

function buildMetadata(newSample) {

  // @TODO: Complete the following function that builds the metadata panel

  var PANEL = d3.select("#sample-metadata");
  PANEL.innerHTML = '';

  //var selection = d3.select("#selDataset").node().value;
  //console.log(selection);

  // Use `.html("") to clear any existing metadata
  //selection.innerHTML = '';                  
  
  // var selection = d3.select("#selDataset").node().value;
  // console.log(selection);

  //console.log(panel);

  //var pythonSample = d3.json(`/metadata/${selection}`);  // I added the .node part, then dropped it.
  //console.log(pythonSample); 

  for(var key in newSample) {                      //commenting out to try something else
       h6tag = document.createElement("h6");       //commenting out to try something else
       h6Text = document.createTextNode(`${key}: ${newSample[key]}`);
       h6tag.append(h6Text);                       //commenting out to try something else
       //console.log(key);                         //commenting out to try something else
       PANEL.append(h6tag);
   //Object.entries(panel).forEach(([key, value]) => {
   //h6tag = document.createElement("h6");
    // h6Text = document.createTextNode(`${key}: ${pythonSample[key]}`);
    //panel.append("h6").text(h6Text);
    // console.log(`${key} ${value}`);
    // panel.append("h6").text(h6)
  }

  //var layout = {
  //  height: 600,
  //  width: 800
  //};
  
  //Plotly.plot("pie", sample, layout);
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function getOptions() {

  // Grab a reference to the dropdown select element
  var selector = document.getElementById('selDataset');

  // Use the list of sample names to populate the select options
  Plotly.d3.json('/names', function(error, sampleNames) {
      for (var i = 0; i < sampleNames.length;  i++) {
          var currentOption = document.createElement('option');
          currentOption.text = sampleNames[i];
          currentOption.value = sampleNames[i]
          selector.appendChild(currentOption);
      }

      getData(sampleNames[0], buildCharts);
  })
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  getData(newSample, updateCharts);
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}



function optionChanged(newSample) {

  var selection = d3.select("#selDataset").node().value;
  console.log(selection);

  var panel = d3.select("#sample-metadata").node();
  console.log(panel);

  var pythonSample = d3.json(`/metadata/${selection}`);  // I added the .node part, then dropped it.
  console.log(pythonSample);  

  
  
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(panel);
}

// Initialize the dashboard
init();
