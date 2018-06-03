var width = 960, height = 500

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height); // Define area on screen to initialize the visualisation

var force = d3.layout.force().gravity(.01).distance(100).charge(-100).size([width, height]); // Network gravity between nodes

d3.json("/data", function (json) {
  
  // ------------ THE CODE BELOW IS THE DEFAULT LOGIC FOR NETWORK GRAPHS. DO NOT EDIT. ------------

  force.nodes(json.nodes).links(json.links).start(); // Initialize Network Graph

  var link = svg.selectAll(".link")
    .data(json.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function (d) {
      return Math.sqrt(d.weight);
    });

  var node = svg.selectAll(".node")
    .data(json.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

  force.on("tick", function () {
    link.attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    node.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  });

  // -------------------- THE CODE BELOW CAN BE EDITED --------------------

  node.append("circle") // Make a node a circle. Use D3 Documentation to find out what other stuff (shapes, text, etc) you can append.
    .attr("r", "5");

  node.append("text") // Add text to node. Use D3 Documentation to find out what other stuff (shapes, text, etc) you can append.
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function (d) {
      return d.name
    });


});