function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(data) {
    // Use d3 to select the panel with id of `#sample-metadata`
    var panelMetadata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panelMetadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      panelMetadata.append("h6").text(`${key}, ${value}`);
    })
// BONUS: Build the Gauge Chart
// buildGauge(data.WFREQ); I just built the bonus as part of the previous function
    var level = data.WFREQ;
    // Trig to calc meter point
    var degrees = 180 - (level*20),
        radius = .7;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);  
    
    var data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'wash frequency',
        text: level,
        hoverinfo: 'text+name'},
      { values: [45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 50],
      rotation: 90,
      text: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
             '1-2', '0-1',''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['#12515a','#186c79','#1e8897', '#25a3b5',
                          '#2bbed3', '#49c7d9','#85dae6',
                          '#c2ecf2','#e0f5f8','rgba(255, 255, 255, 0)']},
      labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
      '1-2', '0-1',''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
 }];
  var layout = {
    shapes:[{
      type: 'path',
      path: path,
      margin: {t: 10},
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Belly Button Washing Frequency<br>(Scrubs per Week)',
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
    };
  Plotly.react('gauge', data, layout);
  })
}
function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartsURL = "/samples/" + sample;
  d3.json(chartsURL).then(function (data) {
    // @TODO: Build a Bubble Chart using the sample data
    var bubbleData = [{
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: "markers",
      marker: {
        size: data.sample_values,
        color: data.otu_ids,
        colorscale: "Viridis",
      }
    }];
    var bubbleLayout = {
      'title': "Relative Abundance of All Microbe Species by Operational Taxonomic Unit (OTU) ID Number",
      margin: {t: 100},
      hovermode: "closest",
      xaxis: {title: "OTU ID Number"},
      yaxis: {title: "Relative Abundance Value"}
    };
    Plotly.react("bubble", bubbleData, bubbleLayout)
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var pieData = [{
      values: data.sample_values.slice(0,10),
      labels: data.otu_ids.slice(0,10),
      hovertext: data.otu_labels.slice(0,10),
      hoverinfo: 'label+percent',
      marker: {'colors': ["rgb(96, 130, 158)",
                          "rgb(42, 149, 126)",
                          "rgb(136, 210, 120)",
                          "rgb(127, 178, 221",
                          "rgb(157, 28, 114)",
                          "rgb(108, 70, 118)",
                          "rgb(109, 95, 145",
                          "rgb(254, 232, 90)",
                          "rgb(129, 180, 179)",
                          "rgb(215, 227, 85)"]},
      type: "pie"
    }];
    var pieLayout = {
      'title': "Top Ten Microbe Species by OTU ID Number",
      margin: {t: 100, l: 75, b: 100}
    };
    Plotly.react("pie", pieData, pieLayout)
}
)}
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
