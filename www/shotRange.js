console.log("script.js is active")

const cleanStr = (s) => {
  return s.replaceAll(" ", "").replace(/^/, "C").replaceAll(".","").replaceAll("-","").replaceAll("+", "")
}

    height=250;
    width=100;
    o_width = 250   // For some reason it breaks when I try to name this variable width? 
    let click;
    let clicked = false;

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ PIE CHART #1 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

Shiny.addCustomMessageHandler('shot_zone_range', function (message) {

  // Recieved shot_zone_range data from RShiny

    let newData = {}
    let data = message;
    data = data.forEach(o => {
      newData[o["SHOT_ZONE_RANGE"]] = o["n"]
    })

    d3.select("#pieChart").remove()
    const radius = height/2
        
    const svg = d3.select(".shotZoneRange")
          .append("svg")
          .attr("id", "pieChart")
          .attr("height", 250)
          .attr("width", o_width)
          .attr("viewBox",`-25 -25 500 500`)
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
    .innerRadius(radius)   // This is the size of the donut hole
    .outerRadius(100)
  ).attr("fill", d => color(d.data[0]))
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  
  .on("click",(e)=>{ 
    clicked = !clicked
   // When you click a piece of the donut, the shot chart should only display shots in *that* category
   // NOTE : this feature isn't supported in RStudio viewer likely due to the "hidden" stuff

    dot_class = cleanStr(e.target.__data__.data[0])
    
    // hide all dots not in the category that you clicked
    for (k in keys){
      cat = keys[k]
      if(clicked){
        if(cleanStr(keys[k])!=dot_class){
          d3.selectAll(`.${cleanStr(cat)}`).attr("hidden", "hidden")
        }
      }
      else{
        d3.selectAll(`.${cleanStr(cat)}`).attr("hidden", null)
      }
    }
  })
  
  .on("mouseover", (e)=>{
    // On Mouse Hover

    // Render labels 
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

    // highlight selected area on shot chart
    cat = e.target.__data__.data[0]
    dot_class = cleanStr(cat)    
    d3.selectAll(`.${dot_class}`).attr("stroke", color(cat))
  })
  
  .on("mouseout", (e) => {
    // Delete labels on mouseout
    d3.selectAll(".label").remove()

    // Remove highlight on mouseout
    dot_class = cleanStr(e.target.__data__.data[0])
    d3.selectAll(`.${dot_class}`).attr("stroke","transparent")
  })
})