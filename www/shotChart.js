let width = 450
let height = 450

let shot_data

Shiny.addCustomMessageHandler('shotlocation', function(message){
    let data = shot_data = message;
    d3.select("#shotLocation").remove()

    const svg = d3.select(".shotChart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .attr("id", "shotLocation")
      .append("g")
      .attr("transform", `translate(0,-40)`)

    svg.append("image")
      .attr("href", "./img/nba-halfcourt-diagram-removebg-preview.png")
      .attr("transform", "rotate(180) translate(-139,15) scale(1.45)")
      .attr("transform-origin", "50% 50%")
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
        .attr("class", d=>`${d["SHOT_ZONE_RANGE"].replaceAll(" ", "").replace(/^/, "C").replaceAll(".","").replaceAll("-","").replaceAll("+", "")}`)
        .style("fill", d => d["SHOT_MADE_FLAG"] == 0 ? "#97010E" : "#589d62")
        .style("opacity", "40%")
})