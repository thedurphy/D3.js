/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/
d3.tsv("/../data/age.tsv").then(function(data){
    data.forEach(function(d){
        d.age = +d.age;
    });

    var svg = d3.select('#chart-area').append('svg')
    .attr("width", 1000)
    .attr("height", 1000);

    var circles = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => {
            console.log(d);
            return (i*100)+25;
        })
        .attr('y', 400)
        .attr('height', (d, i) => {return d.age*1})
        .attr('width', (d, i) => {return 75})
        .attr('fill', function(d){
            if (d.name == 'Broo'){
                return "blue";
            }
            else {
                return "red";
            }
        });
});

