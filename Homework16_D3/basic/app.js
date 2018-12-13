var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };
  
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
.select(".chart")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "% In Poverty";

// Import Data
d3.csv("data.csv", function(journData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    journData.forEach(function(data) {       // changed hair_data to 'data' cuz that's what i'm usin'
      data.poverty = +data.poverty;          // changed hair_length to poverty (cuz that's my target)
      data.healthcare = +data.healthcare;    // this was their y-data - changed to 'healthcare'
      data.flag = 0                          // added this in so that it counts when a data point is clicked
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, (d3.max(journData, d => d.poverty) + 5)])      //not sure if I need to change hairData to 'data' or 'journData'
      .range([0, width]);                                   //conclusion:  journData is correct                    

    var yLinearScale = d3.scaleLinear()
      .domain([0, (d3.max(journData, d => d.healthcare) + 5)])  // this piece is setting the domain from 0 to ...
      .range([height, 0]);                                      //the max value in the 'healthcare' "column", plus 5

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(journData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // // Step 6: Initialize tool tip                           
    // ==============================                         
    var toolTip = d3.tip()             // this makes the popup if I click on a data point                     
      .attr("class", "tooltip")        // this makes the popup if I click on a data point                        
      .offset([80, -60])               // this makes the popup if I click on a data point                       
      .html(function(d) {              // this makes the popup if I click on a data point                       
        return (`${d.state}<br>Percentage of Poverty: ${d.poverty}<br>Percentage that lack proper healthcare: ${d.healthcare}`);
      });                              // this makes the popup if I click on a data point                    
                                                                 
    // Step 7: Create tooltip in the chart                       
    //==============================                            
    chartGroup.call(toolTip);                        
    
    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {  
    // I need to make a counter - to work in concert with the .tooltip
      var flag = data.flag
      flag = flag + 1;  
      console.log("This was clicked "+flag+" times")
      if ((flag%2) == 1) {
      toolTip.show(data, this);
      } else {
        toolTip.hide(data);
      }                                 
    });                                                          
      // onmouseout event                               // commented this out while I try flag        
    //   .on("click", function(data, index) {           // commented this out while I try flag
    //     toolTip.hide(data);                          // commented this out while I try flag           
    //   });                                                       

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  });
