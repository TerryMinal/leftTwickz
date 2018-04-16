/*
  lefTwickz - Terry Guan, Caleb Smith-Salzberg, Charles Weng, Yuyang Zhang
  SoftDev2   pd7
  P #01: Viz
  2018-4-?
*/

/*
  ==============================================================================
                      Variable Declaration and Page Initiation
  ==============================================================================
*/

var bBox = document.getElementById("map").getBBox();
var width= bBox.width;
var height= bBox.height;
var currCenterX = width/2;
var currCenterY = height/2;
var currZoom = 1;


var zoom={
  duration: 1000,
  zoomLevel: 5
};

var object, svgDoc, svgItem, centered;

window.onload=function() {
	object = document.getElementById("map-holder");
	svgItem = object.getElementsByTagName("svg")[0];
	// svgItem.setAttribute("fill", "lime");
};


// add events for each path
var entireScreen = d3.select('svg');
var paths = d3.select('svg').selectAll('path');
var path_title;


// mouseover and mouseout event listeners
paths.on("mouseover", function(){
    this.setAttribute("class", "country");
    d3.select(this).style("cursor", "pointer");

    path_title= this.getAttribute("title");

    document.getElementById("country").innerHTML = path_title;

});

paths.on("mouseout", function(){
    this.setAttribute("class", "land");
    document.getElementById("country").innerHTML = "World Map";
});



/*
  ==============================================================================
                         Zoom Related Functions
  ==============================================================================
*/

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
    if (this.getAttribute("title") !== "" && centered !== this.getAttribute("title")){
	var centroid = getCentroid(this);
	x = centroid[0];
	y = centroid[1];
	zoom.zoomLevel = 600/(getBiggerDimension(this));
	centered = this.getAttribute("title");
    }
    else{
	x =  width/2;
	y = height/2;
	zoom.zoomLevel = 1;
	centered = null;
    }
    entireScreen.transition()
	.duration(zoom.duration)
	.attr('transform','scale(' + zoom.zoomLevel + ')translate(' + width/2 + ',' + height/2 + ')translate(' + -x + ',' + -y + ')');
    currCenterX = x;
    currCenterY = y;
    currZoom = zoom.zoomLevel;

    console.log("Center X: " + currCenterX);
    console.log("Center Y: " + currCenterY);
    console.log("Zoom: " + currZoom);    
});


//panning

var startX;
var startY;

entireScreen.on("mousedown", function(){
    var coordinates = [0, 0];
    coordinates = d3.mouse(this);
    startX = coordinates[0];
    startY = coordinates[1];
});


var endX;
var endY;

entireScreen.on("mouseup", function(){
    var coordinates = [0, 0];
    coordinates = d3.mouse(this);
    endX = coordinates[0];
    endY = coordinates[1];
    if (endX == startX && endY == startY){
	console.log("should zoom here if on a country");
    }
    else{
	var x = -(endX - startX) + currCenterX; 
	var y = -(endY - startY) + currCenterY;
//start - end because in the first translation we push the top left corner of the map to the center of the viewing screen. Therefore, when we translate to the desired center we must negate the value, as seen below. 
	entireScreen.transition()
	    .duration(zoom.duration)
	    .attr('transform','scale(' + currZoom + ')translate(' + width/2 + ',' + height/2 + ')translate(' + -x + ',' + -y + ')');

	currCenterX = x;
	currCenterY = y;

    }
});
/*
var pan = d3.behavior.drag()
    .on("drag", function() {
	var dx = d3.event.dx;
	var dy = d3.event.dy;
	console.log(dx,dy);
	entireScreen.transition()
	    .duration(zoom.duration)
	    .attr('transform','translate(' + screen.width/2 + ',' + screen.height/2 + ')translate(' + dx + ',' + dy + ')scale(' + zoom.zoomLevel + ')');
});


entireScreen.call(pan);
*/

/*
  ==============================================================================
                          Data Manipulation
  ==============================================================================
*/


var ex = {}
var log = false;
