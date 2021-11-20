library(here)
library(tidyverse)
library(jsonlite)

location <- here("experiment3", "timepoint2", "data")
setwd(location)

# read data 
rawData <- read.csv(file="rawresults-exp3b.csv", header=TRUE)

# convert json data to dataframe. 
d <- rawData %>% 
  mutate(json = map(content, ~ fromJSON(.) %>% as.data.frame())) %>% 
  unnest(json) %>% 
  select(-content, -exp)

#make data long
#steps
#1. make character first for this
#2. make data very long 
#3 separate order(trialn) number from type (vignette, or response)
#4 widen out 

d <- d %>% mutate(
  across(V1:yprob10, as.character)
)

d <- d %>% 
  # 1
  pivot_longer(cols = c(V1:yprob10),
               names_to = "trialn",
               values_to = "condition") %>%
  # 2
  extract(trialn, 
           c("type", "trialn"),
           "([a-zA-Z]+)([0-9]*$)"
           ) %>% 
  # 3
  pivot_wider(names_from = "type",
              values_from = "condition")


#rename columns and order columns nicely
d <- d  %>% 
  rename(vignette = "V",
        datetime = "date") %>% 
  relocate(datetime, .after = last_col()) 
  

#write to csv
write_csv(d, "parsedrawresults-exp3b.csv")

