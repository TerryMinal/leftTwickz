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

var object, svgDoc, svgItem, centered;

var zoom={
    duration: 1000,
    zoomLevel: 5
};


var bBox = document.getElementById("map").getBBox();

var width= bBox.width;
var height= bBox.height;

console.log("width:"+width);
console.log("height:"+height);


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
var entireScreen = d3.select('svg');
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
    document.getElementById("country").innerHTML = "World Map";
    console.log("World Map");
});

//zoom in

function getCentroid(element) {
    var bbox = element.getBBox();
    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}

function getBiggerDimension(element) {
    var bbox = element.getBBox();
    return Math.max(bbox.width, bbox.height);
}

paths.on("click", function(){
    var x, y, zoomLevel;
    console.log("click registered");
    if (this.getAttribute("title") !== "" && centered !== this.getAttribute("title")){
	console.log("clicked "+this.getAttribute("title"));
	var centroid = getCentroid(this);
	console.log(getCentroid(this));
	x = centroid[0];
	y = centroid[1];
	zoom.zoomLevel = 3//(getBiggerDimension(this));
	centered = this.getAttribute("title");
    }
    else{
	console.log("did not register click on country");
	x = screen.width/2;
	y = screen.height/2;
	zoom.zoomLevel = 1;
	centered = null;
    }
    entireScreen.transition()
	.duration(zoom.duration)
	.attr('transform','translate(' + screen.width/2 + ',' + screen.height/2 + ')translate(' + -x + ',' + -y + ')scale(' + zoom.zoomLevel + ')');
});
    

