function buildMetadata(data) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  // var sample = d3.json(`/metadata/${sample}`)
  // console.log(sampleData, "this is where the data is");  // copied and commented out my part

  // bringing over the section about pulling the sample from the
  // metadata, based on what is in the dropdown selector

  var panel = d3.json(`/metadata/${sample}`)
    // console.log(sample, "this is where the data is");

  // var sampleData = d3.json(`/metadata/${sample}`).then(sampleData)  this is what I saw on Kelly's machine
  // console.log(sampleData, "this is where the data is");

  // Use `.html("") to clear any existing metadata
  panel.innerHTML = '';

  for(var key in data) {
    h6tag = document.createElement("h6");
    h6Text = document.createTextNode(`${key}: ${data[key]}`);
    h6tag.append(h6Text);

    panel.appendChild(h6tag);
  };

  var layout = {
    height: 600,
    width: 800
  };
  
  Plotly.plot("pie", sample, layout);
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
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
