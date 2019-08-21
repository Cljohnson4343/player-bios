#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import json

states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]

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
  if len(argv) < 2:
    print("usage: address_extraction.py <inputfile> <outputfile>")
    return
  with open(argv[0]) as json_file:
    data_in = json.load(json_file)

    with open(argv[1], 'a+') as outfile:
      outfile.write("City,State\n")
      cities = set()
      for player in data_in:
        home = getCityState(player["hometown"])
        if (isInUSA(home["state"])):
          cities.add('{},{}'.format(home["city"], home["state"]))

      for addr in cities:
        outfile.write(addr+"\n")

if __name__ == "__main__":
  main(sys.argv[1:])      