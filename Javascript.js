
// ===== FEMALES' WILLIGNESS to discuss about Health Issues with direct supervisors (DONUT) =====
function female_donut()
{
  // Loads 2016 by default
  d3.csv("Datasets/female_willingness_2016.csv", function(data)
  {
    var w = 400;
    var h = 400;

    var svg = d3.select("#female_donut")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    
    // outer radius will be specified according to the size of the SVG (i.e., using w).
    var outerRadius = w/2;
    //inner radius are set to 50 to demonstrate the donut pie chart
    var innerRadius = w/4;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    // 2016 CSV
    d3.csv("Datasets/female_willingness_2016.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2016")
            .on("click", function(){
              update(data);
            });
    });

    // 2017 CSV
    d3.csv("Datasets/female_willingness_2017.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2017")
            .on("click", function(){
              update(data);
            });
    });
    
    // 2018 CSV
    d3.csv("Datasets/female_willingness_2018.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2018")
            .on("click", function(){
              update(data);
            });
    });
    
    // 2019 CSV
    d3.csv("Datasets/female_willingness_2019.csv", function(data)
    {
      d3.select("#BTNfemale_willingness_2019")
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
            return d.data.willingness;
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
                 .value(function(d) {return d.count;});

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

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
        
    arcs.append("text")
        .text(function(d) {
          return d.data.willingness;
        })
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle") //makes the text place at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("font-weight", "bold");


        // TESTING ONLY!!!
        //d3.select("#BTNfemale_willingness_2017")
        //    .on("click", function(){
        //        //idk
        //        //wat();
        //        pie
        //             .sort(null)
        //             .value(function(d) {return d.test;});
////
        //             arcs
        //               .data(pie(data))
        //               .enter()
        //               .append("g")
        //               .attr("class", "arc")
        //               .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
////
        // 
////
        //     arcs.append("path")
        //         .attr("d", arc)
        //         .attr("fill", function(d) {
        //           return color(d.data.willingness);
        //         })
        //         .attr("d", function(d, i) {
        //           return arc(d, i);
        //         });
        //     
        // arcs.append("text")
        //     .text(function(d) {
        //       return d.data.willingness;
        //     })
        //     .attr("transform", function(d) {
        //       return "translate(" + arc.centroid(d) + ")";
        //     })
        //     .attr("text-anchor", "middle") //makes the text place at middle
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", "14px")
        //     .attr("font-weight", "bold");
        //})
        
    //});
    });
}

// ===== MALES' WILLIGNESS to discuss about Health Issues with direct supervisors  (DONUT) =====
function male_donut()
{
  // Loads 2016 by default
  d3.csv("Datasets/male_willingness_2016.csv", function(data)
  {
    var w = 400;
    var h = 400;

    var svg = d3.select("#male_donut")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

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
          update(data);
        });
    });
    
    // 2017 CSV
    d3.csv("Datasets/male_willingness_2017.csv", function(data)
    {
      d3.select("#BTNmale_willingness_2017")
        .on("click", function(){
          update(data);
        });
    });
    
    // 2018 CSV
    d3.csv("Datasets/male_willingness_2018.csv", function(data)
    {
      d3.select("#BTNmale_willingness_2018")
        .on("click", function(){
          update(data);
        });
    });
    
    // 2019 CSV
    d3.csv("Datasets/male_willingness_2019.csv", function(data)
    {
      d3.select("#BTNmale_willingness_2019")
        .on("click", function(){
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

      // Add transition for updating text
      arcs.select("text")
          .transition()
          .duration(750)
          .text(function(d) {
            return d.data.willingness;
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
                 .value(function(d) {return d.count;});

    var arcs = svg.selectAll("g.arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

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
        
    arcs.append("text")
        .text(function(d) {
          return d.data.willingness;
        })
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle") //makes the text place at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("font-weight", "bold");
  });
}

// ===== PEOPLE IN WORLD (HORIZONTAL BAR) =====
function world_bar()
{
  d3.csv("Datasets/world_bar.csv", function(data) {
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

    // appends x-axis
    svg.append("g")
        .attr("transform", "translate(" + padding + "," + h + ")")
        .call(xAxis)
        .selectAll("text")
          .style("font-size", "13px");

    // appends y-axis
    svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis)
        .selectAll("text")
          .style("font-size", "13px");

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
        .attr("fill", "teal");
        
    /* IN-LINE TEXT
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("x", function(d, i) {
          return h - xScale(d) + 14; //bring labels one pixel up for better spacing
        })
        .attr("y", function(d) {
          return yScale(i) + yScale.bandwidth()/2;  //calculate the x position by setting it to the left edge of each bar plus half the bar width
        })
        .attr("text-anchor", "middle") //place text at middle
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px")
        .attr("fill", "black");
        */
  })
}

// ===== PEOPLE IN USA STATES (MAP) =====
function usa_map()
{
  // Load data from CSV
  d3.csv("Datasets/usstates.csv", function(data)
  {
    var w = 850;
    var h = 500;
    
    // Gives the map colours (this range is Purple)
    var color = d3.scaleQuantize()
                          .range(['rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,81,156)','rgb(8,48,107)']);
    
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
    
    
    var dataset = data;
  
    // Sets the color domain for data
    color.domain([
      d3.min(dataset, function(d) {return parseFloat(d.value);}),
      78 //best option for evening out map colors
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
         .attr("fill", function(d){
            // If value is present
            if (d.properties.mental){
              return color(d.properties.mental);  // sets color
            }
            else{
              return "#ccc";  // sets gray
            }
          });
      });
  });
}

function init(){
    female_donut();
    male_donut();
    world_bar();
    usa_map();
}

window.onload = init