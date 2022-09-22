console.log("script.js is active")

height=250;
svg_width = 250;   
let clicked = false;

const cleanStr = (s) => { 
  // A helper function for making strings conform to CSS classname standards
  return s.replaceAll(" ", "").replace(/^/, "C").replaceAll(".","").replaceAll("-","").replaceAll("+", "").replaceAll("<", "")
}

const toPct = (dec) => {
  // helper function for converting a decimal num (e.g. 0.65789) to a string showing a percentage (e.g. "65%")
  const int = parseInt(dec * 100)

  return (int >= 10) ? int.toString() + "%" : "0" + int.toString() + "%"
}

/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ PIE CHART: Shot Range ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */

Shiny.addCustomMessageHandler('shot_zone_range', function (message) {
    let newData = {}
    let data = message;
    
    data = data.forEach(o => {
      newData[o["SHOT_ZONE_RANGE"]] = o["n"] // Unpack the shiny object into something more workable
    })

    const n_shots = Object.entries(newData).reduce( (prev, curr) => { return curr[1] + prev[0] }) 
    console.log("n_shots = ", n_shots)
    d3.select("#pieChart").remove()
    const radius = 150
    

    const svg = d3.select(".shotZoneRange") // generate an svg element to hold the chart
          .append("svg")
          .attr("id", "pieChart")
          .attr("height", 250)
          .attr("width", svg_width)
          .attr("viewBox",`250 -25 25 500`)
          .append("g")
          .attr("transform", `translate(${230}, ${230}) scale(1.4)`)
  

  const keys = Object.entries(newData).map(d => d[0])
  const color = d3.scaleOrdinal().domain(keys).range(["#440381","#E03800", "#473144", "0B032D", "#7CDF91"])
  const pie = d3.pie().value(d => d[1])
  const pie_data = pie(Object.entries(newData))
  console.log("newData: ", newData)

 svg.selectAll('paths')
  .data(pie_data)
  .join('path')
  .attr('d', d3.arc()
    .innerRadius(radius)   // This is the size of the donut hole
    .outerRadius(100)
  ).attr("fill", d => color(d.data[1]))
  .attr("test", d=> d.data[1])
  .attr("stroke", "rgb(234, 238, 239)")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

  .on("mouseover", (e) => {

    // on mouseover, do two things: highlight dots in that shot range, and render new text inside the pie

    // First, remove any text if there is any
    d3.select(".category_text").remove()
    d3.select(".percentage_text").remove()

    dot_class = cleanStr(e.target.__data__.data[0])
    
    // highlight dots: 

    for (k in keys){
      cat = keys[k]
        if(cleanStr(keys[k])!=dot_class){
          d3.selectAll(`.${cleanStr(cat)}`).style("fill", "gray") // All dots not in category turn gray
        }
    }

    // render new text:

    cat = e.target.__data__.data[0]

    cat_n_shots = e.target.__data__.data[1] 

    console.log(cat)

    svg.append("text").text(cat)
    .attr("class", "category_text")
    .attr("x", "-30").attr("y", "-55")
    .style("font","bold 18px monospace")
    .style("fill", color(cat_n_shots))

    console.log("cat_n_shots = ", cat_n_shots)
    console.log("n_shots = ", n_shots)
    console.log(cat_n_shots / n_shots)

    svg.append("text").text(toPct(cat_n_shots/n_shots))
    .attr("class", "percentage_text")
    .attr("x", "-74").attr("y", "30")
    .style("font", "65px bungee")
    .style("fill", color(cat_n_shots))


  })

  .on("mouseout", (e) => {
    dot_class = cleanStr(e.target.__data__.data[0])

    // hide all dots not in the category that you clicked
    for (k in keys){
      cat = keys[k]
        if(cleanStr(keys[k])!=dot_class){
          d3.selectAll(`.${cleanStr(cat)}`).style("fill", d => d["SHOT_MADE_FLAG"]==0? "#97010E":"#589d62")
        }
    }
  })
  
  .on("click",(e)=>{ 
    clicked = !clicked
   // When you click a piece of the donut, the shot chart should only display shots in ~that~ category
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


    /* ~ Code for generating static labels for pie chart ~ */

    // svg.selectAll("dots") 
    // .data(keys)
    // .enter()
    // .append("circle")
    // .attr("cx", 300)
    // .attr("cy", (d,i)=> 0 + i*40)
    // .attr("r", 17)
    // .attr("class","label")
    // .style("fill", d => color(d))

    // svg.selectAll("labels")
    // .data(keys)
    // .enter()
    // .append("text")
    // .attr("x", 350)
    // .attr("y", (d,i) => 1 + i*40)
    // .style("fill", d => color(d))
    // .style("font-size", "30px")
    // .attr("class", "label")
    // .text(d => d)
    // .attr("text-anchor", "left")
    // .style("alignment-baseline", "middle")

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    
})