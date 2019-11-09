
var medals_year= {}
var participants_year = {}

d3.json('data/medals/2016.json').then(function(data) {
        medals_year[2016] = data;
})

d3.json('data/medals/2012.json').then(function(data) {

    medals_year[2012] = data;
})

d3.json('data/medals/2008.json').then(function(data) {
    medals_year[2008] = data;
})

d3.json('data/medals/2004.json').then(function(data) {

    medals_year[2004] = data;
})

d3.json('data/medals/2000.json').then(function(data) {

    medals_year[2000] = data;
})

d3.json('data/medals/1996.json').then(function(data) {
    medals_year[1996] = data;
})

d3.json('data/medals/1992.json').then(function(data) {
    medals_year[1992] = data;
})

d3.json('data/medals/1988.json').then(function(data) {
    medals_year[1988] = data;
})

d3.json('data/medals/1984.json').then(function(data) {
    medals_year[1984] = data;
})

d3.json('data/medals/1980.json').then(function(data) {
    medals_year[1980] = data;
})

d3.json('data/participants/2016.json').then(function(data) {
        participants_year["2016"] = data;
})

d3.json('data/participants/2012.json').then(function(data) {

    participants_year["2012"] = data;
})

d3.json('data/participants/2008.json').then(function(data) {
    participants_year["2008"] = data;
})

d3.json('data/participants/2004.json').then(function(data) {

    participants_year["2004"] = data;
})

d3.json('data/participants/2000.json').then(function(data) {

    participants_year["2000"] = data;
})

d3.json('data/participants/1996.json').then(function(data) {
    participants_year["1996"] = data;
})

d3.json('data/participants/1992.json').then(function(data) {
    participants_year["1992"] = data;
})

d3.json('data/participants/1988.json').then(function(data) {
    participants_year["1988"] = data;
})

d3.json('data/participants/1984.json').then(function(data) {
    participants_year["1984"] = data;
})

d3.json('data/participants/1980.json').then(function(data) {
    participants_year["1980"] = data;
})

    d3.json('data/gdp.json').then( gdp_data=> {
        //console.log(gdp_data); 


    
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
        console.log(medals_year);
        console.log(participants_year);
        const gap_plot = new GapPlot(medals_year, gdp_data, participants_year);
        gap_plot.drawPlot();
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
