// from data.js
var tbody = d3.select("tbody");

function toBeNamed(table) {
  table.forEach((toBeDefined) => {
    var row = tbody.append("tr");
    Object.entries(toBeDefined).forEach(([key,value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
}

// on startup - this loads the full data table into the html page
function onStart() {
  d3.event.preventDefault();
  toBeNamed(inputDate) 
  });
}


d3.select("#filter-btn").on("click", onStart)

toBeNamed(data);

// this is the function I want to run when you click filter 
// submit.on("click", function()  {      // I know this part is probably way off
//   data.sort(function(o1,o2){          // this is just the last example I tried to 
//     if (sort_o1_before_o2)    return -1;  // integrate into the code and gave up on
//     else if(sort_o1_after_o2) return  1;  // just left it in for "structure"
//     else                      return  0;
//   });
// })

// stackoverflow option A
// function sortByDateAscending(a, b) {
//   // Cast to datetime
//   return new Date(a.datetime) - new Date(b.datetime);
// }

// // var submit = d3.select("#filterButton");
// data = data.sort(sortByDateAscending);
// console.log(data);


