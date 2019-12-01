d3.json('data/gdp.json').then( gdp_data=> {
 this.active_year = "1980";

 d3.csv('data/t.csv').then(matchesCSV=>{
  
  let MedalsData = d3.nest()
                  .key(d=> d.NOC)
                  .key(d=>d.Year)
                  .rollup()
                  .entries(matchesCSV)


 d3.csv('data/athlete_events_modified.csv').then(participantsCSV=>{
 let participantsInfo = d3.nest()
               .key(d=> d.NOC)
               .key(d=>d.Year)
               .rollup()
               .entries(participantsCSV)


   // add update year param
   const gap_plot = new GapPlot(MedalsData, gdp_data, participantsInfo, updateyear);
   gap_plot.drawPlot();
 })

// table
let teamData = d3.nest()
                 .key(d=> d.NOC)
                 .key(d=>d.Year)
                 .rollup(leaves => {

let country_name = leaves[0]['Team'];

len= leaves.length;
         //let total_medals = len;
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

         let total_medals = total_gold + total_bronze + total_silver;
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
         "Total Medals": t_gold + t_silver + t_bronze,
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


  /*
  // Tree data makeup
  teamData = teamData.map(function(obj) { 
                    obj['children'] = obj['values']; // Assign new key 
                    delete obj['values']; // Delete old key 
                    return obj; 
                }); 

  console.log(teamData);

  for (let i = 0; i < teamData.length; i++) {
  //console.log(i);
  //console.log(teamData[i]['children']);
  let list = teamData[i]['children'];
  
  teamData[i]['children'] = list.map(function(obj) { 
                    obj['children'] = obj['value']; // Assign new key 
                    delete obj['value']; // Delete old key 
                    return obj; 
                 });  
  } 
  */



var treeData = [];

let that = this;

function prepare_tree_data() {
  treeData = [];
  treeData.push({'name': 'root', 'medals': 0, 'parent': ""});

  for(let i = 0; i < teamData.length; i++) {
     for (let j =0; j<teamData[i]['values'].length; j++) {
      if (teamData[i]['values'][j].key == that.active_year) {
           treeData.push({'medals': teamData[i]['values'][j]['value']['Total Medals'],
                          'name': teamData[i]['key'],
                          'parent': 'root'});

          for (let k = 0; k < teamData[i]['values'][j]['value']['Sports'].length; k++) {
               
                treeData.push( {'name': teamData[i]['values'][j]['value']['Sports'][k].key, 
                                'medals': teamData[i]['values'][j]['value']['Sports'][k]['value']['Total Medals'],
                                'parent': teamData[i].key })

          }

          }
    }
  }

  let sum = 0;
  for(let i=0; i< treeData.length; i++) {
    sum += parseInt(treeData[i]['medals']);
  }

  treeData[0]['medals'] = "undefined";
}  


prepare_tree_data()
console.log(treeData);
console.log(teamData)


const tree_map = new TreeMap(treeData, updateyear);
tree_map.createTreeMap();

//var table = new Table2(teamData);
//table.createTable(this.active_year);

function updateyear(active_year) {
       that.active_year = active_year;
       prepare_tree_data();
       tree_map.updateTreeMap(treeData);

       // table.beforeTable(this.active_year);
       // table.createTable(this.active_year);
       // table.updateTable(this.active_year);
}
 
});

});
