console.log("script.js is active")

const cleanStr = (s) => {
  return s.replaceAll(" ", "").replace(/^/, "C").replaceAll(".","").replaceAll("-","").replaceAll("+", "")
}

    height=250;
    width=100;
    o_width = 500;   // For some reason it breaks when I try to name this variable width? 
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
          .attr("viewBox",`250 -25 500 500`)
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
  .attr("stroke", "rgb(234, 238, 239)")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

  .on("mouseover", (e) => {
    dot_class = cleanStr(e.target.__data__.data[0])
    
    // hide all dots not in the category that you clicked
    for (k in keys){
      cat = keys[k]
        if(cleanStr(keys[k])!=dot_class){
          d3.selectAll(`.${cleanStr(cat)}`).style("fill", "gray")
        }
    }
  })

  .on("mouseout", (e) => {
    dot_class = cleanStr(e.target.__data__.data[0])

    // hide all dots not in the category that you clicked
    for (k in keys){
      cat = keys[k]
        if(cleanStr(keys[k])!=dot_class){
          d3.selectAll(`.${cleanStr(cat)}`).style("fill", d => d["SHOT_MADE_FLAG"]==0? "red":"green")
        }
    }
  })
  
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

    svg.selectAll("dots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("cx", 300)
    .attr("cy", (d,i)=> 0 + i*40)
    .attr("r", 17)
    .attr("class","label")
    .style("fill", d => color(d))

    svg.selectAll("labels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 350)
    .attr("y", (d,i) => 1 + i*40)
    .style("fill", d => color(d))
    .style("font-size", "30px")
    .attr("class", "label")
    .text(d => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

    // // highlight selected area on shot chart
    // cat = e.target.__data__.data[0]
    // dot_class = cleanStr(cat)    
    // d3.selectAll(`.${dot_class}`).attr("stroke", color(cat))
  
  .on("mouseout", (e) => {
    // // Delete labels on mouseout
    // d3.selectAll(".label").remove()

    // // Remove highlight on mouseout
    // dot_class = cleanStr(e.target.__data__.data[0])
    // d3.selectAll(`.${dot_class}`).attr("stroke","transparent")
  })
})