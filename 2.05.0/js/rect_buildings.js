/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

        
d3.json("data/buildings.json").then(function(data){
    console.log(data);
    data.forEach(d => {
        d.height = +d.height;
    });

    var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", 600)
        .attr("height", 600);

    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

    var rects = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 20)
        .attr("x", function(d, i){
            return (i * 60);
        })
        .attr("width", 40)
        .attr("height", function(d){
            return y(d.height);
        })
        .attr("fill", function(d){
            return "green";
        })
})