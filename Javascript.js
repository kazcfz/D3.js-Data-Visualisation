function female_donut()
{
    //var femaledonut = document.getElementById("female_donut");
    //document.getElementById("female_donut").innerHTML = 99999;
    //var femaledonut = d3.select("#female_donut");
    // ===== FEMALES' WILLIGNESS (DONUT) =====
    d3.csv("Datasets/Book1.csv", function(data) {

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
                 });
             
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

function usa_map()
{
    // ===== PEOPLE IN USA STATES (MAP) =====
        // Load data from CSV
        d3.csv("Datasets/usstates.csv", function(data){
        
            var w = 700;
            var h = 500;
            
            // Gives the map colours (this range is Purple)
            var color = d3.scaleQuantize()
                                  .range(['rgb(239,243,255)','rgb(189,215,231)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)']);
            
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
                          d3.min(dataset, function(d) {return d.value;}),
                          d3.max(dataset, function(d) {return d.value;})
                      ]);
            
            d3.json("JSON/gz_2010_us_040_00_5m.json", function(json) {
              // Loop each data to merge them to GeoJSON
              for (var i=0; i<dataset.length; i++){
                  var dataStates = dataset[i].states;  //State name
                  var dataMental = parseFloat(data[i].value);  //Number of people values
              
                  // Loop to find matching State name
                  for (var j=0; j<json.features.length; j++){
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
    usa_map();
}

window.onload = init