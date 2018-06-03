var width = 1000,
  height = 800

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height); // Define area on screen to initialize the visualisation

var force = d3.layout.force().gravity(.01).distance(200).charge(-100).size([width, height]); // Network gravity between nodes

d3.json("/data", function (json) {

  // ------------ THE CODE BELOW IS THE DEFAULT LOGIC FOR NETWORK GRAPHS. DO NOT EDIT. ------------

  force.nodes(json.nodes).links(json.links).start(); // Initialize Network Graph

  var link = svg.selectAll(".link")
    .data(json.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function (d) {
      return Math.sqrt(d.weight); // DETERMINES THE WEIGHT OF THE LINK
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
    .attr("r", function (d) {
      return d.risk * 60 // SET THE SIZE OF THE NODE
    })
    .attr("fill", function (d) {
      if (d.risk > 0 && d.risk <= 0.333) return "#04844B"
      if (d.risk > 0.333 && d.risk <= 0.666) return "#febc11"
      if (d.risk > 0.666 && d.risk <= 1.00) return "#dc3545"
    })

  node.append("image")
    .attr("xlink:href", function (d) {
      return d.image
    })
    .attr("x", "-5px")
    .attr("y", "-60px")
    .attr("width", "100px")
    .attr("height", "30px");


  // node.append("text") 
  //   .attr("dx", 40)
  //   .attr("dy", ".35em")
  //   .text(function (d) {
  //     return d.name
  //   });

  node.append("text")
    .attr("dx", -10)
    .attr("dy", ".35em")
    .text(function (d) {
      return d.risk * 100 + "%";
    })


});