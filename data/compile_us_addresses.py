#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import csv

def main(argv):
  if len(argv) < 2:
    print("usage: compile_us_addresses.py <inputfile> [, ...] <outputfile>")
    return
  number_input_files = len(argv)-1
  cities = set()
  for i in range(number_input_files):
    with open(argv[i]) as csv_file:
      data_in = csv.reader(csv_file, delimiter='\n')
      line_count = 0
      for row in data_in:
        if line_count == 0:
          line_count += 1
        else:
          cities.add(row[0])
          line_count += 1

  with open(argv[number_input_files], 'a+') as outfile:
    outfile.write("City,State\n")
    for addr in cities:
      outfile.write(addr+"\n")

if __name__ == "__main__":
  main(sys.argv[1:])      