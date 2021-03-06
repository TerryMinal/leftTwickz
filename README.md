# leftTwickz
SoftDev d3 project

# Team LefTwickz - Terry Guan, Caleb Smith-Salberg, Charles Weng, Yuyang Zhang
---

### Description
Do you smell what Alfred is cooking? Me neither, he died a long time ago. But, his legacy lives on: behold, the the Nobel Prize Laureates! This project gives you insights on the Nobel Laureates and where they come from. We all know Einstein won the Nobel Prize for Germany, but do you ever beg to wonder who else won the Nobel Prize and was born in Germany? We did, and we're sure you did too, otherwise why are you here?

### Launch Instructions
 * Download or clone this repo
 * Open a virtualenv and run `pip install json` and `pip install flask`
 * Run `python app.py` in the git directory
 * open up localhost:5000 in a browser

### Description of data set:
 * Nobel Laureate data describing field of study, country of origin, year, etc
 * REST API link: https://nobelprize.readme.io/docs/laureate
 * API of countries: https://restcountries.eu/rest/v2/all?fields=name
 * SVG Map of the World: https://www.amcharts.com/svg-maps/?map=worldWithAntarctica

### How to use
Here's what you'll see
![example](readme/world.svg "what you'll see")

 * You'll be shown a heat map based on number of Nobel Laureates from each country
 * You can toggle which individual year to see like 2017

### Thought Provoking Thoughts
 * Does a time period affect the types of prizes awarded?
 * Hey! Do they award Nobel prizes during times of war? Afterall, this is an INTERNATIONAL thing
 * Which country is seen to be the most successful in terms of winning awards? (USA, but are they really the smartest? Or are they, like Michio Kaku says, just a magnet for international talent?)

### D3 feature utilization:
Each country will be a selection that can be used to incorporate the data
Slider/buttons will add a sort of “time axis” to our data
Used svg and d3 to draw out the map
Used svg to find the centroids of each country to display pop up
