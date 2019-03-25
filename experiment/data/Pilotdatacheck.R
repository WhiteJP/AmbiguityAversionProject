library(tidyverse)
library(here)
library(car)

# set wd
loc <- here("experiment", "data")
setwd(loc)

#download parsed data 
d <- read_csv("parsedrawresults1.csv", col_types = "icffffnnfnfc")
d <- d[,2:12]
glimpse(d)

#recode vignette answer variable using car's handy recode fucntion
d$vignetteAnswer[d$answerOrder == "A"] <- recode(d$vignetteAnswer[d$answerOrder == "A"], "1 = 3;
                                                                                          2 = 2;
                                                                                          3 = 1;
                                                                                          4 = 0;
                                                                                          5 = -1;
                                                                                          6 = -2;
                                                                                          7 = -3")

d$vignetteAnswer[d$answerOrder == "B"] <- recode(d$vignetteAnswer[d$answerOrder == "B"], "1 = -3;
                                                                                          2 = -2;
                                                                                          3 = -1;
                                                                                          4 = 0;
                                                                                          5 = 1;
                                                                                          6 = 2;
                                                                                          7 = 3")
glimpse(d)

#create new column for vignette type + number, reorder data frame
d$vignette <- paste0(d$vignetteType, d$vignetteNumber) %>% factor()
d <- d[, c(1:5, 12, 6:11)]
d

#quick graph
ggplot(d, aes(x = vignette, y = vignetteAnswer, fill = vignetteType)) + geom_bar(stat = "identity") + ylim(c(-3, 3))

