#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import json
import csv

states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]

CITY = 0
STATE = 1
LATITUDE = 2
LONGITUDE = 3

def getCityState(home):
  strs = home.split(",")
  state = strs[len(strs)-1].strip()
  city = strs[0].strip()
  return {
    'state': state,
    'city': city
  }

def isInUSA(state):
  for s in states:
    if s == state:
      return True

  return False

def main(argv):
  if len(argv) < 3:
    print("usage: add_geocoding.py <geocoded csv file> <input json file> <output json file>")
    return
  with open(argv[0]) as csv_file:
    csv_data = csv.reader(csv_file, delimiter=',') 
    mapToLatLon = {}
    for row in csv_data:
      mapToLatLon['{}, {}'.format(row[CITY], row[STATE])] = {
        'latitude': row[LATITUDE],
        'longitude': row[LONGITUDE]
      }

    with open(argv[1]) as json_file:
      bios = json.load(json_file)
      for player in bios:
        home = getCityState(player["hometown"])
        if (isInUSA(home["state"])):
          geo = mapToLatLon[player["hometown"]]
          player["latitude"] = geo["latitude"]
          player["longitude"] = geo["longitude"]

      with open(argv[2], "+a") as outfile:
        json.dump(bios, outfile)

if __name__ == "__main__":
  main(sys.argv[1:])   