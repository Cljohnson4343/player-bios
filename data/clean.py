#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import sys

def hasDOB(player):
  if player["born"] == '--' or player["born"] == '':
    return False

  return True

def hasHometown(player):
  if player["hometown"] == '--' or player["hometown"] == '':
    return False

  return True

def hasDOBorHometown(player):
    if hasDOB(player) or hasHometown(player):
      return True
    
    return False

def main(argv):
  if len(argv) < 2:
    print("usage: clean.py <inputfile> <outputfile>")
    return
  with open(argv[0]) as json_file:
    data_in = json.load(json_file)
    data_out = [ x for x in data_in if hasDOBorHometown(x) ]

    with open(argv[1], 'a+') as outfile:
      json.dump(data_out, outfile)

if __name__ == "__main__":
  main(sys.argv[1:])      
