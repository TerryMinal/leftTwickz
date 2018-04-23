/*
  lefTwickz - Terry Guan, Caleb Smith-Salzberg, Charles Weng, Yuyang Zhang
  SoftDev2   pd7
  P #01: Viz
  2018-4-?
*/

/*
  ==============================================================================
                                  DATA INITIATION
  ==============================================================================
*/

var data; // will store data retrieved from nobel prize API
var countries; // stores a list of countries

// makes API call to get a list of all countries
$.ajax({
  url:'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code',
  async: false,
  success: function(d) {
    countries = d;
  }
});
// end of API call to get a list of all countries

var counID = [];

// makes an array of countries (the above api call originally returned an array of OBJ)
var temp = [];
for (var i = 0;  i < countries.length; i++) {
  temp.push(countries[i]["name"]);
  counID.push(countries[i]["alpha2Code"])
}
countries = temp;
//  adjusts for discrepancies between country api and nobelprize api
countries[countries.indexOf('United States of America')] = 'USA';
countries[countries.indexOf('United Kingdom of Great Britain and Northern Ireland')] = 'United Kingdom';
// end of creating countries array

// make API call for nobel laureates data
$.ajax({
  // url:'http://ap2i.nobelprize.org/v1/laureate.json?',
  url: '/nobel',
  async: false,
  success: function(d) {
    d = JSON.parse(d);
    d = d['laureates'];
    data = d;
  } // end of success
});
// end of API call for nobel laureate

// forms a dictionary of relevant data for each laureate. Appends that dictionary to a list of laureates
var laureates = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i]['born'] != '0000-00-00') {
      p = data[i];
      laureate = {"name": p['firstname'] + p['surname'], "bornCountry": p['bornCountry'], "category": p['prizes'][0]['category'], "awardYear": p['prizes'][0]['year'], "motivation": p['prizes'][0]['motivation'], "share": p['prizes'][0]['share']};
      laureates.push(laureate);
    } // end of if
  } // end of data iteration

var print_int = {};
/*
for (x = 0; x< final.length, x += 1)
  if (final[x] == d3.select("#year").node().value){

  }

*/


// creating a dictionary of this form:
// final: {
    // yr: [# of laureates in a specified country, specified country, list of laureates]
// }
// example:
//   final: {
//     2018: [0, USA, [] ]
//   }
// NOTE: each yr's data is sorted in descending order

var final = {};
var tem = [];
for (var c = 0; c < countries.length;  c++) {
  var count = 0;
  var t = [];
  var li;
  for (var l = 0; l < laureates.length; l++) {
    if (laureates[l]['bornCountry'].indexOf(countries[c]) != -1) {
      t.push(laureates[l]);
      count++;
    } // if statement
  } // laureate for loop
  li = [counID[c], count, countries[c], t];
  // //console.logli);
  tem.push(li);
} // country for loop
tem.sort(function sortNumber(a,b) {return a[0] - b[0];}).reverse();
final['all'] = tem;

for (var yr = 1901; yr < 2019; yr++) {
  var t2 = [];
  for (var c = 0; c < countries.length;  c++) {
    var count = 0;
    var t = [];
    var li;
    for (var l = 0; l < laureates.length; l++) {
      if (laureates[l]['bornCountry'].indexOf(countries[c]) != -1 && parseInt(laureates[l]['awardYear']) == yr) {
        t.push(laureates[l]);
        count++;
      } // if statement
    } // laureate for loop
    li = [counID[c], count, countries[c], t];
    // //console.logli);
    t2.push(li);
  } // country for loop
  // final[yr] = t2.sort(function sortNumber(a,b) {return a[0] - b[0];}).reverse();
  final[yr] = t2.sort();
} // year for loop


/*
  ==============================================================================
                                Slider Creation
  ==============================================================================
*/

d3.select("body").insert("p", ":first-child").append("input")
    .attr("type", "range")
    .attr("min", "1901")
    .attr("max", "2017")
    .attr("value", init_year)
    .attr("id", "year");

d3.select("body").insert("h2", ":first-child").text( "Nobel Laureates in "+ init_year);


//when slider is being used
d3.select("#year").on("input", function() {
  //update year
  d3.select("h2").text("Nobel Laureates in " + d3.select("#year").node().value);
  // update legend
  d3.selectAll("text").remove();
  key.append("g").attr("class", "y axis")
      .attr("transform", "translate(41,10)").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 30).attr("dy", ".71em").style("text-anchor", "end").text("Nobel Laureates in " + d3.select("#year").node().value);
});




/*
  ==============================================================================
                          General Variable Declaration
  ==============================================================================
*/

// map variables
const bBox = document.getElementById("map").getBBox();
var width= bBox.width;
var height= bBox.height;
var currCenterX = width/2;
var currCenterY = height/2;
var centered;

const entireScreen = d3.select('svg');
const paths = d3.select('svg').selectAll('path');
var path_title;
var projection = d3.geo.mercator();

// zoom variables
var currZoom = 1;
var zoom={
  duration: 1000,
  zoomLevel: 5
};

// year counter
var init_year = 1901;




/*
  ==============================================================================
                          Legend Variables and Creation
  ==============================================================================
*/

var w = 140, h = 400;
var key = d3.select("body").append("svg").attr("width", w).attr("height", h);
var legend = key.append("defs").append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "100%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");
legend.append("stop").attr("offset", "0%").attr("stop-color", "rgba(255,80,80,1)").attr("stop-opacity", 1);
legend.append("stop").attr("offset", "100%").attr("stop-color", "rgba(255,80,80,.1)").attr("stop-opacity", 1);

key.append("rect").attr("width", w - 100).attr("height", h - 100).style("fill", "url(#gradient)").attr("transform", "translate(0,10)");
var y = d3.scale.linear().range([300, 0]).domain([1, 100]);
var yAxis = d3.svg.axis().scale(y).orient("right");



/*
  ==============================================================================
                                Tooltop Creation
  ==============================================================================
*/

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

function pop_it(currCountry) {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  //console.log"popped");
}


/*
  ==============================================================================
                            Country Hover Listeners
  ==============================================================================
*/

paths.on("mouseover", function(){
  if (this.getAttribute("class") == "land"){
  	this.setAttribute("class", "selected");
  }else{
  	d3.select(this).style("stroke", "green").style("stroke-width", "1");
  }

  d3.select(this).style("cursor", "pointer");
  path_title= this.getAttribute("title");
  document.getElementById("country").innerHTML = path_title;
  document.getElementById("myPopup").innerHTML = path_title;
  pop_it(path_title);

  showTooltip();
});

paths.on("mouseout", function(){
  if ((this.getAttribute("class") == "selected")){
  	this.setAttribute("class", "land");
  }else{
  	d3.select(this).style("stroke", "white");
  }
  document.getElementById("country").innerHTML = "World Map";
  pop_it(path_title);
  path_title = "Ocean";
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

//adds table to popup
var created_table = false;
var table = document.createElement('table');
table.setAttribute('border','1');
table.setAttribute('width','100%')
var row = table.insertRow(0);
for(j=1; j<=1; j++){
  var text = document.createTextNode("Info");
  var cell = row.insertCell(j-1);
  cell.setAttribute('align','center')
  cell.appendChild(text);
}
for(j=1; j<=1; j++){
  var text = document.createTextNode("Name");
  var cell = row.insertCell(j-1);
  cell.setAttribute('align','center')
  cell.appendChild(text);
}

//final[d3.select("#year").node().value]
/*
console.log(d3.select("#year").node().value);
//console.log(final[d3.select("#year").node().value][232][3]);
for (x in final[2017][232][3]){
console.log(final[2017][232][3][x]["name"]);
console.log(final[2017][232][3][x]["motivation"]);
};
*/

var fill_laureates = function(a,b,c){
  for (x in final[a][b][c]){
  console.log("NAME " + final[a][b][c][x]["name"]);
  console.log("MOT " + final[a][b][c][x]["motivation"]);
  console.log(x);
  };
}



var fill_table = function(){
for (x = 0; x < final[2017].length; x+=1){
  console.log(final[2017][x][2]);
  if (final[2017][x][2] == "United States"){
  fill_laureates(2017, x, 3);
  }
  }
};

 console.log("this is cheese");
console.log(fill_table());

paths.on("click", function(){

  var x, y, zoomLevel;

  if (this.getAttribute("title") !== "" && centered !== this.getAttribute("title")){
  	var centroid = getCentroid(this);
  	x = centroid[0];
  	y = centroid[1];
  	zoom.zoomLevel = 600/(getBiggerDimension(this));
  	centered = this.getAttribute("title");
  }else{
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

  //console.log"Center X: " + currCenterX);
  //console.log"Center Y: " + currCenterY);
  //console.log"Zoom: " + currZoom);

  //popup labels
  setTimeout(function(){ document.getElementById("myPopup").innerHTML = path_title;}, zoom.duration)

fill_table();
  if (currZoom != 1){
    if (created_table == false){
      $( function() {
        $( "#dialog" ).dialog();
        //document.getElementById("dialog").appendChild(table);
        // document.getElementById("dialog").innerHTML = path_title;
        document.getElementById("dialog").appendChild(table);
      });
      created_table = true;
      //console.logcreated_table);
    }else{
      $( function() {
        $( "#dialog" ).dialog();
      });
    }
  }
});




/*
  ==============================================================================
                         Panning Related Functions
  ==============================================================================
*/

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
  	//console.log"should zoom here if on a country");
  }else{
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
	//console.logdx,dy);
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
  console.log(ans);
  return ans;
}

const plot_heat = function(data){
  var max = data[0][0];
  // if linear case else log case
  if (max < 6){
    for (var i = 0; i < data.length; i++){
      var x = d3.selectAll('path[title="' + data[i][1] + '"]');
      x.attr('class', "heat" + data[i][0]);
      // //console.logdata);
      // //console.logcountry);
    }
    //console.log'linear');
  } else{
    // find appropriate scale
    //console.log'log');
    var base = 1;
    while (base * base * base * base * base < max){
      // //console.log'log');
      base++;
    }
    for (var i = 0; i < data.length; i++){
      var x = d3.selectAll('path[title="' + data[i][1] + '"]');
      x.attr('class', "heat" + findBracket(base, data[i][0]));
      //console.logdata);
      //console.logcountry);
    }
    // //console.log'log');
  }
  //console.log"did the thing");
}



/*
  ==============================================================================
                          Testing/Random Stuff
  ==============================================================================
*/

// plot_heat(final[2016]);

//better slider (currently does not work)
//d3.select('body').call(d3.slider().axis(true).min(2000).max(2100).step(5));

//console.log(final["all"]);
//var item = "USA";
////  console.log(final[2017][x][2]);

//console.log("yeah");
