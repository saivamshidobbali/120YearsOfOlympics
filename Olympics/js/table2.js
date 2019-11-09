class Table2{

constructor(teamData){
this.tableElements= teamData;
this.cell = {
    "width": 260,
    "height": 50,
    "buffer": 15
};

this.bar = {
    "height": 20
};
this.gameScale = d3.scaleLinear()
    .range([0,this.cell.width]);

this.ascending=true;
}

createTable(activeYear="2016"){
let that = this;

console.log(that.tableElements);
//let maxTotalGames= d3.max(that.tableElements, function (d) {
  // return d.values;
//})

that.gameScale.domain([0,500]);


let tablerow = d3.select("tbody").selectAll("tr")
     .data(that.tableElements)
     .join('tr');

//tablerow.text(function(d){
//return d.key;
let tablehead = tablerow.selectAll("th")
                        .data(function (d) {
                          console.log([d]);
                          return [d];   })
                        .join("th")
                        .text(function(d,i){
                          //if(d.value.key.value.type == "game"){
                          //return d.key;
                        //}
                        //else {
                        //  return d.key;
                        //}
                     //
                     console.log(d.values[i].value["Country Name"]);
                     return d.values[i].value["Country Name"];
                   });


let td = tablerow.selectAll("td")
                .data(function (d, i) {
                    let list = []
                  //  console.log(d.values);
                   let a = d.values;
                   for (let ele in a){
                     console.log("ele",d.values[ele].key);
                     if(d.values[ele].key=="2016"){
                       list.push(d.values[ele].value['Total Gold'])
                       list.push(d.values[ele].value['Total Bronze'])
                       list.push(d.values[ele].value['Total Silver'])
                       list.push(d.values[ele].value['Total Medals'])
                     }
                   }


                    return list
                })
                td = td.join('td');

let bars = td.selectAll("svg")
            .data(function (d) {
                return [d];
                  }).join('svg')
              .attr("width", this.cell.width)
              .attr("height", this.cell.height);

let rect = bars.selectAll("rect")
                .data(function (d) {
                    return [d];
                }).join('rect')
                .attr("width", function (d) {
            //console.log(d);
                      return that.gameScale(d);
                  })
                  .attr("height", 40)
                  //.attr("fill", function (d) {
                  //    return aggregateColorScale(d.value)
                  //})
let barstext = bars.selectAll("text")
                    .data(function (d) {
                        return [d];
                    }).join('text')
                    .attr("x", function (d) {
                        return that.gameScale(d)+5;
                    })
                    .attr("y", this.cell.height / 2 + 5)
                    .attr("class", "label")
                    .text(function (d) {
                        return d;
                    })


}

updateTable(activeYear="2016"){



}

}
