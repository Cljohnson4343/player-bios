#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import csv

STATE = 1
CITY = 0
POPULATION = 2

def main(argv):
  if len(argv) < 2:
    print("usage: filter_by_population.py <inputfile> <outputfile> <population floor>")
    return
  with open(argv[0], encoding="ISO-8859-1") as csv_file:
    data_in = csv.reader(csv_file, delimiter=',')
    floor = int(argv[2])

    cities = []
    line_count = 0
    for row in data_in:
      if line_count == 0:
        line_count += 1
      else:
        if int(row[POPULATION]) > floor:
          cities.append(",".join(row))
        line_count += 1

  with open(argv[1], 'a+') as outfile:
    outfile.write("City,State,Population\n")
    for city in cities:
      outfile.write(city+"\n")

if __name__ == "__main__":
  main(sys.argv[1:])      