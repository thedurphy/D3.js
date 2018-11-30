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

    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => {
            console.log(d);
            return (i*100)+25;
        })
        .attr('cy', 400)
        .attr('r', (d, i) => {return d.age*0.5})
        .attr('fill', function(d){
            if (d.name == 'Broo'){
                return "green";
            }
            else {
                return "red";
            }
        });
});

