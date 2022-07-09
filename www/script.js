console.log("script.js is active")

const m = {top: 10, right: 30, bottom: 30, left: 60}, // define the margins 

    width = 460 - m.left - m.right,
    height = 400 - m.top - m.bottom;
let data;
Shiny.addCustomMessageHandler('shot_zone_range', function (message) {
    console.log("GOT MESSAGE FROM SHINY")
    newData = {}
    data = message;
    data = data.forEach(o => {
      newData[o["SHOT_ZONE_RANGE"]] = o["n"]
    })


    /*d3.select("#d3Graph").remove()
  
    // append the svg object to the body of the page
    const svg = d3.select("body")
    .append("svg")
    .attr("id", "d3Graph")
    .attr("width", width + m.left + m.right)
    .attr("height", height + m.top + m.bottom)
    .append("g")
    .attr("transform", `translate(${m.left}, ${m.top})`);

    //Read the data

    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.x_var))])
    .range([0, width]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.y_var))])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d =>  x(d.x_var) )
        .attr("cy", d => y(d.y_var) )
        .attr("r", 1.5)
        .style("fill", "#69b3a2")*/
    d3.select("#pieChart").remove()
    console.log(newData)
    const radius = Math.min(width, height)/2
        
    console.log(data)
    const svg = d3.select(".pie")
          .append("svg")
          .attr("id", "pieChart")
          .attr("height", height + m.top + m.bottom)
          .attr("width", width, m.left, m.right)
          .append("g")
          .attr("transform", `translate(${width/2}, ${height/2})`)

  const color = d3.scaleOrdinal().domain(Object.entries(newData).map(e => e[0])).range(d3.schemeSet2)
  const pie = d3.pie().value(d => d[1])
  const pie_data = pie(Object.entries(newData))
  
 svg.selectAll('whatever')
  .data(pie_data)
  .join('path')
  .attr('d', d3.arc()
    .innerRadius(100)         // This is the size of the donut hole
    .outerRadius(radius)
  ).attr("fill", d => color(d.data[0]))
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
})
