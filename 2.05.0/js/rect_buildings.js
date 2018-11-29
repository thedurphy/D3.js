/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var margin = { left:200, right:10, top:10, bottom:200 };

width = 800 - margin.left - margin.right;
height = 600 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

g.append("text")
    .attr('class', 'x-axis label')
    .attr("x", width / 2)
    .attr("y", height + 140)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("World's Tallest Buildings");
        

d3.json("data/buildings.json").then(function(data){
    console.log(data);
    data.forEach(d => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(data.map((d) => {return d['name']}))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {return d.height})])
        .range([0, height]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + (height+margin.top) + ")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", 10)
            .attr("x", -5)
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");

    var yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat((d) => {
            return d + "m";
        })
    g.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(0, " + (margin.top) + ")")
        .call(yAxisCall);


    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", margin.top)
        .attr("x", function(d, i){
            return x(d.name);
        })
        .attr("width", x.bandwidth)
        .attr("height", (d) => {return y(d.height)})
        .attr("fill", function(d){
            return "blue";
        })
})