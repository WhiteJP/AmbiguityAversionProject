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
#1. make data very long
#2 separate order(trialn) number from type (vignette, or response)
#3 widen out 

d <- d %>% 
  # 1
  pivot_longer(cols = c(V1:V10, A1:A10),
               names_to = "trialn",
               values_to = "condition") %>%
  # 2
  extract(trialn, 
           c("type", "trialn"),
           "([\\^V|\\^A])([0-9]*$)"
           ) %>% 
  # 3
  pivot_wider(names_from = "type",
              values_from = "condition")


#rename columns and separate response order from vignette
d <- d %>% 
  extract(V,
          c("vignette", "resp_order"), 
          "([\\^G|\\^L][0-9]*)(A$|B$)",
          ) %>% 
  rename(response = "A",
         datetime = "date")

#order columns nicely
d <- d %>% 
  relocate(datetime, .after = last_col()) %>% #dtm last
  relocate(response, .after = vignette)
  

#write to csv
write_csv(d, "exp3b-data.csv")

#read this later
dp <- read_csv("parsedrawresults-exp3b.csv",
               col_types = "cfddfddfdfT")
