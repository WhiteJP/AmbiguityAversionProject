setwd("/Users/amy/Documents/research/projects/black-swan/experiment/data/")

# read in turk data from gae export
rawData <- read.csv(file="rawresultsexpt4.csv", header=TRUE)

source('JSON_parser_function.R')
# this takes 10+ minutes
d <- parseJSONlist(rawData[,1])
write.csv(d,file="parsedresultsexpt4.csv")



