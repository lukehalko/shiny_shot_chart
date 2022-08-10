let show_options = true; // flag variable for toggling filter options dropdown
let teams, seasons; // 
console.log("filter.js active")
/**  Shiny  */
Shiny.addCustomMessageHandler("team_filter", (msg)=>{
    console.log("TEAMS: ", msg)
    teams = msg;
})

Shiny.addCustomMessageHandler("seasons", (msg)=>{
    seasons = msg;
})
const toggleDropdown = () => { 
    
    // Toggles a dropdown menu for the filter selection
    // The Bootstrap version of this doesn't seem to be working with the RShiny setup

    if (!show_options) d3.select("#filterOptions").attr("hidden", "true");
    
    else d3.select("#filterOptions").attr("hidden", null);
    
    show_options = !show_options;
}



d3.select("#addFilter").on("click", toggleDropdown);

d3.select("body").on("click", (e) => {
    console.log("clicked body");
    if (!show_options && e.target.id !== "addFilter"){
       toggleDropdown();
    }
});

d3.selectAll(".filters").on("click", (e) => {
    d3.select("#filterOptions").attr("hidden", "true") // Hide the results area in favor of filter options
    show_options = false;
    const filter = e.target.textContent.replace(" ", "");

    //d3.select(".resultsArea").append("form").attr("id", "filterArea").attr("action", "../app.R") //Append a div that will hold all filter items so that they can be deleted all at once

    // ~~~ GAME DATE FILTER ~~~
    if(filter === "GameDate"){

        d3.select("#filterArea").append("input")
            .attr("type", "text")
            .attr("id", "gameDateSearch");
        
        d3.select("#filterArea").append("button")
        .text("Submit")
        .attr("class", "btn btn-primary")
        .attr("id", "gameDateButton");

        // onChange event fires whenever new data is enterred into the search bar
        d3.select("#gameDateSearch").on("change", (e) => { 

            d3.select("#filterArea").remove();
            d3.select("#filterContainer").append("br").style("padding", "6px");
            d3.select("#filterContainer").append("div").attr("class","resetFilter").attr("class", "filterCard").text(e.target.value).on("click", removeCard);
        })

        // Append an "X" button that closes the prompt on click
        d3.select("#filterArea").append("button").attr("class", "btn btn-secondary").text("x").on("click", () => {
            d3.select("#filterArea").remove();
        });

    }
    // ~~~ TEAM FILTER ~~~
    if(filter === "Team"){
        d3.select("#teamForm").attr("hidden", null);
        
        

        // forEach team in the players profile
        Shiny.unbindAll()
        teams.forEach(t => {

            const tid = t.TEAM_ID

            const checkbox = d3.select(".shiny-options-group")
                .append("div")
                .attr("class", "checkbox")
                .append("label")

            checkbox.append("input")
                .attr("type", "checkbox")
                .attr("name", "teamFilter")
                .attr("value", tid)
                .text(tid)

            checkbox.append("span")


        })
        Shiny.bindAll()
        // d3.select("#teamFilter")
    }
})