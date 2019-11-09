

d3.json('data/events_data.json').then( data => {
    //console.log("vamshi");
    //console.log(data);

    d3.json('data/gdp.json').then(gdp_data=> {
      //  console.log(gdp_data);

        d3.json('data/participants.json').then(participants_data=> {

          d3.csv('data/truncated_latest.csv').then(matchesCSV=>{
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

                                        console.log(leaves[i]['Team']);
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
                                  console.log(sports);
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
                            })
                              .entries(matchesCSV);
            console.log("teamData",teamData);

            const table = new Table2(teamData);
            table.createTable();
          });




         //for (let i=0; i<data.length; i++)
         //{
          // for (let j = 1; j<gdp_data.length; j++) {
            // console.log(gdp_data[j]["field_3"].toUpperCase(), data[i].noc);

            // if (gdp_data[j]["field_3"].toUpperCase() ==  data[i].noc)
            //{
            //    let diff = data[i]["year"] - 1975;
            //    let field = "field_"+diff

                //data[i]["gdp"] = gdb_data[j][]
             //   console.log(data[i]["year"], field)
            // }

            // }
        //}

        //const gap_plot = new GapPlot(data, gdp_data, participants_data);
        //gap_plot.drawPlot();
        //const table = new Table();



    });

    });


    //let medals = {};

    // for (let i = 0; i < data.length ; i++)
    // {
    //      if (data[i].noc in medals) {
    //           medals[data[i].noc] += 1
    //      } else {
    //           medals[data[i].noc] = 1
    //      }
    //}

    // console.log(medals)
});
