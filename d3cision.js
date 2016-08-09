function d3cision() {
  
  // defaults (don't forget: have functions)
  var shapelink = 0.75;
  var textnodesize = "12px"; 

  // internals
  var sep = 10;
  var textposition = {x : 0, y : 0};
  var margin = { top: 25, right: 25, bottom: 25, left: 25 };

  function chart(selection) {
    
    selection.each(function(data, i) {
      
      var width = this.offsetWidth - margin.left - margin.right;
      var height = this.offsetHeight - margin.top - margin.bottom;
      var d3cisionid = makeid();
      

      console.log("data", data);
      console.log("d3cisionid", d3cisionid);

      window.data = data;

      var svg = d3.select(this).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
        
      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      // declares a tree layout and assigns the size
      var treemap = d3.tree()
        .size([width, height]);
      
      //  assigns the data to a hierarchy using parent-child relationships
      var nodes = d3.hierarchy(data);
      
      // maps the node data to the tree layout
      nodes = treemap(nodes);
      
      // adds the links between the nodes
      var links =  g.selectAll(".link2")
        .data(nodes.descendants().slice(1))
        .enter();
        
      var links1 = links
        .append("path")
        .attr("d3cisionid", d3cisionid)
        .attr("class", "d3cision-link")
        .attr("stroke", "#bbb")
        .attr("fill", "none")
        .attr("stroke-width", "2px")
        .attr("nodeid", function(d){ return d.data.name; })
        .attr("d", function(d) {
          
          curve =  "M" + d.x + "," + (d.y - (d.y * 0))
            + " " + d.x  + "," + (d.y + (d.parent.y - d.y) * shapelink)
            + " " + d.parent.x + "," + d.parent.y;
            
          return curve;
        });
        
      var link2 = links
        .append("path")
        .attr("stroke", "#ddd")
        .attr("d3cisionid", d3cisionid)
        .attr("fill", "none")
        .attr("stroke-width", "2px")
        .attr("nodeid", function(d){ return d.data.name; })
        .attr("d", function(d) {
        
          x = d.x - sep * ((d.data.textanchor == "end") ? -1 : 1);
          xp = d.parent.x;
          y = d.y - sep;
          yp = d.parent.y + sep;
          yd = (d.y + (yp - y) * shapelink);
          
          z = sep * (yd - yp) / Math.abs(xp - x);
          
          yd = yd - z;
          
          curve =  "M" + x + "," + y
          + " " + x  + "," + yd
          + " " + xp + "," + yp;
          
          return curve;
          
        });
      
      // adds each node as a group
      var node = g.selectAll(".node")
          .data(nodes.descendants())
        .enter().append("g")
          .attr("class", function(d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
          })
          .attr("nodeid", function(d){ return d.data.name; })
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
      
      // adds the circle to the node
      var rects = node.append("rect")
        .attr("d3cisionid", d3cisionid)
        .attr("fill", "#ccc")
        .attr("nodeid", function(d){ return d.data.name; })
        .attr("x", -3)
        .attr("y", -sep)
        .attr("width", 6)
        .attr("height", 10);
      
      // adds the text to the node
      node.append("text")
        .attr("d3cisionid", d3cisionid)
        .attr("dy", ".35em")
        //.attr("y", function(d) { return d.children ? -20 : 20; })
        .attr("class", "d3cision-node-text")
        .attr("font-size", textnodesize)
        .attr("fill", "#999")
        .attr("y", -20)
        .attr("x", function(d){
          return 5 * ((d.data.textanchor == "end") ? -1 : 1);
        })
        //.style("text-anchor", "middle")
        .style("text-anchor", function(d){
          // return d.children ? "middle" : d.data.textanchor;
           return d.data.textanchor;
        })
        .text(function(d) { return d.data.rule + " (" + d.data.name + ")"; });
        
      // text rule 
      var textrule = g.selectAll(".text")
        .attr("d3cisionid", d3cisionid)
        .data([textposition]).enter()
        .append("text")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .text("");
        
        
      function mouseover(d) {
        console.log(d.data.name);
        /*d3.selectAll("[d3cisionid='ynppv']").selectAll("[nodeid='4']");*/
      };
      
      links.on('mouseover', mouseover)
      rects.on('mouseover', mouseover);
      

    });
    
  }
  
  chart.shapelink = function(_) {
    if (!arguments.length) return shapelink;
    shapelink = _;
    return chart;    
  };
  
  chart.textnodesize = function(_) {
    if (!arguments.length) return textnodesize;
    textnodesize = _;
    return chart;    
  };
  
  return chart;
  
}



// Auxiliar functions
// http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
  return Math.random().toString(36).substr(2, 5);
}

