
// ===== FEMALES' WILLIGNESS to discuss about Health Issues with direct supervisors (DONUT) =====
function female_donut()
{
  // Loads 2016 by default
  d3.csv("Datasets/female_willingness_2016.csv", function(data)
  {
    var w = 300;
    var h = 300;

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

    var color = d3.scaleOrdinal(d3.schemeCategory10);

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
        .attr("font-size", "14px")
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
    var w = 300;
    var h = 300;

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

    var color = d3.scaleOrdinal(d3.schemeCategory10);

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
        .attr("font-size", "14px")
        .attr("font-weight", "bold");
  });
}


// ===== PEOPLE IN USA STATES (MAP) =====
function usa_map()
{
  // Load data from CSV
  d3.csv("Datasets/usstates.csv", function(data)
  {
    var w = 700;
    var h = 500;
    
    // Gives the map colours (this range is Purple)
    var color = d3.scaleQuantize()
                          .range(['rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,81,156)','rgb(8,48,107)']);
    
    var projection = d3.geoMercator()
                       .center([-92.5, 41])
                       .translate([w/2, h/2])
                       .scale(670);
    
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
    usa_map();
}

window.onload = init