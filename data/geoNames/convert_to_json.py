#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import csv
import json

def main(argv):
  if len(argv) < 2:
    print("usage: convert_to_json.py <inputfile> <outputfile>")
    return
  with open(argv[0], encoding="ISO-8859-1") as csv_file:
    data_in = csv.reader(csv_file, delimiter=',')

    cities = []
    keys = []
    line_count = 0
    for row in data_in:
      if line_count == 0:
        keys = row
        line_count += 1
      else:
        city = {}
        for i in range(len(keys)):
          city[keys[i].lower()] = row[i]
        cities.append(city)
        line_count += 1

  with open(argv[1], 'a+') as outfile:
    json.dump(cities, outfile)

if __name__ == "__main__":
  main(sys.argv[1:])      