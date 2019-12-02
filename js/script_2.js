this.active_year = "1980";

// Add active class to the current button (highlight it)
var header = document.getElementById("topnavbar");
console.log(header);
var btns = header.getElementsByClassName("btn");
console.log(btns);
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

var line = new MultiLine();
line.line_graph();
d3.csv('data/athlete_events_modified.csv').then(matchesCSV=>{

let teamData = d3.nest()
                .key(d=> d.NOC)
                .key(d=>d.Year)
                .rollup(leaves => {

let country_name = leaves[0]['Team'];

len= leaves.length;
        let total_medals = len;

      return total_medals;
    }).entries(matchesCSV);

console.log(teamData);

var keys = Object.keys(teamData);


console.log(keys);

for(let ele in keys){

}
   // var line = new MultiLine();
    //line.line();
/*    "use strict";
exportToJsonFile(teamData);
    function exportToJsonFile(teamData) {
        let dataStr = JSON.stringify(teamData);
        let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        let exportFileDefaultName = 'data.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

*/


});
