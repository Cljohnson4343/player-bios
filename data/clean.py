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

def format(str):
  if int(str) < 10:
    return f'0{str}'
  return str

def formatPlayer(player):
  player = formatDate(player)
  if hasDOB(player) == False:
    del player["born"]
  if hasHometown(player) == False:
    del player["born"]

  return player

def formatDate(player):
  if hasDOB(player):
    splt = player["born"].split("/")
    player["born"] = f'{splt[2]}-{format(splt[0])}-{format(splt[1])}T00:00:00Z'

  return player

def main(argv):
  if len(argv) < 2:
    print("usage: clean.py <inputfile> <outputfile>")
    return
  with open(argv[0]) as json_file:
    data_in = json.load(json_file)
    data_out = [ formatPlayer(x) for x in data_in if hasDOBorHometown(x) ]

    with open(argv[1], 'a+') as outfile:
      json.dump(data_out, outfile)

if __name__ == "__main__":
  main(sys.argv[1:])      
