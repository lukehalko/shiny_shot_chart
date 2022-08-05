let show_options = true;

let x
// let xhr = new XMLHttpRequest();
//             let url = "/Users/lukeh/DATA/CompassRed/shiny/shiny_shot_chart/app.R";
       
//             // open a connection
//             xhr.open("POST", url, true);
 
//             // Set the request header i.e. which type of content you are sending
//             xhr.setRequestHeader("Content-Type", "application/json");



$(document).on('shiny:inputchanged', (e) => {
    console.log(e)
})

$(document).on("shiny:sessioninitialized", () => {
    console.log("hello")
  

const toggleDropdown = () => { 
    
    // Toggles a dropdown menu for the filter selection
    // The Bootstrap version of this doesn't seem to be working with the RShiny setup

    if (!show_options) d3.select("#filterOptions").attr("hidden", "true") 
    else d3.select("#filterOptions").attr("hidden", null)
    
    show_options = !show_options
}

const removeCard = (e) => {
    type = e.target.classList[1]

    switch(type){
        case "team":
            // document.getElementById("team").value=""
            // $("#team").submit()
                Shiny.setInputValue("team", "")
    }


    x=e
    e.target.remove()

}

d3.select("#addFilter").on("click", toggleDropdown)

d3.select("body").on("click", (e) => {
    console.log("clicked body")
    if (!show_options && e.target.id !== "addFilter"){
       toggleDropdown()
    }
})

d3.selectAll(".filters").on("click", (e) => {
    d3.select("#filterOptions").attr("hidden", "true") // Hide the results area in favor of filter options
    show_options = false
    const filter = e.target.textContent.replace(" ", "")

    //d3.select(".resultsArea").append("form").attr("id", "filterArea").attr("action", "../app.R") //Append a div that will hold all filter items so that they can be deleted all at once

    // ~~~ GAME DATE FILTER ~~~
    if(filter === "GameDate"){

        d3.select("#filterArea").append("input")
            .attr("type", "text")
            .attr("id", "gameDateSearch")
        
        d3.select("#filterArea").append("button")
        .text("Submit")
        .attr("class", "btn btn-primary")
        .attr("id", "gameDateButton")

        // onChange event fires whenever new data is enterred into the search bar
        d3.select("#gameDateSearch").on("change", (e) => { 

            // Shiny.setInputValue(filter, e.target.value) not working for whatever reason
            
            d3.select("#filterArea").remove()
            d3.select("#filterContainer").append("br").style("padding", "6px")
            d3.select("#filterContainer").append("div").attr("class", "filterCard").text(e.target.value).on("click", removeCard)
        })

        // Append an "X" button that closes the prompt on click
        d3.select("#filterArea").append("button").attr("class", "btn btn-secondary").text("x").on("click", () => {
            d3.select("#filterArea").remove()
        })

    }
    // ~~~ TEAM FILTER ~~~
    if(filter === "Team"){
        d3.select("#teamForm").attr("hidden", null)


        d3.select("#team").on("change", (e) => {
            // Shiny.setInputValue("Team", e.target.value)

            // let input = JSON.stringify({"Team":e.target.textContent})
            // xhr.send(input)

            // onChange event fires whenever new data is enterred into the search bar
            d3.select("#filterContainer").append("br").style("padding", "6px")
            d3.select("#filterContainer").append("div").attr("class", "filterCard team").text(e.target.value).on("click", /*removeCard*/ ()=>{Shiny.setInputValue("team", "")})

            // Append an "X" button that closes the prompt on click
            d3.select("#filterTeam").append("button").attr("class", "btn btn-secondary").text("x").on("click", () => {
            d3.select("#filterTeam").attr("hidden", "true")
            })
        })
    }
})


})