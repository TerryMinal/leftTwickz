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
	object = document.getElementById("map-holder");
	// Get the SVG document inside the Object tag
	// svgDoc = object.contentDocument;
	// Get one of the SVG items by ID;
	svgItem = object.getElementsByTagName("svg")[0];

	svgItem.setAttribute("fill", "lime");
};

// add events for each path
var paths = d3.select('svg').selectAll('path');
var path_title;
paths.on("mouseover", function(){
    this.setAttribute("class", "country");
    d3.select(this).style("cursor", "pointer");
    
    console.log("hi");
    path_title= this.getAttribute("title");
    
    console.log(path_title);
    document.getElementById("country").innerHTML = path_title;

});



paths.on("mouseout", function(){
    this.setAttribute("class", "land");
    console.log("bye");
});


paths.on("click", function(){
  paths.call(d3.zoom().on("zoom", zoomed));
});
