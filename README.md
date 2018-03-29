# leftTwickz
SoftDev d3 project

# Team LefTwickz - Terry Guan, Caleb Smith-Salberg, Charles Weng, Yuyang Zhang
---

### Description of data set:
 * Nobel Laureate data describing field of study, country of origin, year, etc
 * REST API link: https://www.nobelprize.org/nobel_organizations/nobelmedia/nobelprize_org/developer/
 * Hopefully with this data visualization, we can find trends in the data and extrapolate it into the future

### Explanation, in broad strokes if necessary, of how you aim to make this data come alive.
 * What will be shown, absent user interaction: A map will be displayed on the initial page. The map will be broken down into various countries where Nobel Laureates would be categorized based on their respective country. Nobel Laureate density (number of Laureates per country) will be displayed with density of clusters of interactive popup dots. A slider/button will also be displayed to chose time periods in which the Laureates won their prizes.
  * How will user interact with your visualization: As mentioned, the user will initially face an map with various shades. By choosing a specific time period, the saturation of that country’s color will change to show the density of laureates during that time. The user can then select a country by clicking on the map. A pop-up will appear and list the various categories of Nobel Prizes. The user may then select a category to see the list the Laureates within that field and learn more. The user may zoom in to see the map better through a button that zooms in with a set magnitude.

### What questions will your visualization allow user to explore? What questions will it provoke?
 * During what time period, were there the most Nobel Prize Laureates?
 * Does a time period affect the types of prizes awarded?
 * Which country is seen to be the most successful in terms of winning awards?

### D3 feature utilization:
Each country will be a selection that can be used to incorporate the data
Slider/buttons will add a sort of “time axis” to our data


Our project will be similar to [this visualization](https://vida.io/gists/TWNbJrHvRcR3DeAZq), but with more data overlayed
Post-MVP we will try to map it out on a globe, such as the one found on [this page](http://bl.ocks.org/patricksurry/5721459)
