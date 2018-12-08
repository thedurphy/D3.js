/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/


function bar2d(xVar, 
               yVar, 
               data, 
               parser=d3.csvParse,
               bar_color='green',
               xLabel = xVar,
               yLabel = yVar)
               {
    var data = parser(data);
    var margin = { left:200, right:10, top:10, bottom:150 };
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
    var g = d3.select('#chart-area')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    

            
    
    data.forEach(d => {
        d[yVar] = +d[yVar];
    });
    
    var x = d3.scaleBand()
        .domain(data.map((d) => {return d[xVar]}))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {
            return d[yVar]
        })])
        .range([height, 0]);
    
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
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
        .attr("transform", "translate(0, 0)")
        .call(yAxisCall);
    
    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", (d) => { 
            return y(d[yVar])
        })
        .attr("x", function(d, i){
            return x(d[xVar]);
        })
        .attr("width", x.bandwidth)
        .attr("height", (d) => {
            return height-y(d[yVar])
        })
        .attr("fill", function(d){
            return bar_color;
        });

    var x_border = d3.select("g.x-axis").node().getBoundingClientRect().height;
    var y_border = d3.select("g.y-axis").node().getBoundingClientRect().width;
    
    g.append("text")
        .attr('class', 'x axis-label')
        .attr("x", width / 2)
        .attr("y", height + x_border + 16)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text(xLabel);
    
    g.append("text")
        .attr('class', 'y axis-label')
        .attr("x", -(height/2))
        .attr("y", -y_border-8)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text(yLabel);
}
