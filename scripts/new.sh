#!/bin/bash

# check if the number of arguments is correct
if [ $# -ne 2 ]; then
  echo "Error: Invalid number of arguments. Usage: yarn new <year> <day>"
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

# copy the template folder
cp -r template "day-$day"

# move the copied folder to the specified year
mv "day-$day" "years/$year/"
