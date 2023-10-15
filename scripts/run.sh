#!/bin/bash

# check if the number of arguments is correct
if [ $# -ne 2 ]; then
  echo "Error: Invalid number of arguments. Usage: bun solution <year> <day>"
  exit 1
fi

# store the year and day in separate variables
year=$1
day=$2

# Check if the day is valid
if [ $day -lt 1 -o $day -gt 25 ]; then
  echo "Error: Invalid day. Day must be between 1 and 25 (inclusive)."
  exit 1
fi

# Check if the year is valid
if [ $year -lt 2015 -o $year -gt $(date +%Y) ]; then
  echo "Error: Invalid year. Year must be between 2015 and $(date +%Y)."
  exit 1
fi

# Check if the file exists
if test -f "years/$year/day-$day/index.ts"; then
  # If the file exists, run it
  bun --watch run years/$year/day-$day/index.ts
else
  # If the file does not exist, echo a message
  echo "Error: year or day not found."
fi
