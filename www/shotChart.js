let width = 450
let height = 450

Shiny.addCustomMessageHandler('shotlocation', function(message){
    console.log("RECIEVED SHOT LOCATION DATA")
    let data = message;
    
    d3.select("#shotLocation").remove()

    const svg = d3.select(".shotChart")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .attr("id", "shotLocation")
    .append("g")
    .attr("transform", `translate(0,-10)`)

    const x = d3.scaleLinear()
      .domain([-250, 250])
      .range([0,width])
    const y = d3.scaleLinear()
      .domain([0,450])
      .range([height,0])

    svg.selectAll("shotDots")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d=>x(d["LOC_X"]))
        .attr("cy", d=>y(d["LOC_Y"]))
        .attr("r", 2.5)
        .style("fill", "black")
})