library(tidyverse)
library(here)
library(car) 
library(MCMCglmm)
library(ordinal)

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



#####FIT ORDINAL LOGISTIC MIXED EFFECTS MODEL#####
 #recode dep variable to ordered factor
d$vignetteAnswer<- ordered(d$vignetteAnswer, levels = c("-3", "-2", "-1", "0", "1", "2", "3"))
d$nopred <- 1

  # frequentist - using clmm (cumulative link mixed model) function from ordinal package for mixed models, but 
  #Polr (proportional odds logistic regression) function from MASS when no random effects (clmm doesn't work here)
    olm.freq.nopred <-  polr(vignetteAnswer ~ nopred, data = d, method = "logistic") 
    olm.freq.GLpred <-  polr(vignetteAnswer ~ vignetteType, data = d, method = "logistic") 
    olm.freq.ordpred <- polr(vignetteAnswer ~ answerOrder, data = d, method = "logistic") 
    olmm.freq <-  clmm(vignetteAnswer ~ vignetteType + (1|vignette), data = d, link = "logit", nAGQ = 10)
   
  # Bayesian - using brms package
    olm.bayes.nopred <-  brm(vignetteAnswer ~ nopred, data = d, family = cumulative(link= "logit")) 
    olm.bayes.GLpred <-  brm(vignetteAnswer ~ vignetteType, data = d, family = cumulative(link= "logit")) 
    olm.bayes.ordpred <- brm(vignetteAnswer ~ answerOrder, data = d, family = cumulative(link= "logit")) 
    olmm.bayes <-   brm(vignetteAnswer ~ vignetteType + (1|vignette), data = d, family = cumulative(link= "logit")) 

