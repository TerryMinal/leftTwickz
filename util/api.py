import requests
import csv
import json
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
f = "util/countries.csv"
if __name__ == "__main__":
   f = "countries.csv"

with open(f, "rb") as d:
    r = csv.reader(d)
    for row in r:
        countries.append(row[1])

# contains a list of all laureates with all available information
# NOTE: Some information is missing depending on the laureate. This is accounted for
# with the try except blocks
laureates = []
for i in range(len(data)):
    p = data[i]
    laureate = {"bornCountry": p['bornCountry'], "category": p['prizes'][0]['category'], "awardYear": p['prizes'][0]['year'], "share": p['prizes'][0]['share']}
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
finalData = []

for c in countries:
    temp = []
    num = 0
    for l in laureates:
        if l["bornCountry"] == c:
            temp.append(l)
            num += 1
    finalData.append([num, c, temp])
    finalData.sort(reverse=True)

def get_data(**opt):
    global finalData
    r = {}
    r['all'] = finalData
    for yr in range(1901, 2019):
        templist = []
        for c in countries:
            templist2 = []
            count = 0
            for l in laureates:
                if int(l['awardYear']) == yr and l['bornCountry'] == c:
                    templist2.append(l)
                    count += 1
            templist.append([count, c, templist2])
        templist.sort(reverse=True)
        r[yr] = templist
    return r
    # r = {}
    # if 'year' in opt:
    #     yr = opt['year']
    #     if 'single' in opt and opt['single']:
    #         for key in finalData:
    #             temp = []
    #             count = 0
    #             for i in finalData[key][1]:
    #                 # print i
    #                 if i["awardYear"] == yr:
    #                     temp.append(i)
    #                     count += 1
    #             r[key] = [count, temp]
    #     elif 'upto' in opt and opt['upto']:
    #         for key in finalData:
    #             temp = []
    #             count = 0
    #             for i in finalData[key][1]:
    #                 # print i
    #                 if int(i["awardYear"]) <= int(yr):
    #                     temp.append(i)
    #                     count += 1
    #             r[key] = [count, temp]
    # else:
    #     r = finalData
    # return r


if __name__ == "__main__":
    # pprint(data)
    # pprint(finalData)
    # print finalData
    n = get_data()
    pprint(n[2016])
