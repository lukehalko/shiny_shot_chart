let show_options = true; // flag variable for toggling filter options dropdown
let currentFilter, teams, seasons; //
let t
console.log("filter.js active")
/**  Shiny  */
Shiny.addCustomMessageHandler("team_filter", (msg)=>{
    console.log("TEAMS: ", msg)
    teams = msg;
})

Shiny.addCustomMessageHandler("season_filter", (msg)=>{
    console.log("SEASONS: ", msg)
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
    console.log(e.target)
    console.log("clicked body");
    if (!show_options && e.target.id !== "addFilter"){
       toggleDropdown();
    }
    // test = e //uncomment for clickout
    // if(!e.target.id.includes(currentFilter) && e.target.id != "addFilter" && e.target.id!="filterContainer" && e.target.id!="filterOptions" && e.target.classList[0] != "list-group-item" && e.target.type != "checkbox" && e.target.tagName != "SPAN" && e.target.tagName != "label"){ 

    //     d3.select(`#${currentFilter}Options`)._groups[0][0].innerHTML=""; //not sure why d3.remove() isn't working here

    // }
});

d3.selectAll(".filters").on("click", (e) => {
    d3.select("#filterOptions").attr("hidden", "true") // Hide the results area in favor of filter options
    show_options = false;
    const filter = e.target.textContent.replace(" ", "");
    currentFilter = filter.toLowerCase()

    //d3.select(".resultsArea").append("form").attr("id", "filterArea").attr("action", "../app.R") //Append a div that will hold all filter items so that they can be deleted all at once
    // ~~~ SEASON FILTER ~~~  
    if(filter == "Year"){ 
        d3.select("#yearForm").attr("hidden", null);

        // forEach team in the players profile
        Shiny.unbindAll()
        seasons.forEach(s => {

            const year = s.year

            const checkbox = d3.select("#yearOptions")
                .append("div")
                .attr("class", "checkbox")
                .append("label")

            checkbox.append("input")
                .attr("type", "checkbox")
                .attr("name", "yearFilter")
                .attr("value", year)
            
            checkbox.append("span").text(year)

        })
        Shiny.bindAll()
    }

    // ~~~ GAME FILTER ~~~ !!TODO!!
    // if(filter === "Game"){


    // }
    // ~~~ TEAM FILTER ~~~
    if(filter === "Team"){
        d3.select("#teamForm").attr("hidden", null);

        // forEach team in the players profile
        Shiny.unbindAll()
        teams.forEach(t => {

            const tid = t.TEAM_ID

            const checkbox = d3.select("#teamOptions")
                .append("div")
                .attr("class", "checkbox")
                .append("label")

            checkbox.append("input")
                .attr("type", "checkbox")
                .attr("name", "teamFilter")
                .attr("value", tid)
            
            checkbox.append("span").text(tid)

        })
        Shiny.bindAll()
    }

    d3.select(".searchArea").append("a").text("x").attr("id", "closeFilter").on("click", ()=>{
        d3.selectAll(".filterForm").attr("hidden", "true")
        d3.select("#closeFilter").remove()

    })

})