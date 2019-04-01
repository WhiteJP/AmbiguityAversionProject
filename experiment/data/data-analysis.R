library(tidyverse)
library(here)
library(car) 
library(ordinal)
library(MASS)
library(brms)
library(skimr)

set.seed(1298)

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

###create new variable for vignette type + number -- vignette###
  # order levels of factor for easy graphing
  order <- c(sprintf("G%d", seq(1:12)), sprintf("L%d", seq(1:12))) 
  d$vignette <- paste0(d$vignetteType, d$vignetteNumber) %>% factor(levels = order)

  #reorder data frame
  d <- d[, c(1:5, 12, 6:11)]

#check whether observations fail instruction checks
instr_fail <- d$postquestion1 == "incorrect" | d$dummyVignetteAnswer <= 4

#remove data from main dataset and save for possible later analysis (was a particular question more confusing etc?)
d_removed <- d[instr_fail,]
d_pass <- d[!instr_fail,]

#have a quick view of data
skim(d_pass)
  
#quick graph
ggplot(d_pass, aes(x = vignette, y = vignetteAnswer, fill = vignetteType)) + 
  geom_jitter(width = 0.15, height = 0.15) +
  stat_summary(fun.y=mean, geom="bar") +
  ylim(c(-3.5, 3.5))



#####FIT ORDINAL LOGISTIC MIXED EFFECTS MODEL#####
#recode dep variable to ordered factor
d_pass$vignetteAnswer<- ordered(d_pass$vignetteAnswer, levels = c("-3", "-2", "-1", "0", "1", "2", "3"))

# frequentist - using clmm (cumulative link mixed model) function from ordinal package for mixed models, but 
#Polr (proportional odds logistic regression) function from MASS when no random effects (clmm doesn't work here)
olm.freq.nopred <-  polr(vignetteAnswer ~ 1, data = d_pass, method = "logistic", Hess = TRUE) 
olm.freq.GLpred <-  polr(vignetteAnswer ~ vignetteType, data = d_pass, method = "logistic", Hess = TRUE) 
olm.freq.ordpred <- polr(vignetteAnswer ~ answerOrder, data = d_pass, method = "logistic", Hess = TRUE) 
olmm.freq <-  clmm(vignetteAnswer ~ vignetteType + (1|vignette), data = d_pass, link = "logit", nAGQ = 10) #values between 5 and 10 generally provide accurate maximum likelihood estimates -- documentation

summary(olm.freq.nopred)
summary(olm.freq.GLpred)
summary(olm.freq.ordpred)
summary(olmm.freq)

# Bayesian - using brms package
olm.bayes.nopred <-  brm(vignetteAnswer ~ 1, data = d_pass, family = cumulative(link = "logit"), 
                         refresh = 0, open_progress = FALSE)  #to suppress progress printing to screen for .Rmd
olm.bayes.GLpred <-  brm(vignetteAnswer ~ vignetteType, data = d_pass, family = cumulative(link = "logit"), 
                         refresh = 0, open_progress = FALSE) 
olm.bayes.ordpred <- brm(vignetteAnswer ~ answerOrder, data = d_pass, family = cumulative(link = "logit"), 
                         refresh = 0, open_progress = FALSE) 
olmm.bayes <- brm(vignetteAnswer ~ vignetteType + (1|vignette), data = d_pass, family = cumulative(link = "logit"), 
                  refresh = 0, open_progress = FALSE) 

summary(olm.bayes.nopred)
summary(olm.bayes.GLpred)
summary(olm.bayes.ordpred)
summary(olmm.bayes)