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
var chosenYAxis = "Lacks Healthcare (%)"









// function used for updating x-scale var upon click on axis label
function xScale(journData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(journData, d => d[chosenXAxis]) * 0.8,            //change here if it doesn't fit scale
        d3.max(journData, d => d[chosenXAxis]) * 1.2                    //change here if it doesn't fit scale
      ])                                                                //change here if it doesn't fit scale
      .range([0, width]);                                               //change here if it doesn't fit scale
  
    return xLinearScale;
  
}

  // function used for updating x-scale var upon click on axis label
function yScale(journData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(journData, d => d[chosenYAxis]) * 0.8,            //change here if it doesn't fit scale
      d3.max(journData, d => d[chosenYAxis]) * 1.2                    //change here if it doesn't fit scale
    ])                                                                //change here if it doesn't fit scale
    .range([0, width]);                                               //change here if it doesn't fit scale

  return yLinearScale;

}

  
  // function used for updating xAxis var upon click on axis label
function renderXAxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  
  return xAxis;
}

  // function used for updating xAxis var upon click on axis label
function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);
  
  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  
  return yAxis;
}
  
  // function used for updating circles group with a transition to
  // new circles (X - Axis)
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {
  
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cx", d => newXScale(d[chosenXAxis]));
  
  return circlesGroup;
}

  // // function used for updating circles group with a transition to
  // // new circles  (Y - Axis)
  // function renderYCircles(circlesGroup, newYscale, chosenYAxis) {
  
  //   circlesGroup.transition()
  //     .duration(1000)
  //     .attr("cx", d => newYScale(d[chosenYAxis]));
  
  //   return circlesGroup;
  // }










// // function used for updating Y-scale var upon click on axis label
// function yScale(journData, chosenYAxis) {
//     // create scales
//     var yLinearScale = d3.scaleLinear()
//       .domain([d3.min(journData, d => d[chosenYAxis]) * 0.8,            //change here if it doesn't fit scale
//         d3.max(journData, d => d[chosenYAxis]) * 1.2                    //change here if it doesn't fit scale
//       ])                                                                //change here if it doesn't fit scale
//       .range([0, width]);                                               //change here if it doesn't fit scale
  
//     return yLinearScale;
  
//   }
  
  // // function used for updating yAxis var upon click on axis label
  // function renderAxes(newYscale, yAxis) {
  //   var leftAxis = d3.axisLeft(newYScale);
  
  //   yAxis.transition()
  //     .duration(1000)
  //     .call(leftAxis);
  
  //   return yAxis;
  // }
  
  





  
// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
  
  if (chosenXAxis === "poverty") {
    var label = "xyzpoverty look here:";
  }
  else {
    var label = "xyzage look here";
  } 
  
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
    });
  
  circlesGroup.call(toolTip);
  
  circlesGroup.on("mouseover", function(data) {           //replace with my new click event thing
    toolTip.show(data);                                   //replace with my new click event thing
  })                                                      //replace with my new click event thing
    // onmouseout event                                    //replace with my new click event thing
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });
  
  return circlesGroup;
}






// Import Data
d3.csv("data.csv", function(journData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
  journData.forEach(function(data) {       // changed hair_data to 'data' cuz that's what i'm usin'
    data.poverty = +data.poverty;          // changed hair_length to poverty (cuz that's my target)
    data.age = +data.age;
    data.healthcare = +data.healthcare;    // this was their y-data - changed to 'healthcare'
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
    data.flag = 0;                          // added this in so that it counts when a data point is clicked
  });

    // // xLinearScale function above csv import
  var xLinearScale = xScale(journData, chosenXAxis);
  var yLinearScale = yScale(journData, chosenYAxis);

    // Step 2: Create scale functions
    // ==============================
    // Create y scale function
  var xLinearScale = d3.scaleLinear()
    .domain([0, (d3.max(journData, d => d.age) + 5)])      //not sure if I need to change hairData to 'data' or 'journData'
    .range([0, width]);                                   //conclusion:  journData is correct                    

  var yLinearScale = d3.scaleLinear()
    .domain([0, (d3.max(journData, d => d.obesity) + 5)])  // this piece is setting the domain from 0 to ...
    .range([height, 0]);                                      //the max value in the 'healthcare' "column", plus 5

    // Step 3: Create axis functions
    // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // // append x axis
  // chartGroup.append("g")
  //   .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

    // Step 5: Create (initial) Circles
    // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(journData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    // // // Step 6: Initialize tool tip                           
    // // ==============================                         
    // var toolTip = d3.tip()             // this makes the popup if I click on a data point                     
    //   .attr("class", "tooltip")        // this makes the popup if I click on a data point                        
    //   .offset([80, -60])               // this makes the popup if I click on a data point                       
    //   .html(function(d) {              // this makes the popup if I click on a data point                       
    //     return (`${d.state}<br>Percentage of Poverty: ${d.poverty}<br>Percentage that lack proper healthcare: ${d.healthcare}`);
    //   });                              // this makes the popup if I click on a data point                    
                                                                 
    // // Step 7: Create tooltip in the chart                       
    // //==============================                            
    // chartGroup.call(toolTip);                        
    
    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function(data) {  
    // // I need to make a counter - to work in concert with the .tooltip
    //   var flag = data.flag
    //   flag = flag + 1;  
    //   console.log("This was clicked "+flag+" times")
    //   if ((flag%2) == 1) {
    //   toolTip.show(data, this);
    //   } else {
    //     toolTip.hide(data);
    //   }                                 
    // });                                                          
    //   // onmouseout event                               // commented this out while I try flag        
    // //   .on("click", function(data, index) {           // commented this out while I try flag
    // //     toolTip.hide(data);                          // commented this out while I try flag           
    // //   });                                                       

    // Create Y-axes labels
  var healthLabel = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("active", true)
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  var obeseLabel = chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("inactive", true)
      .attr("class", "axisText")
      .text("Levels of Obesity");

    // append x axis (perhaps not yet - gotta fix this)
  var povertyLabel = chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("class", "axisText")
    .text("In Poverty (%)")
    .classed("active", true)
    .text("People in Poverty (%)");

    // append x axis (perhaps not yet - gotta fix this)
  var ageLabel = chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
    .attr("class", "axisText")
    .classed("inactive", true)
    .text("Average Age");

  // // append y axis                     //took forever to figure out
  // chartGroup.append("text")            //but found out it this section
  //   .attr("transform", "rotate(-90)")  //was unnecessary - see my notes
  //   .attr("y", 0 - margin.left)        //at the end of page 10
  //   .attr("x", 0 - (height / 2))
  //   .attr("dy", "1em")
  //   .classed("axis-text", true)
  //   .text("yada yada placeholder text");
  
    // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // define/update the labels group
  // var labelsGroup = chartGroup.append("g")
  // .attr("transform", `translate(${width / 2}, ${height + 20})`);

    // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
        // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

            // replaces chosenXAxis with value
        chosenXAxis = value;

            // console.log(chosenXAxis)

            // functions here found above csv import
            // updates x scale for new data
        xLinearScale = xScale(journData, chosenXAxis);

            // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

            // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

            // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

            // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          povertyLabel
            .classed("active", true)
            .classed("inactive", false);
          ageLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          povertyLabel
            .classed("active", false)
            .classed("inactive", true);
          ageLabel
            .classed("active", true)
            .classed("inactive", false);
        }



        // Now the Y-Axis ones
        if (chosenYAxis === "healthcare") {
          healthLabel
              .classed("active", true)
              .classed("inactive", false);
          obeseLabel
              .classed("active", false)
              .classed("inactive", true);
        }
        else {
          healthLabel
            .classed("active", false)
            .classed("inactive", true);
          obeseLabel
            .classed("active", true)
            .classed("inactive", false);
        }        
      }
    });
});
