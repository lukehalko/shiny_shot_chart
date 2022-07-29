console.log("shotType.js is active")

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ PIE CHART #2 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */
Shiny.addCustomMessageHandler('shot_type', function (message) {
  w = 250
    let newData = {}
    data = message;
    data = data.forEach(o => {
      newData[o["SHOT_TYPE"]] = o["n"]
    })
  
    d3.select("#pieChart2").remove()
    const radius = height/2
    keys = Object.entries(newData).map(d => d[0])
    const svg = d3.select(".pieTwo")
          .append("svg")
          .attr("id", "pieChart2")
          .attr("height", 250)
          .attr("width", 250)
          .attr("viewBox",`-25 -25 500 500`)
          .append("g")
          .attr("transform", `translate(${width/2}, ${height/2})`)
  
  const color = d3.scaleOrdinal().domain(Object.entries(newData).map(d => d[0])).range(d3.schemePastel1)
  const pie = d3.pie().value(d => d[1])
  const pie_data = pie(Object.entries(newData))
  
  svg.selectAll('whatever')
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
  