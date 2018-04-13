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

var zoom={
    duration: 1000,
    zoomLevel: 5
};
    


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

//zoom in
/*
paths.on("click", function(d){
    var x, y, zoomLevel;
    if (d && centered != d){
	var centroid = path.centroid(d);
	x= centroid[0];
	y=centroid[1];
	zomLevel = zoom.zoomlevel;
	centered = d;
    }
    else{
	x = 500;
	y = 500;
	zomLevel = 1;
	centered = null;
    }

    .transition()
	.duration(zoom.duration)
	.attr('transform','translate(' + 250 + ',' + 250 + ')scale(' + zoomLevel + ')translate(' + -x + ',' + -y + ')');
});
    */

