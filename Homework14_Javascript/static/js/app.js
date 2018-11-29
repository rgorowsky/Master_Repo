// from data.js
var tbody = d3.select("tbody");

// Let's just see if we can display the table
// var html = "<table border='1|1'>";          // new section
// for (var i = 0; i < rows.length; i++) {     // new section
//   html+="<tr>";                             // new section
//   html+="<td>"+data[i].datetime+"</td>";    // new section
// }

function onStart() {
  data.forEach((toBeDefined) => {
    var row = tbody.append("tr");
    Object.entries(toBeDefined).forEach(([key,value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
}
onStart();

function filterButton() {
  data.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
}
filterButton();