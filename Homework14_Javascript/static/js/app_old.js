// from data.js
// var tableData = data;
var firstRow = data[0]
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


// function dateFilter() {
//   // Declare variables 
//   var input, filter, table, tr, td, i;
//   input = document.getElementById("dateInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("data");
//   tr = table.getElementsByTagName("tr");

function parseMDY(s) {
  var b = s.split(/\D/);
  return new Date(b[2], b[0]-1, b[1]);
}

//   // Loop through all table rows, and hide those who don't match the search query
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     if (td) {
//       if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     } 
//   }
// }
