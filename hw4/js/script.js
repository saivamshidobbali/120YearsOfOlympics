

d3.json('data/Olympic_data.json').then( data => {
    console.log("vamshi");
    console.log(data);

    d3.json('data/gdp.json').then(gdp_data=> {
        console.log(gdp_data); 

        d3.json('data/participants.json').then(participants_data=> {

    
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

        const gap_plot = new GapPlot(data, gdp_data, participants_data);
        gap_plot.drawPlot();



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
