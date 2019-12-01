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

this.aggregateColorScale = d3.scaleLinear()
        .range(["#d2edcd","#084081"]);

this.tableHeaders = ["Team", "Gold", "Silver", "Bronze", "Total"];

}

beforeTable(activeYear){
  let that=this;
  console.log("entered before");
//  that.tableHeaders.splice(0, 0, "Team");
 let head = d3.select("thead").select("tr")
 let td = head.selectAll("th,td,td,td")
      .data(that.tableHeaders)
      .on("click",(d)=>{
         console.log("d",d);
        console.log("prssed");
        if (this.assending) {
        this.check(d,activeYear);
            this.assending = false;
        } else {
          this.check2(d,activeYear);

            this.assending = true;
        }
        this.createTable(activeYear);

      });

}

check(d,activeYear){
  console.log("enter check");
  if (d == "Team") {
      this.tableElements.sort(function (a, b) {
      //  d.values[i].value["Country Name"]
      //console.log("*****",a.values.key);
              return a.values[0].value['Country Name'] < b.values[0].value['Country Name']  ? -1 : 1        })
  }
else if (d=="Gold") {
  this.tableElements.sort(function (a, b) {
    let x,y,x1;

  for(let ele in a.values){
  //  if(a.values[ele].value['Total Gold']!=undefined && b.values[ele].value['Total Gold']!=undefined){
        x1=a.values[ele];

        x=a.values[ele];//['Total Gold'];
        y= b.values[ele];
        console.log(x,y);
      //  console.log(y);
  //}
}

  console.log("fffff",x);
  return x < y  ? -1 : 1        })
  }


}

  /*else {
      this.teamData.sort(function (a, b) {
          return a["Total"] - b["Total"];
      })
  }
*/

check2(d,activeYear){
  console.log("enter check2");

  if (d == "Team") {
      this.tableElements.sort(function (a, b) {

        //onsole.log("*****",a.values['key']);

          return b.values[0].value['Country Name'] < a.values[0].value['Country Name']  ? -1 : 1
      })
  } else if (d=="Gold") {
    this.tableElements.sort(function (a, b) {
    //  d.values[i].value["Country Name"]
    let x,y,x1;
    for (let ele in a.values){
    //  if(a.values[ele].value['Total Gold']!=undefined && b.values[ele].value['Total Gold']!=undefined){
    x1=a.values[ele];

          x=a.values[ele]['value'];//['Total Gold'];
          y= b.values[ele];
          console.log(x1,x);
        //  console.log(y);
    //}
  }
  console.log("fffff",x);

    return y < x  ? -1 : 1        })
    }
}



createTable(activeYear){
let that = this;

console.log(that.tableElements);
//let maxTotalGames= d3.max(that.tableElements, function (d) {
  // return d.values;
//})
let new_tableElements=[];
for(let ele in that.tableElements){
  console.log("****");
  console.log("all eles",that.tableElements[ele].values);
  for (let l in that.tableElements[ele].values){
    //console.log(that.tableElements[ele].values[l].key);
    if(that.tableElements[ele].values[l].key == activeYear){
      console.log(that.tableElements[ele].values[l]);
      //new_tableElements.append();

    }
    else{
      console.log(that.tableElements[ele].values[l].key);
      //delete that.tableElements[ele].values[l].values
    }

  }
}
that.gameScale.domain([0,500]);
that.aggregateColorScale.domain([0,500]);

let tablerow = d3.select("tbody").selectAll("tr")
     .data(that.tableElements)
     .join('tr');

//tablerow.text(function(d){
//return d.key;
let tablehead = tablerow.selectAll("th")
                        .data(function (d) {
                        //  console.log([d]);
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
                      return d.values[i].value["Country Name"];
                   });


let td = tablerow.selectAll("td")
                .data(function (d, i) {
                    let list = []
                  //  console.log(d.values);
                   let a = d.values;
                   for (let ele in a){
                  //   console.log("ele",d.values[ele].key);
                     if(d.values[ele].key==activeYear){
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
                  .attr("fill", function (d) {
                      return that.aggregateColorScale(d)
                  })                  //.attr("fill", function (d) {
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
            .text(function (d) {
                return d;
            })


}

}
