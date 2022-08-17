Shiny.addCustomMessageHandler("player_id", (msg) => {

    d3.select(".playerImage").remove()

    if(msg.length > 0){

        const player_id = msg[0].PLAYER_ID

        d3.select(".circle")
        .append("img")
        .attr("src", `./img/players/img_${player_id}.png`)
        .attr("class", "playerImage")

    }
})