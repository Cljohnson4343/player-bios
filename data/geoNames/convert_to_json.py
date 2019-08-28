#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import csv
import json

keys = ['county', 'state', 'population', 'latitude', 'longitude']
county = 2
state = 3
population = 4
latitude = 5
longitude = 6

def main(argv):
  if len(argv) < 2:
    print("usage: convert_to_json.py <inputfile> <outputfile>")
    return
  with open(argv[0], encoding="ISO-8859-1") as csv_file:
    data_in = csv.reader(csv_file, delimiter=',')

    cities = []
    line_count = 0
    for row in data_in:
      if line_count == 0:
        line_count += 1
      else:
        city = {
          'county': row[county],
          'state': row[state],
          'population': row[population],
          'latitude': row[latitude],
          'longitude': row[longitude]
        }
        cities.append(city)
        line_count += 1

  with open(argv[1], 'a+') as outfile:
    json.dump(cities, outfile)

if __name__ == "__main__":
  main(sys.argv[1:])      