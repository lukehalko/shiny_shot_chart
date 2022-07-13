console.log("script.js is active")

/*const m = {top: 10, right: 30, bottom: 30, left: 60}, // define the margins 

    width = 460 - m.left - m.right,
    height = 400 - m.top - m.bottom;*/ 

    height=250;
    width=100;
    skinny = 250  
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
          .attr("height", 250)
          .attr("width", skinny)
          .attr("viewBox",`-25 -25 500 500`)
          .append("g")
          .attr("transform", `translate(${width/2}, ${height/2})`)
  
  const keys = Object.entries(newData).map(d => d[0])
  const color = d3.scaleOrdinal().domain(keys).range(d3.schemeSet2)
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
  .style("opacity", 0.7)

  svg.selectAll("dots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("cx", 100)
    .attr("cy", (d,i)=>100 + i*25)
    .attr("r", 7)
    .style("fill", d => color(d))

  svg.selectAll("labels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 120)
    .attr("y", (d,i) => 100 + i*25)
    .style("fill", d => color(d))
    .text(d => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

})


/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ PIE CHART #2 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

Shiny.addCustomMessageHandler('pie2', function (message) {
  console.log("got the OTHER message from shiny")
  let newData = {}
  data = message;
  data = data.forEach(o => {
    newData[o["SHOT_ZONE_RANGE"]] = o["n"]
  })

  d3.select("#pieChart2").remove()
  const radius = height/2
      
  const svg = d3.select(".pieTwo")
        .append("svg")
        .attr("id", "pieChart2")
        .attr("height", 250)
        .attr("width", skinny)
        .attr("viewBox",`-25 -25 500 500`)
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`)

const color = d3.scaleOrdinal().domain(Object.entries(newData).map(d => d[0])).range(d3.schemeSet2)
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
.style("opacity", 0.7)
})


/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ PIE CHART #3 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

Shiny.addCustomMessageHandler('pie3', function (message) {
  console.log("got the OTHER message from shiny")
  let newData = {}
  data = message;
  data = data.forEach(o => {
    newData[o["SHOT_ZONE_RANGE"]] = o["n"]
  })

  d3.select("#pieChart3").remove()
  const radius = height/2
      
  const svg = d3.select(".pieThree")
        .append("svg")
        .attr("id", "pieChart3")
        .attr("height", 250)
        .attr("width", skinny)
        .attr("viewBox",`-25 -25 500 500`)
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`)

const color = d3.scaleOrdinal().domain(Object.entries(newData).map(d => d[0])).range(d3.schemeSet2)
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
.style("opacity", 0.7)
})


