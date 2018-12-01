// D3 selector
var tbody = d3.select("tbody");
var submit = d3.select("#filterButton");

// Update table with a new dataset
function updateTable(dataset) {
  tbody.html('');
  dataset.forEach((toBeDefined) => {
    var row = tbody.append("tr");
    Object.entries(toBeDefined).forEach(([key,value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
}

// Filter date function (just compare a string)
function filterByDate(dataset) {
    var filteredData = dataset.filter(function (d) {
      return d.datetime === $('#datetime').val();
    });
    return filteredData;
}

// First update table of original data
updateTable(data); 
submit.on("click", function() {
  // When filter is click
  // Filter data by datetime and update the table
  var result = filterByDate(data);
  updateTable(result);
});