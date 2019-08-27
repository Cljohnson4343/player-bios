#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import csv

STATE = 1
COUNTY = 0
POPULATION = 2
LATITUDE = 3
LONGITUDE = 4

def main(argv):
  if len(argv) < 2:
    print("usage: filter_by_geocoding.py <inputfile> <outputfile>")
    return
  with open(argv[0], encoding="ISO-8859-1") as csv_file:
    data_in = csv.reader(csv_file, delimiter=',')

    cities = []
    line_count = 0
    for row in data_in:
      if line_count == 0:
        line_count += 1
      else:
        print(f'({row[LATITUDE]}, {row[LONGITUDE]})')
        if abs(float(row[LATITUDE])) > 0 and abs(float(row[LONGITUDE])) > 0:
          cities.append(",".join([row[COUNTY], row[STATE], row[POPULATION], row[LATITUDE], row[LONGITUDE]]))
        line_count += 1

  with open(argv[1], 'a+') as outfile:
    outfile.write("County,State,Population,Latitude,Longitude\n")
    for city in cities:
      outfile.write(city+"\n")

if __name__ == "__main__":
  main(sys.argv[1:])      