/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/


function bar2d(xVar, 
                yVar, 
                data,
                element,
                parser=d3.csvParse,
                bar_color='green',
                xLabel = xVar,
                yLabel = yVar)
               {
    var data = parser(data);
    var margin = { left:200, right:10, top:10, bottom:150 };
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
    var g = d3.select(element)
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
            return y(d[yVar]);
        })
        .attr("x", (d) => {
            return x(d[xVar]);
        })
        .attr("width", x.bandwidth)
        .attr("height", (d) => {
            return height-y(d[yVar])
        })
        .attr("fill", (d) => {
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

function bar2dv2(xVar,
                yVar,
                data,
                element,
                title='',
                xLabel=xVar,
                yLabel=yVar,
                yUnit='',
                bar_color='rgba(63, 191, 191, 0.59)',
                width = 800,
                height = 600,
                parser=d3.csvParse
                )
                {
    var data = parser(data);
    data.forEach((d) => {
        d[yVar] = +d[yVar];
    });
    var margin = { left:150, right:10, top:50, bottom:150 };
    var width = width - margin.left - margin.right;
    var height = height - margin.top - margin.bottom;
    var chart = d3.select(element)
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d) => d[xVar]))
        .paddingInner(0.3)
        .paddingOuter(0.3);

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d) => {return d[yVar]})]);

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)

    chart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    chart.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));

    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )
        .attr('stroke-dasharray', '1 6')
        .attr('stroke', '#FED966')
        .attr('stroke-width', '1');

    const barGroups = chart.selectAll()
        .data(data)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d[xVar]))
        .attr('y', (d) => yScale(d[yVar]))
        .attr('height', (d) => height - yScale(d[yVar]))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function (actual, i) {
            d3.selectAll('.value')
                .attr('opacity', 0)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 0.6)
                .attr('x', (d) => xScale(d[xVar]) - 5)
                .attr('width', xScale.bandwidth() + 10)

            const y = yScale(actual['revenue'])

            line = chart.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)

            barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (d) => xScale(d[xVar]) + xScale.bandwidth() / 2)
                .attr('y', (d) => {
                    if ((yScale(d[yVar]) + 30) >= (height-10)){
                    return yScale(d[yVar]) - 20
                    } else {
                    return yScale(d[yVar]) + 30
                    }
                })
                .attr('text-anchor', 'middle')
                .text((d, idx) => {
                    const divergence = (d[yVar] - actual['revenue']).toFixed(1)

                    let text = ''
                    if (divergence > 0) text += '+'
                    text += `${yUnit}${divergence}`

                    return idx !== i ? text : '';
                })
                .attr('fill', (d) => {
                    const divergence = (d[yVar] - actual['revenue']).toFixed(1)
                    if (divergence>0){
                    return 'green'
                    } else {
                    return 'red'
                    }
                })
        })
        .on('mouseleave', function () {
            d3.selectAll('.value')
                .attr('opacity', 1)

            d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (d) => xScale(d[xVar]))
                .attr('width', xScale.bandwidth())

            chart.selectAll('#limit').remove()
            chart.selectAll('.divergence').remove()
        })
        .attr('fill', bar_color)

    var x_border = d3.select("g.x-axis").node().getBoundingClientRect().height;
    var y_border = d3.select("g.y-axis").node().getBoundingClientRect().width;

    barGroups 
        .append('text')
        .attr('class', 'value')
        .attr('x', (d) => xScale(d[xVar]) + xScale.bandwidth() / 2)
        .attr('y', (d) => {
        if ((yScale(d[yVar]) + 30) >= (height-10)){
        return yScale(d[yVar]) - 5
        } else {
        return yScale(d[yVar]) + 30
        }
        })
        .attr('text-anchor', 'middle')
        .text((d) => `${yUnit}${d[yVar]}`)

    chart
        .append('text')
        .attr('class', 'y axis-label')
        .attr('x', -(height / 2))
        .attr('y', -y_border-8)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .attr("font-size", "15px")
        .text(yLabel)

    chart.append('text')
        .attr('class', 'x axis-label')
        .attr('x', width / 2)
        .attr('y', height + x_border + 16)
        .attr('text-anchor', 'middle')
        .attr("font-size", "15px")
        .text(xLabel)

    chart.append('text')
        .attr('class', 'title')
        .attr('x', width / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr("font-size", "25px")
        .text(title)

    // chart.append('text')
    //   .attr('class', 'source')
    //   .attr('x', width-100)
    //   .attr('y', height+margin.bottom/3)
    //   .attr('text-anchor', 'start')
    //   .text('Miadad Rashid')
};