d3.json('data/gdp.json').then( gdp_data=> {

 d3.csv('data/truncated_latest.csv').then(matchesCSV=>{
  let MedalsData = d3.nest()
                  .key(d=> d.NOC)
                  .key(d=>d.Year)
                  .entries(matchesCSV)

 d3.csv('data/athlete_events_modified.csv').then(participantsCSV=>{
  console.log(participantsCSV)

  let participantsInfo = d3.nest()
               .key(d=> d.NOC)
               .key(d=>d.Year)
               .rollup()
               .entries(participantsCSV)  

  //console.log(MedalsData)
  console.log(participantsInfo)

   const gap_plot = new GapPlot(MedalsData, gdp_data, participantsInfo);
  gap_plot.drawPlot();
 })



});

});