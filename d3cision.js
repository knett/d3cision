function d3cision() {
  
  // defaults (have function)
  var orientation = "top-to-bottom";
  var shapelink = 0.75;
  var separation = 0.00;
  
  var margin = { top: 25, right: 25, bottom: 25, left: 25 };
  
  function chart(selection) {
    
    selection.each(function(data, i) {
      
      var width = this.offsetWidth - margin.left - margin.right;
      var height = this.offsetHeight - margin.top - margin.bottom;

      console.log("data", data);

      window.data = data;

      var svg = d3.select(this).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom),
        g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      // declares a tree layout and assigns the size
      var treemap = d3.tree()
        .size([width, height]);
      
      //  assigns the data to a hierarchy using parent-child relationships
      var nodes = d3.hierarchy(data);
      
      // maps the node data to the tree layout
      nodes = treemap(nodes);
      
      // adds the links between the nodes
      var link = g.selectAll(".link")
          .data(nodes.descendants().slice(1))
        .enter().append("path")
          .attr("class", "link")
          .attr("d", function(d) {
             curve =  "M" + d.x + "," + (d.y - (d.y * separation))
               + " " + d.x  + "," + (d.y + (d.parent.y - d.y) * shapelink)
               + " " + d.parent.x + "," + d.parent.y;
             return curve;
             });
      
      // adds each node as a group
      var node = g.selectAll(".node")
          .data(nodes.descendants())
        .enter().append("g")
          .attr("class", function(d) {
            return "node" +
              (d.children ? " node--internal" : " node--leaf"); })
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; });
      
      // adds the circle to the node
      // node.append("circle").attr("r", 10);
      
      // adds the text to the node
      node.append("text")
        .attr("dy", ".35em")
        .attr("y", function(d) { return d.children ? -20 : 20; })
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.rule; });

    });
    
  }
  
  chart.separation = function(_) {
    if (!arguments.length) return separation;
    separation = _;
    return chart;    
  };
  
  chart.shapelink = function(_) {
    if (!arguments.length) return shapelink;
    shapelink = _;
    return chart;    
  };
  
  return chart;
  
}