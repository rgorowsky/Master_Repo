function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var sample = d3.select("#selDataset").node().value;  // this is whatever is in the SELECT sample portion
  console.log(sample);                                 // this is whatever is in the SELECT sample portion

  // Use `.html("") to clear any existing metadata
  sample.innerHTML = '';                  
  
  // var sample = d3.select("#selDataset").node().value;
  // console.log(sample);

  var metadataURL = "/metadata/" + sample;      //new component that was added in

  d3.json(`/metadata/${sample}`).then(function(data){
    
    console.log(data);

    var panelMetadata = d3.select("#sample-metadata");

    panelMetadata.html("");

    Object.entries(data).forEach(([key, value]) => {
      panelMetadata.append("h6").text(`${key}, ${value}`);
    })

  });  // I added the .node part, then dropped it.


  


  

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
  var chartsURL = "/samples/" + sample;
  d3.json(chartsURL).then(function (data) {
    
    // Let's start with the pie chart
    // [RETAINED] - HINT: You will need to use slice() to... 
    // grab the top 10 sample_values, otu_ids, and labels (10 each).
    var pieData = [{
      values: data.sample_values.slice(0,10),   // the values (sample_values) from app.py
      labels: data.otu_ids.slice(0,10),         // the id's the number id's from app.py
      hovertext: data.otu_labels.slice(0,10),   // The popup hover-text
      type: "pie"
    }];
    var pieLayout = {
      'title': "Relative Population of Top 10 Bacteria Species",
      margin: {t: 100, l: 75, b:100}
    };
    Plotly.react("pie", pieData, pieLayout)     // here is the part that actually 'PLOTS'

    // OK - now put in the Scatter/Bubble plot at the bottom
    var trace1 = {
      x: data.otu_ids,                          // the X-axis data for the bubble chart
      y: data.sample_values,                    // the X-axis data for the bubble chart
      mode: 'markers',
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
    
        colorscale: "Earth"
      }
    };
    var trace1 = [trace1];
    var layout = {
      showlegend: false,
      height: 600,
      width: 1300                               // Adjust the width to match the above styling
    };
    
    Plotly.newPlot('bubble', trace1, layout);

}

)}

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

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   getData(newSample, updateCharts);
// }

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

  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
