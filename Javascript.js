
// ===== "DO YOU CURRENTLY HAVE A MENTAL HEALTH DISORDER?" (PIE) =====
function current_pie()
{
  // Loads 2016 by default
  d3.csv("Datasets/CurrentMHD_2016.csv", function(data)
  {
    document.getElementById("currentlyYear").innerHTML = "Currently (2016)"; //set to 2016 by default
    var w = 300;
    var h = 350;
    var padding = 30;

    var svg = d3.select("#current_pie")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


    // outer radius will be specified according to the size of the SVG (i.e., using w).
    var outerRadius = w/2;
    //inner radius are set to 0 to demonstrate the pie chart
    var innerRadius = 0;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // 2016 CSV
    d3.csv("Datasets/CurrentMHD_2016.csv", function(data)
    {
      d3.select("#currentMD_2016")
            .on("click", function(){
              document.getElementById("currentlyYear").innerHTML = "Currently (2016)";
              update(data);
            });
    });

    // 2017 CSV
    d3.csv("Datasets/CurrentMHD_2017.csv", function(data)
    {
      d3.select("#currentMD_2017")
            .on("click", function(){
              document.getElementById("currentlyYear").innerHTML = "Currently (2017)";
              update(data);
            });
    });

    // 2018 CSV
    d3.csv("Datasets/CurrentMHD_2018.csv", function(data)
    {
      d3.select("#currentMD_2018")
            .on("click", function(){
              document.getElementById("currentlyYear").innerHTML = "Currently (2018)";
              update(data);
            });
    });

    // 2019 CSV
    d3.csv("Datasets/CurrentMHD_2019.csv", function(data)
    {
      d3.select("#currentMD_2019")
            .on("click", function(){
              document.getElementById("currentlyYear").innerHTML = "Currently (2019)";
              update(data);
            });
    });

    // For updating the current donut chart
    function update(data)
    {
      // Update arcs with new data
      arcs = arcs.data(pie(data));

      // Add transition for updating path (arcs)
      arcs.select("path")
          .transition()
          .duration(750)
          .attrTween("d", interpolateFix);

      // Add transition for updating text
      arcs.select("text")
          .transition()
          .duration(750)
          .text(function(d) {
            var total = d3.sum(data.map(function(d) { return d.Value; }));
            var percent = (d.data.Value / total)*100;
            return percent.toFixed(1) + "%";
            //return d.data.Past;
          })
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          });
    }

    // Function for Interpolating from the current angles arcs
    function interpolateFix(arcT)
    {
      var interp = d3.interpolate(this.angles, arcT);
        this.angles = interp(0);
        return function(t) {
        return arc(interp(t));
      };
    }

    var pie = d3.pie()
                .sort(null)
                .value(function(d) {
                   return parseFloat(d.Value);
                })

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                  .on("mousemove", function(d){
                    d3.select("#tooltip")
                      .style("left", d3.event.pageX + "px")
                      .style("top", d3.event.pageY + "px")
                      .style("opacity", 1)
                      //.html((d.data.Past) + "<br>" + "Value: " + (d.data.Value) + "<br>" + "Percentage: " + percent.toFixed(1) + "%")
                      .html("<b>" + (d.data.Current) + ": </b>" + (d.data.Value))
                     })
                   .on("mouseout", function () {
                       // Hide the tooltip
                       d3.select("#tooltip")
                       .style("opacity", 0);;
                    });


    //setting color
    var colorScale = d3.scaleOrdinal().range(['rgb(44,123,182)','rgb(244,109,67)','rgb(116,173,209)']);

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          return colorScale(d.data.Current);
        })
        .attr("d", function(d, i) {
          return arc(d, i);
        })
        .transition()
        .duration(750)
        .attrTween("d", interpolateFix);

    arcs.append("text")
        .text(function(d) {
          var total = d3.sum(data.map(function(d) { return d.Value; }));
          var percent = (d.data.Value / total)*100;
          return percent.toFixed(1) + "%";
        })
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle") //makes the text place at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-weight", "bold");

    var legend = svg.append('g')
                 .data(pie(data))
                 .attr('class', 'legend')
                 .attr('transform', 'translate(' + (padding + 40) + ',' + (padding * 10 + 10) + ')');

    //draw rectangle for each data
    legend.selectAll('rect')
          .data(pie(data))
          .enter()
          .append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr("x", function(d, i) { return 70 * (i - 0.3); })
          .attr('y', padding - 10)
          .attr('fill', function(d, i){
            return colorScale(i);
          });

    //text for each legend
    legend.selectAll("text")
          .data(pie(data))
          .enter()
          .append('text')
          .text(function(d){
            return d.data.Current;
          })
          .attr("x", function(d, i) { return 70 * (i - 0.1); })
          .attr('y', padding - 10)
          .attr("text-anchor", "start")
          .attr("font-size", "15px")
          .attr("alignment-baseline", "hanging");
  });
}

// ===== "HAVE YOU HAD A MENTAL HEALTH DISORDER IN THE PAST?" (PIE) =====
function past_pie()
{
  document.getElementById("pastYear").innerHTML = "Had it previously (2016)"; //set to 2016 by default
  // Loads 2016 by default
  d3.csv("Datasets/PastMHD_2016.csv", function(data)
  {
    var w = 300;
    var h = 350;
    var padding = 30;

    var svg = d3.select("#past_pie")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


    // outer radius will be specified according to the size of the SVG (i.e., using w).
    var outerRadius = w/2;
    //inner radius are set to 0 to demonstrate the pie chart
    var innerRadius = 0;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // 2016 CSV
    d3.csv("Datasets/PastMHD_2016.csv", function(data)
    {
      d3.select("#pastMD_2016")
            .on("click", function(){
              document.getElementById("pastYear").innerHTML = "Had it previously (2016)";
              update(data);
            });
    });

    // 2017 CSV
    d3.csv("Datasets/PastMHD_2017.csv", function(data)
    {
      d3.select("#pastMD_2017")
            .on("click", function(){
              document.getElementById("pastYear").innerHTML = "Had it previously (2017)";
              update(data);
            });
    });

    // 2018 CSV
    d3.csv("Datasets/PastMHD_2018.csv", function(data)
    {
      d3.select("#pastMD_2018")
            .on("click", function(){
              document.getElementById("pastYear").innerHTML = "Had it previously (2018)";
              update(data);
            });
    });

    // 2019 CSV
    d3.csv("Datasets/PastMHD_2019.csv", function(data)
    {
      d3.select("#pastMD_2019")
            .on("click", function(){
              document.getElementById("pastYear").innerHTML = "Had it previously (2019)";
              update(data);
            });
    });

    // For updating the current donut chart
    function update(data)
    {
      // Update arcs with new data
      arcs = arcs.data(pie(data));

      // Add transition for updating path (arcs)
      arcs.select("path")
          .transition()
          .duration(750)
          .attrTween("d", interpolateFix);

      // Add transition for updating text
      arcs.select("text")
          .transition()
          .duration(750)
          .text(function(d) {
            var total = d3.sum(data.map(function(d) { return d.Value; }));
            var percent = (d.data.Value / total)*100;
            return percent.toFixed(1) + "%";
            //return d.data.Past;
          })
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          });
    }

    // Function for Interpolating from the current angles arcs
    function interpolateFix(arcT)
    {
      var interp = d3.interpolate(this.angles, arcT);
        this.angles = interp(0);
        return function(t) {
        return arc(interp(t));
      };
    }

    var pie = d3.pie()
                .sort(null)
                .value(function(d) {
                   return parseFloat(d.Value);
                })

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                  .on("mousemove", function(d)
                  {
                    d3.select("#tooltip")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px")
                    .style("opacity", 1)
                    .html("<b>" + (d.data.Past) + ": </b>" + (d.data.Value))
                    })
                  .on("mouseout", function ()
                  {
                    // Hide the tooltip
                    d3.select("#tooltip")
                      .style("opacity", 0);
                  });


    //setting color
    var colorScale = d3.scaleOrdinal().range(['rgb(44,123,182)','rgb(244,109,67)','rgb(116,173,209)']);

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          return colorScale(d.data.Past);
        })
        .attr("d", function(d, i) {
          return arc(d, i);
        })
        .transition()
        .duration(750)
        .attrTween("d", interpolateFix);

    arcs.append("text")
        .text(function(d) {
          var total = d3.sum(data.map(function(d) { return d.Value; }));
          var percent = (d.data.Value / total)*100;
          return percent.toFixed(1) + "%";
          //return d.data.Past ;
        })
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle") //makes the text place at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-weight", "bold");

    var legend = svg.append('g')
                 .data(pie(data))
                 .attr('class', 'legend')
                 .attr('transform', 'translate(' + (padding + 40) + ',' + (padding * 10 + 10) + ')');


    //draw rectangle for each data
    legend.selectAll('rect')
          .data(pie(data))
          .enter()
          .append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr("x", function(d, i) { return 70 * (i - 0.3); })
          .attr('y', padding - 10)
          .attr('fill', function(d, i){
            return colorScale(i);
          });

    //text for each legend
    legend.selectAll("text")
          .data(pie(data))
          .enter()
          .append('text')
          .text(function(d){
            return d.data.Past;
          })
          .attr("x", function(d, i) { return 70 * (i - 0.1); })
          .attr('y', padding - 10)
          .attr("text-anchor", "start")
          .attr("font-size", "15px")
          .attr("alignment-baseline", "hanging");
  });
}

// ===== "HAVE YOU EVER BEEN DIAGNOSED WITH A MENTAL HEALTH DISORDER?" (STACKED VERTICAL BAR) =====
function Diagnosed_StackedBar(){
  d3.csv("Datasets/diagnosed_2016-2019.csv", function(data)
  {
    var w = 350;
    var h = 400;
    var padding = 10;
    var fname = ["Yes", "No"];

    //  var keys = Object.keys(data[0]).slice(1);

    var stack = d3.stack()
                   .keys(["Yes", "No"])
                   .order(d3.stackOrderDescending);

    var series = stack(data);

    var svg = d3.select("#diagnosed_stack")
                .append("svg")
                .attr("width", w+40)
                .attr("height", h+45);

    //console.log(stack(series));

    var color = d3.scaleOrdinal().range(["#2C7BB6", "#F46D43"])

    //add a group for each row of data
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .attr("fill", function(d, i){
                         return color(i);
                      });


    var xScale = d3.scaleBand()
                   //.domain(d3.range(data.length))
                   .domain(data.map(function (d) { return d.Year }))
                   .rangeRound([0, w])
                   .paddingInner(0.05);

    var yScale =  d3.scaleLinear()
                    .domain([0, d3.max(data, function(d) {
                       return parseFloat(d.Yes) + parseFloat(d.No);
                     })])
                   .range([h, 0]);

    // x-axis for Mental Illeness types
    var xAxis = d3.axisBottom()
                  .scale(xScale);

    // y-axis for value
    var yAxis = d3.axisLeft()
                  .scale(yScale)
                  .ticks(9);

    // appends x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(" + 40 + "," + 425 + ")")
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "15px");

    // appends y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + 40 + ", 25)")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "13px");

    //add a rectangle for each data value
    var rects = groups.selectAll("rect")
                      .data(function(d) {return d;})
                      .enter()
                      .append("rect")
                      .attr("x", function(d, i) {
                        return xScale(d.data.Year)+padding+30;
                       })
                      .attr("y", function(d, i) {
                        return yScale(d[1])+25;
                      })
                      .attr("height", function(d) {
                        return yScale(d[0]) - yScale(d[1]);
                      })
                      .attr("width", xScale.bandwidth())
                      .on("mousemove", function(d){
                          var subgroupType = d3.select(this.parentNode).datum().key;
                          var subgroupCount = d.data[subgroupType];
                          var subgroupYear = d.data.Year;
                          d3.select("#tooltip")
                            .style("left", d3.event.pageX + "px")
                            .style("top", d3.event.pageY + "px")
                            .html("<b>" + subgroupType + ": </b>" + subgroupCount)
                            .style("opacity", 1)
                           })
                        .on("mouseout", function () {
                             // Hide the tooltip
                             d3.select("#tooltip")
                             .style("opacity", 0);;
                        });

    var legend = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + (padding + 10) + ', 0)');

    //draw rectangle for each data
    legend.selectAll('rect')
          .data(fname)
          .enter()
          .append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr("x", function(d, i) { return 90 * (i+1.4); })
          .attr('y', padding - 10)
          .attr('fill', function(d, i){
            return color(i);
          });

    //text for each legend
    legend.selectAll("text")
          .data(fname)
          .enter()
          .append('text')
          .text(function(d){
            return d;
          })
          .attr("x", function(d, i) { return 90 * (i+1.6); })
          .attr('y', padding - 10)
          .attr("text-anchor", "start")
          .attr("font-size", "16px")
          .attr("alignment-baseline", "hanging");
  })
}

// ===== WORKERS FORMALLY DISCUSS MENTAL HEALTH IN WORKPLACE (PIE) =====
function campaign_pie()
{
  // Loads 2016 by default
  d3.csv("Datasets/Campaign_2016.csv", function(data)
  {
    var w = 300;
    var h = 420;
    var padding = 30;

    var svg = d3.select("#campaign_pie")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


    // outer radius will be specified according to the size of the SVG (i.e., using w).
    var outerRadius = w/2;
    //inner radius are set to 0 to demonstrate the pie chart
    var innerRadius = 0;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // 2016 CSV
    d3.csv("Datasets/Campaign_2016.csv", function(data)
    {
      d3.select("#campaign_2016")
            .on("click", function(){
              update(data);
            });
    });

    // 2017 CSV
    d3.csv("Datasets/Campaign_2017.csv", function(data)
    {
      d3.select("#campaign_2017")
            .on("click", function(){
              update(data);
            });
    });

    // 2018 CSV
    d3.csv("Datasets/Campaign_2018.csv", function(data)
    {
      d3.select("#campaign_2018")
            .on("click", function(){
              update(data);
            });
    });

    // 2019 CSV
    d3.csv("Datasets/Campaign_2019.csv", function(data)
    {
      d3.select("#campaign_2019")
            .on("click", function(){
              update(data);
            });
    });

    // For updating the current donut chart
    function update(data)
    {
      // Update arcs with new data
      arcs = arcs.data(pie(data));

      // Add transition for updating path (arcs)
      arcs.select("path")
          .transition()
          .duration(750)
          .attrTween("d", interpolateFix);

      // Add transition for updating text
      arcs.select("text")
          .transition()
          .duration(750)
          .text(function(d) {
            var total = d3.sum(data.map(function(d) { return d.Value; }));
            var percent = (d.data.Value / total)*100;
            return percent.toFixed(1) + "%";
          })
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          });
    }

    // Function for Interpolating from the current angles arcs
    function interpolateFix(arcT)
    {
      var interp = d3.interpolate(this.angles, arcT);
        this.angles = interp(0);
        return function(t) {
        return arc(interp(t));
      };
    }

    var pie = d3.pie()
                .sort(null)
                .value(function(d) {
                   return parseFloat(d.Value);
                })

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                  .on("mousemove", function(d){
                    d3.select("#tooltip")
                      .style("left", d3.event.pageX + "px")
                      .style("top", d3.event.pageY + "px")
                      .style("opacity", 1)
                      .html("<b>" + (d.data.Campaign) + ": </b>" + (d.data.Value))
                     })
                   .on("mouseout", function () {
                       // Hide the tooltip
                       d3.select("#tooltip")
                       .style("opacity", 0);;
                    });


    //setting color
    var colorScale = d3.scaleOrdinal().range(['rgb(44,123,182)','rgb(244,109,67)','rgb(223,194,125)']);

     arcs.append("path")
         .attr("d", arc)
         .attr("fill", function(d) {
           return colorScale(d.data.Campaign);
         })
         .attr("d", function(d, i) {
           return arc(d, i);
           })
         .transition()
         .duration(750)
         .attrTween("d", interpolateFix);


     arcs.append("text")
         .text(function(d) {
           var total = d3.sum(data.map(function(d) { return d.Value; }));
           var percent = (d.data.Value / total)*100;
           return percent.toFixed(1) + "%";
         })
         .attr("transform", function(d) {
           return "translate(" + arc.centroid(d) + ")";
         })
         .attr("text-anchor", "middle") //makes the text place at middle
         .attr("font-family", "sans-serif")
         .attr("font-size", "13px")
         .attr("font-weight", "bold");


 var legend = svg.append('g')
                 .data(pie(data))
                 .attr('class', 'legend')
                 .attr('transform', 'translate(' + (padding + 40) + ',' + (padding * 10 + 10) + ')');


       //draw rectangle for each data
       legend.selectAll('rect')
             .data(pie(data))
             .enter()
             .append('rect')
             .attr('width', 12)
             .attr('height', 12)
             .attr("x", padding - 25)
             .attr('y', function(d, i) { return 20 * (i + 1); })
             .attr('fill', function(d, i){
               return colorScale(i);
             });

       //text for each legend
       legend.selectAll("text")
             .data(pie(data))
             .enter()
             .append('text')
             .text(function(d){
               return d.data.Campaign;
             })
             .attr("x", padding - 10)
             .attr('y', function(d, i) { return 20 * (i + 1); })
             .attr("text-anchor", "start")
             .attr("font-size", "16px")
             .attr("alignment-baseline", "hanging");
    });
}

// ===== MENTAL HEALTH BENEFITS COVERAGE IN WORKPLACE (PIE) =====
function coverage_pie()
{
  // Loads 2016 by default
  d3.csv("Datasets/Coverage_2016.csv", function(data)
  {
    var w = 300;
    var h = 420;
    var padding = 30;

    var svg = d3.select("#coverage_pie")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


    // outer radius will be specified according to the size of the SVG (i.e., using w).
    var outerRadius = w/2;
    //inner radius are set to 0 to demonstrate the pie chart
    var innerRadius = 0;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // 2016 CSV
    d3.csv("Datasets/Coverage_2016.csv", function(data)
    {
      d3.select("#coverage_2016")
            .on("click", function(){
              update(data);
            });
    });

    // 2017 CSV
    d3.csv("Datasets/Coverage_2017.csv", function(data)
    {
      d3.select("#coverage_2017")
            .on("click", function(){
              update(data);
            });
    });

    // 2018 CSV
    d3.csv("Datasets/Coverage_2018.csv", function(data)
    {
      d3.select("#coverage_2018")
            .on("click", function(){
              update(data);
            });
    });

    // 2019 CSV
    d3.csv("Datasets/Coverage_2019.csv", function(data)
    {
      d3.select("#coverage_2019")
            .on("click", function(){
              update(data);
            });
    });

    // For updating the current donut chart
    function update(data)
    {
      // Update arcs with new data
      arcs = arcs.data(pie(data));

      // Add transition for updating path (arcs)
      arcs.select("path")
          .transition()
          .duration(750)
          .attrTween("d", interpolateFix);

      // Add transition for updating text
      arcs.select("text")
          .transition()
          .duration(750)
          .text(function(d) {
            var total = d3.sum(data.map(function(d) { return d.Value; }));
            var percent = (d.data.Value / total)*100;
            return percent.toFixed(1) + "%";
          })
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          });
    }

    // Function for Interpolating from the current angles arcs
    function interpolateFix(arcT)
    {
      var interp = d3.interpolate(this.angles, arcT);
        this.angles = interp(0);
        return function(t) {
        return arc(interp(t));
      };
    }

    var pie = d3.pie()
                .sort(null)
                .value(function(d) {
                   return parseFloat(d.Value);
                })

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                  .on("mousemove", function(d){
                    d3.select("#tooltip")
                      .style("left", d3.event.pageX + "px")
                      .style("top", d3.event.pageY + "px")
                      .style("opacity", 1)
                      .html("<b>" + (d.data.Coverage) + ": </b>" + (d.data.Value))
                     })
                   .on("mouseout", function () {
                       // Hide the tooltip
                       d3.select("#tooltip")
                       .style("opacity", 0);;
                    });


    //setting color
    var colorScale = d3.scaleOrdinal().range(['rgb(44,123,182)','rgb(244,109,67)','rgb(223,194,125)','rgb(217,217,217)']);

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          return colorScale(d.data.Coverage);
        })
        .attr("d", function(d, i) {
          return arc(d, i);
          })
        .transition()
        .duration(750)
        .attrTween("d", interpolateFix);


    arcs.append("text")
        .text(function(d) {
          var total = d3.sum(data.map(function(d) { return d.Value; }));
          var percent = (d.data.Value / total)*100;
          return percent.toFixed(1) + "%";
        })
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle") //makes the text place at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px")
        .attr("font-weight", "bold");

      var legend = svg.append('g')
                      .data(pie(data))
                      .attr('class', 'legend')
                      .attr('transform', 'translate(' + (padding + 40) + ',' + (padding * 10 + 10) + ')');


      //draw rectangle for each data
      legend.selectAll('rect')
            .data(pie(data))
            .enter()
            .append('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr("x", padding - 25)
            .attr('y', function(d, i) { return 20 * (i + 1); })
            .attr('fill', function(d, i){
              return colorScale(i);
            });

      //text for each legend
      legend.selectAll("text")
            .data(pie(data))
            .enter()
            .append('text')
            .text(function(d){
              return d.data.Coverage;
            })
            .attr("x", padding - 10)
            .attr('y', function(d, i) { return 20 * (i + 1); })
            .attr("text-anchor", "start")
            .attr("font-size", "16px")
            .attr("alignment-baseline", "hanging");
    });
}

// ===== TYPES OF MENTAL DISORDER (STACKED VERTICAL BAR) =====
function Mental_StackedBar(){
  d3.csv("Datasets/Mental.csv", function(data)
  {
    var w = 900;
    var h = 800;
    var padding = 10;
    var chartpadding = 30;
    var fname = ["2016", "2017", "2018", "2019"];

    var stack = d3.stack()
                   .keys(["Year2016", "Year2017", "Year2018", "Year2019"])
                   .order(d3.stackOrderDescending);

    var series = stack(data);

    var svg = d3.select("#mental_stack")
                .append("svg")
                .attr("width", w+40)
                .attr("height", h+250);

    //console.log(stack(series));

    var color = d3.scaleOrdinal().range(["#255F63", "#ECB865", "#DB7B65", "#FBC9BE"])

    //add a group for each row of data
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .attr("fill", function(d, i){
                         return color(i);
                      });

    var xScale = d3.scaleBand()
                    .domain(data.map(function (d) { return d.MentalIllness }))
                    .rangeRound([0, w])
                    .paddingInner(0.05);

    var yScale =  d3.scaleLinear()
                    .domain([0, d3.max(data, function(d) {
                      return parseFloat(d.Year2016) + parseFloat(d.Year2017) + parseFloat(d.Year2018) + parseFloat(d.Year2019);
                    })])
                    .range([h, 0]);

    // x-axis for Mental Illeness types
    var xAxis = d3.axisBottom()
                  .scale(xScale);

    // y-axis for value
    var yAxis = d3.axisLeft()
                  .scale(yScale)
                  .ticks(9);

    // appends x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(" + 30 + "," + (h+chartpadding) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "14px")
        .style("text-anchor", "end")
        .attr("x", -5)
        .attr("y", 5)
        .attr("transform", "rotate(-50)");

    // appends y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + 30 + "," + chartpadding + ")")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "13px");

    //add a rectangle for each data value
    var rects = groups.selectAll("rect")
                      .data(function(d) {return d;})
                      .enter()
                      .append("rect")
                      .attr("x", function(d, i) {
                        return xScale(d.data.MentalIllness)+padding+18;
                      })
                      .attr("y", function(d, i) {
                        return yScale(d[1])+chartpadding;
                      })
                      .attr("height", function(d) {
                        return yScale(d[0]) - yScale(d[1]);
                      })
                      .attr("width", xScale.bandwidth())
                      // Mousover tooltips
                      .on("mousemove", function(d){
                          var subgroupType = d3.select(this.parentNode).datum().key;
                          var subgroupCount = d.data[subgroupType];
                          var subgroupIllness = d.data.MentalIllness;
                          d3.select("#tooltip")
                            .style("left", d3.event.pageX + "px")
                            .style("top", d3.event.pageY + "px")
                            .html("<b>" + subgroupIllness + "</b><br>" + subgroupType.substr(4) + "<br>" + "Value: " + subgroupCount)
                            .style("opacity", 1)
                           })
                        .on("mouseout", function () {
                             // Hide the tooltip
                             d3.select("#tooltip")
                             .style("opacity", 0);;
                        });

    var legend = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + (padding + 200) + ', 0)');

    //draw rectangle for each data
    legend.selectAll('rect')
          .data(fname)
          .enter()
          .append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr("x", function(d, i) { return 90 * (i+0.85); })
          .attr('y', padding - 10)
          .attr('fill', function(d, i) { return color(i); });

    //text for each legend
    legend.selectAll("text")
          .data(fname)
          .enter()
          .append('text')
          .text(function(d) { return d; })
          .attr("x", function(d, i) { return 90 * (i+1); })
          .attr('y', padding - 10)
          .attr("text-anchor", "start")
          .attr("font-size", "16px")
          .attr("alignment-baseline", "hanging");
  })
}

// ===== FEMALES' WILLIGNESS to discuss about Health Issues with direct supervisors (DONUT) =====
function female_donut()
{
  // Loads 2016 by default
  d3.csv("Datasets/female_willingness_2016.csv", function(data)
  {
    document.getElementById("female").innerHTML = "Female (2016)"; //set to 2016 by default
    var w = 400;
    var h = 450;
    var padding = 410;

    var svg = d3.select("#female_donut")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var total;
    
    // outer radius will be specified according to the size of the SVG (i.e., using w).
    var outerRadius = (w/2);
    //inner radius are set to 50 to demonstrate the donut pie chart
    var innerRadius = (w/4);

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // 2016 CSV
    d3.csv("Datasets/female_willingness_2016.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2016")
            .on("click", function(){
              document.getElementById("female").innerHTML = "Female (2016)";
              update(data);
            });
    });

    // 2017 CSV
    d3.csv("Datasets/female_willingness_2017.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2017")
            .on("click", function(){
              document.getElementById("female").innerHTML = "Female (2017)";
              update(data);
            });
    });
    
    // 2018 CSV
    d3.csv("Datasets/female_willingness_2018.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2018")
            .on("click", function(){
              document.getElementById("female").innerHTML = "Female (2018)";
              update(data);
            });
    });
    
    // 2019 CSV
    d3.csv("Datasets/female_willingness_2019.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2019")
            .on("click", function(){
              document.getElementById("female").innerHTML = "Female (2019)";
              update(data);
            });
    });

    // For updating the current donut chart
    function update(data)
    {
      // Update arcs with new data
      arcs = arcs.data(pie(data));

      // Add transition for updating path (arcs)
      arcs.select("path")
          .transition()
          .duration(750)
          .attrTween("d", interpolateFix);
      
      //TEXT (PERCENTAGE%)
      // Add transition for updating text
      arcs.select("text")
          .transition()
          .duration(750)
          .text(function(d) {
            var total = d3.sum(data.map(function(d) { return d.count; }));
            var percent = (d.data.count / total)*100;
            return percent.toFixed(1) + "%";
          })
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          });

      // Updates center text
      arcs.selectAll("text")
          .filter(function() { return d3.select(this).text() == total })
          .attr("text-anchor", "middle")
          .attr("font-size", "40px")
          .attr('y', 15)
	        .text(function() {
            total = d3.sum(data.map(function(d) { return d.count; }));
            return total;
          });
    }

    // Function for Interpolating from the current angles arcs
    function interpolateFix(arcT)
    {
      var interp = d3.interpolate(this.angles, arcT);
      this.angles = interp(0);
      return function(t) {
        return arc(interp(t));
      };
    }

    var pie = d3.pie()
                .sort(null)
                .value(function(d) {return d.count;});

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                  // Mouseover tooltips
                  .on("mousemove", function(d)
                  {
                    d3.select("#tooltip")
                      .style("left", d3.event.pageX + "px")
                      .style("top", d3.event.pageY + "px")
                      .style("opacity", 1)
                      .html("<b>" + (d.data.willingness) + ": </b>" + (d.data.count));
                  })
                  .on("mouseout", function ()
                  {
                    // Hide the tooltip
                    d3.select("#tooltip")
                      .style("opacity", 0);
                  });

    //var color = d3.scaleOrdinal(d3.schemeCategory10);
    var color = d3.scaleOrdinal()
                  .range(['rgb(44,123,182)','rgb(244,109,67)','rgb(116,173,209)','rgb(171,217,233)']);

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          return color(d.data.willingness);
        })
        .attr("d", function(d, i) {
          return arc(d, i);
        })
        .transition()
        .duration(750)
        .attrTween("d", interpolateFix);

    //TEXT (PERCENTAGE%)
    arcs.append("text")
        .text(function(d) {
          var total = d3.sum(data.map(function(d) { return d.count; }));
          var percent = (d.data.count / total)*100;
          return percent.toFixed(1) + "%";
        })
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle") //makes the text place at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-weight", "bold");

    // Add center text
    arcs.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", "20px")
          .attr('y', -30)
	        .text("Total");

    arcs.append("text")
          .filter(function() { return d3.select(this).text() == 0 })
          .attr("text-anchor", "middle")
          .attr("font-size", "40px")
          .attr('y', 15)
	        .text(function() {
            total = d3.sum(data.map(function(d) { return d.count; }));
            return total;
          });

    var legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', 'translate(' + (10 + 200) + ', 0)');

    //draw rectangle for each data
    legend.selectAll('rect')
          .data(pie(data))
          .enter()
          .append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr("x", function(d, i) { return 80 * (i-2); })
          .attr('y', padding + 10)
          .attr('fill', function(d, i){
            return color(i);
          });

    //text for each legend
    legend.selectAll("text")
          .data(pie(data))
          .enter()
          .append('text')
          .text(function(d) { return d.data.willingness; })
          .attr("x", function(d, i) { return 80 * (i-1.8); })
          .attr('y', padding + 10)
          .attr("text-anchor", "start")
          .attr("font-size", "16px")
          .attr("alignment-baseline", "hanging");
    });
}

// ===== MALES' WILLIGNESS to discuss about Health Issues with direct supervisors  (DONUT) =====
function male_donut()
{
  // Loads 2016 by default
  d3.csv("Datasets/male_willingness_2016.csv", function(data)
  {
    document.getElementById("male").innerHTML = "Male (2016)";
    var w = 400;
    var h = 450;
    var padding = 410;

    var svg = d3.select("#male_donut")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var total;

    // outer radius will be specified according to the size of the SVG (i.e., using w).
    var outerRadius = w/2;
    //inner radius are set to 50 to demonstrate the donut pie chart
    var innerRadius = w/4;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // 2016 CSV
    d3.csv("Datasets/male_willingness_2016.csv", function(data)
    {
      d3.select("#BTNmale_willingness_2016")
        .on("click", function(){
          document.getElementById("male").innerHTML = "Male (2016)";
          update(data);
        });
    });
    
    // 2017 CSV
    d3.csv("Datasets/male_willingness_2017.csv", function(data)
    {
      d3.select("#BTNmale_willingness_2017")
        .on("click", function(){
          document.getElementById("male").innerHTML = "Male (2017)";
          update(data);
        });
    });
    
    // 2018 CSV
    d3.csv("Datasets/male_willingness_2018.csv", function(data)
    {
      d3.select("#BTNmale_willingness_2018")
        .on("click", function(){
          document.getElementById("male").innerHTML = "Male (2018)";
          update(data);
        });
    });
    
    // 2019 CSV
    d3.csv("Datasets/male_willingness_2019.csv", function(data)
    {
      d3.select("#BTNmale_willingness_2019")
        .on("click", function(){
          document.getElementById("male").innerHTML = "Male (2019)";
          update(data);
        });
    });

    // For updating the current donut chart
    function update(data)
    {
      // Update arcs with new data
      arcs.data(pie(data));
    
      // Add transition for updating path (arcs)
      arcs.select("path")
          .transition()
          .duration(750)
          .attrTween("d", interpolateFix);

      //TEXT (PERCENTAGE%)
      // Add transition for updating text
      arcs.select("text")
          .transition()
          .duration(750)
          .text(function(d) {
            var total = d3.sum(data.map(function(d) { return d.count; }));
            var percent = (d.data.count / total)*100;
            return percent.toFixed(1) + "%";
          })
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          });

      // Updates center text
      arcs.selectAll("text")
          .filter(function() { return d3.select(this).text() == total })
          .attr("text-anchor", "middle")
          .attr("font-size", "40px")
          .attr('y', 15)
	        .text(function() {
            total = d3.sum(data.map(function(d) { return d.count; }));
            return total;
          });
    }

    // Function for Interpolating from the current angles arcs
    function interpolateFix(arcT)
    {
      var interp = d3.interpolate(this.angles, arcT);
      this.angles = interp(0);
      return function(t) {
        return arc(interp(t));
      };
    }

    var pie = d3.pie()
                 .sort(null)
                 .value(function(d) {return d.count;});

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                  .on("mousemove", function(d)
                  {
                    d3.select("#tooltip")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px")
                    .style("opacity", 1)
                    .html("<b>" + (d.data.willingness) + ": </b>" + (d.data.count))
                  })
                  .on("mouseout", function ()
                  {
                    // Hide the tooltip
                    d3.select("#tooltip")
                      .style("opacity", 0);
                  });

    //var color = d3.scaleOrdinal(d3.schemeCategory10);
    var color = d3.scaleOrdinal()
                  .range(['rgb(44,123,182)','rgb(244,109,67)','rgb(116,173,209)','rgb(171,217,233)']);

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          return color(d.data.willingness);
        })
        .attr("d", function(d, i) {
          return arc(d, i);
        })
        .transition()
        .duration(750)
        .attrTween("d", interpolateFix);

    //TEXT (PERCENTAGE%)
    arcs.append("text")
        .text(function(d) {
          var total = d3.sum(data.map(function(d) { return d.count; }));
          var percent = (d.data.count / total)*100;
          return percent.toFixed(1) + "%";
        })
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle") //makes the text place at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("font-weight", "bold");

    // Add center text
    arcs.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", "20px")
          .attr('y', -30)
	        .text("Total");
          
    arcs.append("text")
          .filter(function() { return d3.select(this).text() == 0 })
          .attr("text-anchor", "middle")
          .attr("font-size", "40px")
          .attr('y', 15)
	        .text(function() {
            total = d3.sum(data.map(function(d) { return d.count; }));
            return total;
          });

    var legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', 'translate(' + (10 + 200) + ', 0)');

    //draw rectangle for each data
    legend.selectAll('rect')
          .data(pie(data))
          .enter()
          .append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr("x", function(d, i) { return 80 * (i-2); })
          .attr('y', padding + 10)
          .attr('fill', function(d, i){
            return color(i);
          });

    //text for each legend
    legend.selectAll("text")
          .data(pie(data))
          .enter()
          .append('text')
          .text(function(d) { return d.data.willingness; })
          .attr("x", function(d, i) { return 80 * (i-1.8); })
          .attr('y', padding + 10)
          .attr("text-anchor", "start")
          .attr("font-size", "16px")
          .attr("alignment-baseline", "hanging");
  });
}

// ===== PEOPLE IN WORLD (HORIZONTAL BAR) =====
function world_bar()
{
  d3.csv("Datasets/world_bar.csv", function(data)
  {
    d3.select("#world_sort")
        .on("click", function(){
          sortBars();
    });

    var w = 1600;  //width
    var h = 1100;  //height
    var padding = 155;  //padding

    // Store data in dataset
    var dataset = [];
    dataset = data;

    // xScale (Count value)
    var xScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset, function (d){ return parseFloat(d.Count); })])
                   .range([0, w]);

    // yScale (Country)
    var yScale = d3.scaleBand()
                  .domain(dataset.map(function (d) { return d.Country; }))
                  .range([0, h])
                  .padding(0.2);

    // Create the SVG
    var svg = d3.select("#world_bar")
                .append("svg")
                .attr("width", w+175)
                .attr("height", h+20);

    // x-axis for Value
    var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(16);

    // y-axis for Countries
    var yAxis = d3.axisLeft()
                  .scale(yScale);

    // Draws bars in the chart
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", padding+1 + xScale(0))
        .attr("width", function(d) { return xScale(d.Count); })
        .attr("y", function(d) { return yScale(d.Country); })
        .attr("height", yScale.bandwidth())
        .attr("fill", "#2C7BB6")
        // Mousover tooltips
        .on("mousemove", function(d){
          // Change bar color
          d3.select(this)
            .transition()
            .duration(100)
            .attr("fill", "#08306B");
          
          // Tooltips
          var country = d.Country;
          var count = d.Count;
          d3.select("#tooltip")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .html("<b>" + country + ": </b>" + count)
            .style("opacity", 1)
           })
        .on("mouseout", function () {
            // Change back color
            d3.select(this)
              .transition()
              .duration(100)
              .attr("fill", "#2C7BB6");
            // Hide the tooltip
            d3.select("#tooltip")
              .style("opacity", 0);
        });

    var bar = svg.selectAll("g.bar")
              .data(dataset)
              .enter()
              .append("g")
              .attr("class", "bar")
              .attr("transform", function(d) { return "translate(0," + yScale(d.Country) + ")"; })
              // Mousover tooltips
              .on("mousemove", function(d){
                var country = d.Country;
                var count = d.Count;
                d3.select("#tooltip")
                  .style("left", d3.event.pageX + "px")
                  .style("top", d3.event.pageY + "px")
                  .html("<b>" + country + ": </b>" + count)
                  .style("opacity", 1)
                 })
              .on("mouseout", function () {
                   // Hide the tooltip
                   d3.select("#tooltip")
                   .style("opacity", 0);
              });

    //IN-LINE TEXT
    bar.append("text")
        .attr("x", function(d) { return xScale(d.Count)+padding; })
        .attr("y", yScale.bandwidth()/2 )
        .attr("dx", -1)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) { return d.Count; })
        .style("fill", "#FFFFFF")
        .attr("font-size", "11px");

    // appends x-axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(" + padding + "," + h + ")")
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "13px");

    // appends y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "13px");

    var sortOrder = true;
    // perform sorting on the bars (asc & desc)
    var sortBars = function(){
        sortOrder = !sortOrder;

        svg.selectAll("rect")
            .data(data.sort(function(a, b)
            { 
              if (sortOrder)
                return a.Count - b.Count;
              else
                return b.Count - a.Count;
            }))
            .transition()
            .duration(750)
            .attr("width", function(d, i) { return xScale(d.Count); });

    // Updates XScale and YScale domain
    xScale.domain([0, d3.max(dataset, function (d) { return parseFloat(d.Count); })]);
    yScale.domain(dataset.map(function (d) { return d.Country; }));

    svg.select(".y-axis")
        .transition()
        .duration(750)
        .call(yAxis);

    //IN-LINE TEXT
    bar = svg.selectAll("g.bar")
              .data(dataset)
    
    bar.select("text")
        .attr("x", function(d) { return xScale(d.Count)+padding; })
        .attr("y", yScale.bandwidth()/2)
        .attr("dx", -1)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) { return d.Count; })
    };
  })
}

// ===== PEOPLE IN USA STATES (CHOROPLETH MAP) =====
function usa_map()
{
  // Load data from CSV
  d3.csv("Datasets/usstates.csv", function(data)
  {
    var dataset = data;

    var w = 850;
    var h = 500;
    var padding = 10;
    
    // Gives the map colours (this range is Purple)
    var color = d3.scaleQuantize()
                          .range(['rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,81,156)','rgb(8,48,107)']);
    
    var projection = d3.geoMercator()
                       .center([-96, 38.5])
                       .translate([w/2, h/2])
                       .scale(800);
    
    var path = d3.geoPath()
                 .projection(projection);
    
    var svg = d3.select("#usa_map")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey");
  
    // Sets the color domain for data
    color.domain([
      d3.min(dataset, function(d) {return parseFloat(d.value);}),
      100 //best option for evening out map colors (effective 2016)
      //d3.max(dataset, function(d) {return parseFloat(d.value);})
    ]);
    
    d3.json("JSON/gz_2010_us_040_00_5m.json", function(json)
    {
      // Loop each data to merge them to GeoJSON
      for (var i=0; i<dataset.length; i++)
      {
        var dataStates = dataset[i].states;  //State name
        var dataMental = parseFloat(data[i].value);  //Number of people values
      
        // Loop to find matching State name
        for (var j=0; j<json.features.length; j++)
        {
          var jsonState = json.features[j].properties.NAME;
          // If the state name matches
          //Merge data into GeoJSON
          if (dataStates == jsonState){
            json.features[j].properties.mental = dataMental;
            break;
          }
        }
      }
    
      svg.selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
         .attr("stroke", "#1A1A21")
         .attr("stroke-width", 1)
         .attr("fill", function(d){
            // If value is present
            if (d.properties.mental){
              return color(d.properties.mental);  // sets color
            }
            else{
              return "#CCCCCC";  // sets gray
            }
          })
          .on("mousemove", function(d)
          {
            d3.select("#tooltip")
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + "px")
              .style("opacity", 1)
              .html("<b>" + (d.properties.NAME) + ": </b>" + d.properties.mental);
          })
          .on("mouseout", function ()
          {
            // Hide the tooltip
            d3.select("#tooltip")
              .style("opacity", 0);
          });
      });
  });
}

function init(){
  current_pie();
  past_pie();
  Diagnosed_StackedBar();
  campaign_pie();
  coverage_pie();
  Mental_StackedBar();
  female_donut();
  male_donut();
  world_bar();
  usa_map();
}

window.onload = init