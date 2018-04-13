/*
  lefTwickz - Terry Guan, Caleb Smith-Salzberg, Charles Weng, Yuyang Zhang
  SoftDev2   pd7
  P #01: Viz
  2018-4-?
*/

/*
  ==============================================================================
                                  Variables/Initiation
  ==============================================================================
*/

var object, svgDoc, svgItem;

window.onload=function() {
	// Get the Object by ID
	object = document.getElementById("svgObject");
	// Get the SVG document inside the Object tag
	svgDoc = object.getSVGDocument();
	// Get one of the SVG items by ID;
	svgItem = svgDoc.getElementsByTagName("svg")[0];

	svgItem.setAttribute("fill", "lime");
};

// add events for each path
var paths = d3.select(document.getElementById("svgObject").contentDocument).selectAll("path");
paths.on("mouseover", function(){
    this.style("fill", "red");
    console.log("hi");
  })
paths.on("mouseout", function(){

  })
paths.on("click", function(){

  });
