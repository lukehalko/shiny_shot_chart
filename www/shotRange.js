console.log("script.js is active")

const legend = (data) => {

  
  
}
/*const m = {top: 10, right: 30, bottom: 30, left: 60}, // define the margins 

    width = 460 - m.left - m.right,
    height = 400 - m.top - m.bottom;*/ 

    height=250;
    width=100;
    o_width = 250  
    let data;

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ PIE CHART #1 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

Shiny.addCustomMessageHandler('shot_zone_range', function (message) {
    console.log("GOT MESSAGE FROM SHINY")
    let newData = {}
    data = message;
    data = data.forEach(o => {
      newData[o["SHOT_ZONE_RANGE"]] = o["n"]
    })

    d3.select("#pieChart").remove()
    const radius = height/2
        
    const svg = d3.select(".shotZoneRange")
          .append("svg")
          .attr("id", "pieChart")
          .attr("height", 500)
          .attr("width", o_width)
          .attr("viewBox",`-25 200 500 500`)
          .append("g")
          .attr("transform", `translate(${width/2}, ${height/2})`)
  
  const keys = Object.entries(newData).map(d => d[0])
  const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet1)
  const pie = d3.pie().value(d => d[1])
  const pie_data = pie(Object.entries(newData))


  
 svg.selectAll('paths')
  .data(pie_data)
  .join('path')
  .attr('d', d3.arc()
    .innerRadius(radius)         // This is the size of the donut hole
    .outerRadius(100)
  ).attr("fill", d => color(d.data[0]))
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7).on("mouseover", ()=>{
    svg.selectAll("dots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("cx", -55)
    .attr("cy", (d,i)=>280 + i*40)
    .attr("r", 17)
    .attr("class","label")
    .style("fill", d => color(d))

  svg.selectAll("labels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", -15)
    .attr("y", (d,i) => 280 + i*40)
    .style("fill", d => color(d))
    .style("font-size", "30px")
    .attr("class", "label")
    .text(d => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
  }).on("mouseout", () => {
    d3.selectAll(".label").remove()
  })
})



