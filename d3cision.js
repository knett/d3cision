function d3cision() {
  
  // defaults (have function)
  var orientation = "top-to-bottom";
  
  var margin = { top: 50, right: 50, bottom: 50, left: 50};
  
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
      
      var p = 0.8;
      
      
      // adds the links between the nodes
      var link = g.selectAll(".link")
          .data(nodes.descendants().slice(1))
        .enter().append("path")
          .attr("class", "link")
          .attr("d", function(d) {
             curve =  "M" + d.x + "," + d.y
               + " " + d.x  + "," + (d.y + (d.parent.y - d.y)*p  )
               /* + "C" + d.x + "," + (d.y + d.parent.y) / 2 */
               /*+ " " + d.parent.x + "," +  (d.y + d.parent.y) / 2 */
               + " " + d.parent.x + "," + d.parent.y;
             console.log(curve);
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
      node.append("circle")
        .attr("r", 10);
      
      // adds the text to the node
      node.append("text")
        .attr("dy", ".35em")
        .attr("y", function(d) { return d.children ? -20 : 20; })
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.rule; });

    });
    
  }
  
  chart.orientation = function(_) {
    if (!arguments.length) return orientation;
    orientation = _;
    return chart;    
  };
  
  return chart;
  
}