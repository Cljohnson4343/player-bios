#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import csv

STATE = 9
CITY = 8
POPULATION = 10

def main(argv):
  if len(argv) < 2:
    print("usage: clean.py <inputfile> <outputfile>")
    return
  with open(argv[0], encoding="ISO-8859-1") as csv_file:
    data_in = csv.reader(csv_file, delimiter=',')

    cities = []
    line_count = 0
    for row in data_in:
      if line_count == 0:
        line_count += 1
      else:
        d = [row[CITY], row[STATE], row[POPULATION]]
        if len(d) > 2 and d[2].isdigit() and 'county' in d[0].lower() and not 'balance' in d[0].lower():
          cities.append(",".join(d))
        line_count += 1

  with open(argv[1], 'a+') as outfile:
    outfile.write("City,State,Population\n")
    for city in cities:
      outfile.write(city+"\n")

if __name__ == "__main__":
  main(sys.argv[1:])      
