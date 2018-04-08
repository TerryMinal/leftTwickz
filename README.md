# leftTwickz
SoftDev d3 project

# Team LefTwickz - Terry Guan, Caleb Smith-Salberg, Charles Weng, Yuyang Zhang
---

### Description of data set:
 * Nobel Laureate data describing field of study, country of origin, year, etc
 * REST API link: https://www.nobelprize.org/nobel_organizations/nobelmedia/nobelprize_org/developer/
 * Hopefully with this data visualization, we can find trends in the data and extrapolate it into the future

### Explanation, in broad strokes if necessary, of how you aim to make this data come alive.
 * What will be shown, absent user interaction:  
 A map will be displayed on the initial page. The map will be broken down into various countries where Nobel Laureates would be categorized based on their respective country. Nobel Laureate density (number of Laureates per country) will be displayed through a dot density map. A slider/button will also be displayed to cycle through time periods in which the Laureates won their prizes.
 * How will user interact with your visualization:  
The dot-density map will consist of interactive dots that, once clicked, will expand and give more information on a specific Laureate. The user will also be able to zoom in by scrolling. The user will also be able to use a slider to adjust the time periods.

### What questions will your visualization allow user to explore? What questions will it provoke?
 * During what time period, were there the most Nobel Prize Laureates?
 * Does a time period affect the types of prizes awarded?
 * Which country is seen to be the most successful in terms of winning awards?

### D3 feature utilization:
Each country will be a selection that can be used to incorporate the data
Slider/buttons will add a sort of “time axis” to our data

Post-MVP we will try to map it out on a globe, such as the one found on [this page](http://bl.ocks.org/patricksurry/5721459)

### Example of Dot Density Map
![dot density map](readmeFiles/dot_density_map.gif "illustration of dot density map")
