function d3cision() {
  
  // defaults (have function)
  var orientation = "top-to-bottom";
  
  function chart(selection) {
    
   console.log("calling chart");
   console.log("parameters:", orientation);
   
   selection.each(function(d, i) {
   
     console.log("data", d);
     console.log(this.offsetWidth);
     console.log(this.offsetHeight);
     
     
   });
 
  }
  
  chart.orientation = function(_) {
    if (!arguments.length) return orientation;
    orientation = _;
    return chart;    
  };
  
  return chart;
  
}