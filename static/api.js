var data; // will store data retrieved from nobel prize API
var countries; // stores a list of countries

// makes API call to get a list of all countries
$.ajax({
  url:'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code',
  async: false,
  success: function(d) {
    console.log(d);
    countries = d;
  }
});

var counID = [];
// end of API call to get a list of all countries

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

// console.log(counID);
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
  // console.log(li);
  tem.push(li);
} // country for loop
tem.sort();
// tem.sort(function sortNumber(a,b) {return a[0] - b[0];}).reverse();
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
    // console.log(li);
    t2.push(li);
  } // country for loop
  // final[yr] = t2.sort(function sortNumber(a,b) {return a[0] - b[0];}).reverse();
  final[yr] = t2.sort();
} // year for loop

// console.log(final['all']);
console.log("final");
console.log(final[2016]);
// console.log(final[2016][0]);
// for (var key in final) {
//   console.log(final[key]);
// }
