console.log("shootingSplits.js is active")

Shiny.addCustomMessageHandler("shooting_splits", (message) => {

    const splits = message[0]

    d3.select("#fg2_pct").text(splits.fg2_pct)

    d3.select("#fg3_pct").text(splits.fg3_pct)

    d3.select("#fg_pct").text(splits.fg_pct)

})

