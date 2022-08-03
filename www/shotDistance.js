let test
Shiny.addCustomMessageHandler("shot_distance", (message) => {
    let data=[]

    message.forEach(d => data.push(d.SHOT_DISTANCE))
    test = data
    d3.select("#violin").remove()
    // const name = data[0].PLAYER_NAME
    const svg = d3.select(".shotDistance")
        .append("svg")
        .attr("height", 400)
        .attr("width", 200)
        .attr("id", "violin")
        .attr("viewBox", "-500 600 1000 1000")
        .append("g")

    const y = d3.scaleLinear()
        .domain([0, 40])
        .range([2000, 0])

    svg.append("g").call(d3.axisLeft(y)).attr("x", 50)


    // const x = d3.scaleBand()
    //     .domain([name])
    //     .range([0, 100])

    const hist = d3.histogram().domain(y.domain())
    .thresholds(y.ticks(20))
    .value(d => d/*.SHOT_DISTANCE*/)

    
    const area = d3.area()
        .x0(d => -d.length/10)
        .x1(d => d.length/10)
        .y(d => y(d.x0))
        .curve(d3.curveCatmullRom)

    svg.selectAll("v")
        .data([data])
        .enter()
        .append("path")
        .style("stroke", "#15133C")
        .style("fill", "#15133C")
        .style("filter", "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))")
        .attr("d", (d) => area(hist(d)))
        .attr("class", (d) => `${d}`)
})