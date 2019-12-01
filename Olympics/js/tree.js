class TreeMap {

	constructor(treeData, updateyear) {

    this.treeData = treeData;
    this.updateyear = updateyear;
 }

    createTreeMap() {

    let colorScale = d3.scaleOrdinal(d3.schemePaired);
    let that = this;
    
       //let root = d3.hierarchy(this.MedalsData);	

       //console.log(root.descendants());
       //console.log(root.links());
    
    let treemap = d3.treemap()
                    .size([400, 500])
                    .padding(1);

    let root = d3.stratify()
            .id(d => d.name)
            .parentId(d => d.parent)
            (that.treeData)
            .sum(d => d.medals)
            .sort((a, b) => b.height - a.height || b.value - a.value);
       
    treemap(root);


    let svgContainer = d3.select("#treemap")
                         .append("svg")
                         .attr("width", 1000)
                         .attr("height", 1000);

    let cell = svgContainer.selectAll("a")
            .data(root.leaves())
            .join("a")
            .attr("transform", d => "translate(" + d.x0 + "," + d.y0 + ")");


    let rects = cell.append("rect")
            .attr("id", d => d.id);

        rects.attr("height", d => d.y1 - d.y0).
            transition().duration(4000) 
            .attr("width", d => d.x1 - d.x0)
            .attr("fill",  d => {
                let a = d.ancestors();
                return colorScale(a[a.length - 2].id); });
        
        rects.on("mouseover", function(d,i) {		
                     rects.html("<title>" + d.id + "</title>")	
                    })					
                .on("mouseout", function(d) {		

                });

    let label = cell.append("text")
            .attr("clip-path", d => d.name);
        
    label.append("tspan")
            .attr("x", 3)
            .attr("y", 18)
            .text(function(d){
                       return d.id;
                }
            );

    label.append("tspan")
            .attr("x", 15)
            .attr("y", 40)
            .text(
            	function(d) {
                    return d.medals;
                }
            );
    
    //cell.selectAll("rect").on("click", function() {that.displayLineChart(this.id);});
    cell.append("title")    
            .text(d =>  d.id + "\n" + d.medals)
            .style('fill', "white");             

    }

    updateTreeMap(data) {

       let colorScale = d3.scaleOrdinal(d3.schemePaired);

       let that = this;
    
       //let root = d3.hierarchy(this.MedalsData);	

       //console.log(root.descendants());
       //console.log(root.links());
       let treemap = d3.treemap()
            .size([400, 500])
            .round(true)
            .padding(1);

       let root = d3.stratify()
            .id(d => d.name)
            .parentId(d => d.parent)
            (data)
            .sum(d => d.medals)
            .sort((a, b) => b.height - a.height || b.value - a.value);
       
    treemap(root);
	
    let divContainer = d3.select("#treemap")
    
    let cell = divContainer.select('svg').selectAll('a')
            .data(root.leaves())
            .join("a")
            .attr("transform", d => "translate(" + d.x0 + "," + d.y0 + ")");


    let rects = cell.selectAll("rect")
    rects.remove();

    rects = cell.append("rect")
            .attr("id", d => d.id);
        rects.attr("height", d => d.y1 - d.y0).
            transition().duration(4000) 
            .attr("width", d => d.x1 - d.x0)
            .attr("fill",  d => {
                let a = d.ancestors();
                return colorScale(a[a.length - 2].id); });
        
        rects.on("mouseover", function(d,i) {		
                     rects.html("<title>" + d.id + "</title>")	
                    })					
                .on("mouseout", function(d) {		

                });

    let label = cell.selectAll("text")
                    .join('text')
                    .attr("clip-path", d => d.name);
        
    label.selectAll("tspan")
            .attr("x", 3)
            .attr("y", 18)
            .text(function(d){
                       return d.id;
                }
            );

    label.selectAll("tspan")
         .join('tspa')
            .attr("x", 15)
            .attr("y", 40)
            .text(
            	function(d) {
                    return d.medals;
                }
            );
    
    //cell.selectAll("rect").on("click", function() {that.displayLineChart(this.id);});
    cell.selectAll("title") 
        .join('title')
            .text(d =>  d.id + "\n" + d.medals)
            .style('fill', "white"); 
    }

}
