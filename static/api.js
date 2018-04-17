var data;
var countries;

$.ajax({
  url:'https://restcountries.eu/rest/v2/all?fields=name',
  async: false,
  success: function(d) {
    countries = d;
    // console.log(countries);
  }
});

$.ajax({
  url:'http://api.nobelprize.org/v1/laureate.json?',
  async: false,
  success: function(d) {
    d = d['laureates'];
    data = d;
  } // end of success
});

var laureates = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i]['born'] != '0000-00-00') {
      p = data[i];
      laureate = {"bornCountry": p['bornCountry'], "category": p['prizes'][0]['category'], "awardYear": p['prizes'][0]['year'], "share": p['prizes'][0]['share']};
      laureates.push(laureate);
    } // end of if
  } // end of d iteration

// console.log("lau");
// console.log(laureates);

function reverseSort(a, b) {
  if (a[0] < b[0])
    return -1;
  if (a[0] > b[0])
    return 1;
  return 0;
}

var final = {};
for (var yr = 1901; yr < 2019; yr++) {
  var t2 = [];
  for (var c = 0; c < countries.length;  c++) {
    var count = 0;
    var t = [];
    var li;
    for (var l = 0; l < laureates.length; l++) {
      if (laureates[l]['bornCountry'] == countries[c] && parseInt(laureates[l]['awardYear']) == yr) {
        t.push(laureates[l]);
        count++;
      } // if statement
    } // laureate for loop
    li = [count, countries[c], t];
    console.log(li);
    t2.push(li);
  } // country for loop
  final[yr] = t2.sort().reverse();
} // year for loop

console.log(final[2016][0]);
// for (var key in final) {
//   console.log(final[key]);
// }
