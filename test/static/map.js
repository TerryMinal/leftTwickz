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
var init_year = 1900


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
var projection = d3.geo.mercator();



 //for tooltip 
    var offsetL = document.getElementById('map-holder').offsetLeft+10;
    var offsetT = document.getElementById('map-holder').offsetTop+10;

    var path = d3.geo.path()
        .projection(projection);

    var tooltip = d3.select("#map")
         .append("div")
        .attr("class", "tooltip hidden");

function showTooltip(d) {
      var mouse = d3.mouse(entireScreen.node())
        .map( function(d) { return parseInt(d); } );
      tooltip.classed("hidden", false)
        .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
        .html(path_title);
    }


// mouseover and mouseout event listeners
paths.on("mouseover", function(){
    this.setAttribute("class", "country");
    d3.select(this).style("cursor", "pointer");

    path_title= this.getAttribute("title");

    document.getElementById("country").innerHTML = path_title;

    showTooltip();

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

var ex = [[32,'United Kingdom'], [4, 'China'], [2, 'Ireland'], [8, "United States"], [16, "Mexico"], [2, 'Russia']];
var log = false;

const findMax = function(data){
  var temp = 0;
  for( i = 0; i < data.length; i ++){
    if (data[i][0] > temp)
      temp = data[i][0];
  }
  return temp;
}

const updateScale = function(){
  // do scale switching
}

// finds the appropriate class bracket for the heat map for a number given the base
// basically floor(log base b of n)
// should return 1-5
const findBracket = function(b, n){
  var ans = 1;
  while(n > b){
    n = n / b;
    ans++;
  }
  return ans;
}

const plot_heat = function(data){
  var max = findMax(data);
  // if linear case else log case
  if (max < 6){
    for (var i = 0; i < data.length; i++){
      var x = d3.selectAll('path[title="' + data[i][1] + '"]');
      x.attr('class', "heat" + data[i][0]);
      console.log(data);
      console.log(country);
    }
    console.log('linear');
  } else{
    // find appropriate scale
    console.log('log');
    var base = 1;
    while (base * base * base * base * base < max){
      console.log('log');
      base++;
    }
    for (var i = 0; i < data.length; i++){
      var x = d3.selectAll('path[title="' + data[i][1] + '"]');
      x.attr('class', "heat" + findBracket(base, data[i][0]));
      console.log(data);
      console.log(country);
    }
    console.log('log');
  }
  console.log("did the thing");
}

plot_heat(ex);


//creates slider
   d3.select("body").insert("p", ":first-child").append("input")
        .attr("type", "range")
        .attr("min", "1900")
        .attr("max", "2018")
        .attr("value", init_year)
    .attr("id", "year");

d3.select("body").insert("h2", ":first-child").text( "Nobel Laureates in "+ init_year);


//when slider is being used
d3.select("#year").on("input", function() {
    function updateYear(){
	d3.select("h2").text("Nobel Laureates in " + d3.select("#year").node().value);
    }
    updateYear();
    console.log("Used");
});

//better slider (currently does not work)
//d3.select('body').call(d3.slider().axis(true).min(2000).max(2100).step(5));

