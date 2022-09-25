var margin  = {top: 5, right: 10, bottom: 30, left: 2},
        width   = 376 - margin.left - margin.right,
        height  = 100 - margin.top - margin.bottom,
        x       = d3.scale.ordinal().rangeRoundBands([0,width], 0.5),
        y       = d3.scale.linear().range([height,0]);

//draw axis
    var xAxis   = d3.svg.axis()
        .scale(x)
        // .orient("bottom");
	var yAxis   = d3.svg.axis()
  //       .scale(y)
  //       // .orient("left")
  //       // .ticks(2)
  //       // .innerTickSize(-width)
  //       // .outerTickSize(0)
  //       // .tickPadding(10);

 var svg     = d3.select("#graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function (data)
    {
        x.domain(data.map(function (d)
        {
            return d.day;
        }));

        y.domain([0, d3.max(data, function (d)
        {
            return d.amount;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis)
            .selectAll("text")
            // .style("text-anchor", "middle")
            .attr("dx", "0em")
            .attr("dy", "0em")
            .attr("y", 30)
            // .attr("transform", "rotate(0)" );

        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(yAxis)
        //     .append("text")
        //     // .attr("transform", "rotate(-90)")
        //     // .attr("y", 5)
        //     // .attr("dy", "0.8em")
        //     // .attr("text-anchor", "end")
        //     // .text("Word Count");

        svg.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
            // .style("fill", "orange")
            .attr("x", function(d)
            {
                return x(d.day);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d)
            {
                return y(d.amount);
            })
            .attr("height", function (d)
            {
                return height - y(d.amount);
            });
		
})