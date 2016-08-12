function d3cision() {

  // defaults (don't forget: have functions)
  var textnodesize = "14px";
  var debug = false;
  var shape = 0.75;
  var sep = 7.5;
  var primarycolor = "#ccc";
  var secondarycolor  = "transparent" // "#f0f0f0";
  var accentcolor = "#303F9F";
  var textcolor = "transparent" // "#212121";
  var transitiontime = 500;

  // internals
  var textposition = {x : 0, y : 0};
  var margin = { top: 25, right: 25, bottom: 25, left: 25 };
  var rectpars = { width: 8 };
  var colors = ["red", "blue"];

  function chart(selection) {

    selection.each(function(data, i) {

      var width = this.offsetWidth - margin.left - margin.right;
      var height = this.offsetHeight - margin.top - margin.bottom;
      var d3cisionid = makeid();
      var colorscale = "s";

      if(debug){
        console.log("data", data);
        console.log("d3cisionid", d3cisionid);
        window.data = data;
      }

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

      // the external (the real ones)
      var links1 = links
        .append("path")
        .attr("d3cisionid", d3cisionid)
        .attr("class", "d3cisionid-link-external")
        .attr("stroke", secondarycolor)
        .attr("fill", "none")
        .attr("stroke-width", "2px")
        .attr("nodeid", function(d){ return d.data.name; })
        .attr("d", function(d) {
          var yd = (1 - shape) * d.y + shape * d.parent.y;
          var curve = getshape(d.x, d.y, d.parent.x, d.parent.y, yd);
          return curve;
        });

      // the internal, which add some fancy style IMHO
      var link2 = links
        .append("path")
        .attr("d3cisionid", d3cisionid)
        .attr("class", "d3cisionid-link-internal")
        .attr("stroke", primarycolor)
        .attr("fill", "none")
        .attr("stroke-width", "2px")
        .attr("nodeid", function(d){ return d.data.name; })
        .attr("d", function(d) {
          var sep2 = sep * ((d.data.side == "left") ? 1 : -1),
            yd = (1 - shape) * d.y + shape * d.parent.y,
            m = (d.parent.y - yd) / (d.parent.x - d.x),
            bp = sep * Math.sqrt(m * m + 1) + d.parent.y,
            ydp = m * (d.x + sep2) - (m * d.parent.x - bp);
          var curve = getshape(d.x + sep2, d.y - sep, d.parent.x, bp, ydp);
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

      // adds the rects to the node
      /*
      var rects = node.append("rect")
        .attr("d3cisionid", d3cisionid)
        .attr("fill", "#ccc")
        .attr("nodeid", function(d){ return d.data.name; })
        .attr("x", function(d){
          x = -rectpars.width/2 + sep * ((d.data.side == "left") ? 1 : -1);
          x = (d.data.name == "1") ? -rectpars.width/2 : x;
          // x = -3 - sep;
          return x;
        })
        .attr("y", -sep)
        .attr("width", rectpars.width)
        .attr("height", 10);
      */

      // adds the text to the node
      var texts = node.append("text")
        .attr("d3cisionid", d3cisionid)
        .attr("class", "d3cision-node-text")
        .attr("nodeid", function(d){ return d.data.name; })
        .attr("font-size", textnodesize)
        .attr("fill", textcolor)
        .attr("dy", ".35em")
        .attr("y", -20) //.attr("y", function(d) { return d.children ? -20 : 20; })
        .attr("x", function(d){
          var textanchor = (d.data.side == "left") ? "end" : "left";
          var x = 5 * ((textanchor == "end") ? -1 : 1);
          return x;
        })
        .style("text-anchor", function(d){
          //.style("text-anchor", "middle")
          var textanchor = (d.data.side == "left") ? "end" : "left";
          return textanchor;
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

        d3.selectAll("path[d3cisionid='" + d3cisionid + "'][nodeid='" + d.data.name + "']")
          .transition().duration(transitiontime)
          .attr("stroke", accentcolor);

        d3.selectAll("text[d3cisionid='" + d3cisionid + "'][nodeid='" + d.data.name + "']")
            .transition().duration(transitiontime)
            .attr("fill", accentcolor);
      }

      function mouseout(d) {
        d3.selectAll(".d3cisionid-link-external[d3cisionid='" + d3cisionid + "'][nodeid='" + d.data.name + "']")
          .transition().duration(transitiontime)
          .attr("stroke", secondarycolor);

        d3.selectAll(".d3cisionid-link-internal[d3cisionid='" + d3cisionid + "'][nodeid='" + d.data.name + "']")
          .transition().duration(transitiontime)
          .attr("stroke", primarycolor);

        d3.selectAll("text[d3cisionid='" + d3cisionid + "'][nodeid='" + d.data.name + "']")
          .transition().duration(transitiontime)
          .attr("fill", secondarycolor);
      }

      d3.selectAll("[d3cisionid='" + d3cisionid + "']").on('mouseover', mouseover);
      d3.selectAll("[d3cisionid='" + d3cisionid + "']").on('mouseout', mouseout);
      // link2.on('mouseout', mouseout);
      // rects.on('mouseover', mouseover);

    });

  }

  chart.textnodesize = function(_) {
    if (!arguments.length) return textnodesize;
    textnodesize = _;
    return chart;
  };

  chart.shape = function(_) {
    if (!arguments.length) return shape;
    shape = _;
    return chart;
  };

  chart.sep = function(_) {
    if (!arguments.length) return sep;
    sep = _;
    return chart;
  };

  chart.primarycolor = function(_) {
    if (!arguments.length) return primarycolor;
    primarycolor = _;
    return chart;
  };

  chart.secondarycolor = function(_) {
    if (!arguments.length) return secondarycolor;
    secondarycolor = _;
    return chart;
  };

  chart.accentcolor = function(_) {
    if (!arguments.length) return accentcolor;
    accentcolor = _;
    return chart;
  };

  chart.textcolor = function(_) {
    if (!arguments.length) return textcolor;
    textcolor = _;
    return chart;
  };

  chart.transitiontime = function(_) {
    if (!arguments.length) return transitiontime;
    transitiontime = _;
    return chart;
  };

  chart.debug = function(_) {
    if (!arguments.length) return debug;
    debug = _;
    return chart;
  };

  return chart;

}

// Auxiliar functions
// http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
  return Math.random().toString(36).substr(2, 5);
}

function getshape(x, y, xp, yp, yd) {

   curve =  "M" + x + "," + y
     + " " + x  + "," + yd
     + " " + xp + "," + yp;

    return curve;

}
