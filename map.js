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

var zoom={
  duration: 1000,
  zoomLevel: 5
};

console.log("width:"+width);
console.log("height:"+height);

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
    console.log("click registered");
    if (this.getAttribute("title") !== "" && centered !== this.getAttribute("title")){
	console.log("clicked "+this.getAttribute("title"));
	var centroid = getCentroid(this);
	x = centroid[0];
	y = centroid[1];
	console.log(getBiggerDimension(this));
	zoom.zoomLevel = 600/(getBiggerDimension(this));
	centered = this.getAttribute("title");
    }
    else{
	console.log("did not register click on country");
	x =  width/2;
	y = height/2;
	zoom.zoomLevel = 1;
	centered = null;
    }
    entireScreen.transition()
	.duration(zoom.duration)
	.attr('transform','scale(' + zoom.zoomLevel + ')translate(' + width/2 + ',' + height/2 + ')translate(' + -x + ',' + -y + ')');
});



//panning

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
