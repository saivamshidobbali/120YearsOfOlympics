d3.json('data/gdp.json').then( gdp_data=> {
this.active_year = "1980";


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

len= leaves.length;
         let total_medals = len;
         var total_gold=0;
         var total_bronze=0;
         var total_silver=0;
         var t_gold=0;
         var t_bronze=0;
         var t_silver=0;
         let games2 = [];
         var sports = []

         for(var i=0;i<len;i++){

         h(i);
         }
         function h(i){

                 if(leaves[i]['Medal']=="Gold"){
                   total_gold+=1;
                 }
                 if(leaves[i]['Medal']=="Bronze"){
                   total_bronze+=1;
                 }
                 if(leaves[i]['Medal']=="Silver"){
                   total_silver+=1;
         }
         let game = {};
         if(sports.includes(leaves[i]['Sport'])==false)
         {
           sports.push(leaves[i]['Sport'])

           game.key = leaves[i]["Sport"];
           if(leaves[i]['Medal']=="Gold"){
             t_gold+=1;
           }
           if(leaves[i]['Medal']=="Bronze"){
             t_bronze+=1;
           }
           if(leaves[i]['Medal']=="Silver"){
             t_silver+=1;
   }
       game.value = {
         "Total Gold": t_gold,
         "Total Silver":t_silver,
         "Total Bronze":t_bronze,
         "type":"game"
       }
       games2.push(game);

         }


      }



       let obj = {
         "Country Name":country_name,
         "Total Medals":total_medals,
         "Total Gold": total_gold,
         "Total Silver":total_silver,
         "Total Bronze":total_bronze,
         "Sports":games2,
         "type":"aggregate"
       }


       return obj;
     }).entries(matchesCSV);



    var table = new Table2(teamData);
    table.createTable(this.active_year);

function updateyear(active_year) {

       this.active_year = active_year;
       table.createTable(this.active_year);
}

});

});

