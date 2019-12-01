d3.json('data/gdp.json').then( gdp_data=> {
this.active_year = "1980";

// Add active class to the current button (highlight it)
var header = document.getElementById("topnavbar");
//console.log(header);
var btns = header.getElementsByClassName("btn");
//console.log(btns);
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}



 d3.csv('data/truncated_latest.csv').then(matchesCSV=>{
  let MedalsData = d3.nest()
                  .key(d=> d.NOC)
                  .key(d=>d.Year)
                  .entries(matchesCSV)

 d3.csv('data/athlete_events_modified.csv').then(participantsCSV=>{


  let participantsInfo = d3.nest()
               .key(d=> d.NOC)
               .key(d=>d.Year)
               .rollup()
               .entries(participantsCSV)


   const gap_plot = new GapPlot(MedalsData, gdp_data, participantsInfo, updateyear);
   gap_plot.drawPlot();

 })


let teamData = d3.nest()
                 .key(d=> d.NOC)
                 .key(d=>d.Year)
                 .rollup(leaves => {

let country_name = leaves[0]['Team'];
//console.log("--->",leaves);
len= leaves.length;
        // let total_medals = len;
         var total_gold=0;
         var total_bronze=0;
         var total_silver=0;
         var t_gold=0;
         var t_bronze=0;
         var t_silver=0;
         var female=0;
         var male=0;
         let games2 = [];
         var sports = {}
         let  new_list=[0,0,0,0];
         for(var i=0;i<len;i++){
         h(i);
         }
         let total_medals = total_gold+total_bronze+total_silver;
         function h(i){
                        if(leaves[i]['Sex']=='F'){
                          female+=1;
                        }
                        else{
                          male+=1;
                        }
                 if(leaves[i]['Medal']=="Gold" ){
                   total_gold+=1;
                 }
                 if(leaves[i]['Medal']=="Bronze"){
                   total_bronze+=1;
                 }
                 if(leaves[i]['Medal']=="Silver"){
                   total_silver+=1;
         }
         let game = {};

         if(!(leaves[i]['Sport'] in sports))
         {
           if(leaves[i]['Medal']!="NA"){
            // new_list[3]=1;
             sports[leaves[i]['Sport']]=[0,0,0,1];
           }
           if(leaves[i]['Medal']=="Gold")
           {
             new_list[0]=1;
             sports[leaves[i]['Sport']]=[1,0,0,1];

           }
           if(leaves[i]['Medal']=="Silver")
           {
             new_list[1]=1;
             sports[leaves[i]['Sport']]=[0,1,0,1];

           }
           if(leaves[i]['Medal']=="Bronze")
           {
             new_list[2]=1;
             sports[leaves[i]['Sport']]=[0,0,1,1];

           }
         }
         else{
           if(leaves[i]['Medal']!="NA"){
             sports[leaves[i]['Sport']][3]+=1;
           }
           if(leaves[i]['Medal']=="Gold")
           {
             new_list[0]+=1;
             sports[leaves[i]['Sport']][0]+=1;

           }
           if(leaves[i]['Medal']=="Silver")
           {
             new_list[1]+=1;
             sports[leaves[i]['Sport']][1]+=1;
           }
           if(leaves[i]['Medal']=="Bronze")
           {
             new_list[2]+=1;
             sports[leaves[i]['Sport']][2]+=1;
           }

         }
        // sports["type"]="game";
         }


       let obj = {
         "Country Name":country_name,
         "Male":male,
         "Female":female,
         "Total Medals":total_medals,
         "Total Gold": total_gold,
         "Total Silver":total_silver,
         "Total Bronze":total_bronze,
         "Sports":sports,
         "type":"aggregate"
       }


       return obj;
     }).entries(matchesCSV);

    // var line = new MultiLine();
     //line.line();
/*     "use strict";
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
    var table = new Table2(teamData);
    table.createTable(this.active_year,teamData);

function updateyear(active_year) {

       this.active_year = active_year;
       table.beforeTable(this.active_year);

       table.createTable(this.active_year,teamData);
       //table.updateTable(this.active_year);


}

});

});
