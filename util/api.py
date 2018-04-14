import requests
import json
import csv
from pprint import pprint #module that adds pretty printing

data = requests.get('http://api.nobelprize.org/v1/laureate.json?')
data = data.json()
data = data['laureates']
temp = []

# purges all the weird data with no information from the dataset
for i in data:
    if i['born'] != '0000-00-00':
        temp.append(i)
data = temp

# list of all countries
countries = []

with open("countries.csv", "rb") as d:
    r = csv.reader(d)
    for row in r:
        countries.append(row[1])

# contains a list of all laureates with all available information
# NOTE: Some information is missing depending on the laureate. This is accounted for
# with the try except blocks
laureates = []
for i in range(len(data)):
    p = data[i]
    laureate = {"bornCountry": p['bornCountry'], "category": p['prizes'][0]['category'], "awardYear": p['prizes'][0]['year']}
    try:
        laureate["bornCity"] = p['bornCity']
    except:
        laureate["bornCity"] = "Unknown"
    try:
        laureate["firstname"] = p['firstname']
    except:
        laureate["firstname"] = "Unknown"
    try:
        laureate["surname"] = p['surname']
    except:
        laureate["surname"] = "Unknown"
    try:
        laureate["motivation"] = p['prizes'][0]['motivation']
    except:
        laureate["motivation"] = "Unknown"
    laureates.append(laureate)

# dictionary with all laureates in each country. Data is organized as such:
# finalData[country] = [number of laureates born in that country, [list of laureates] ] 
finalData = {}

for c in countries:
    temp = []
    num = 0
    for l in laureates:
        if l["bornCountry"] == c:
            temp.append(l)
            num += 1
    finalData[c] = [num, temp]
