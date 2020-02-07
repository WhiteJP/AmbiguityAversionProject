library(here)
location <- here("experiment2", "data")
setwd(location)

# read in turk data from gae export
rawData <- read.csv(file="rawresultsexp2.csv", header=TRUE)

source('JSON_parser_function.R')
# this takes 10+ minutes
d <- parseJSONlist(rawData[,1])
write.csv(d,file="parsedrawresultsexp2.csv")



