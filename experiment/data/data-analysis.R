library(tidyverse)
library(here)
library(car) 
library(ordinal)
library(MASS)
library(brms)
library(skimr)
library(RColorBrewer)

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

#remove amy's testing data point
amy.testing <- grep("amy", d$postquestion2)
d_amyremoved <- d[-amy.testing,]  
  
#check whether observations fail instruction checks
instr_fail <- d_amyremoved$postquestion1 == "incorrect" | d_amyremoved$dummyVignetteAnswer <= 4

#remove data from main dataset and save for possible later analysis (was a particular question more confusing etc?)
d_removed <- d_amyremoved[instr_fail,]
d_pass <- d_amyremoved[!instr_fail,]

#have a quick view of data
skim(d_pass)
write.csv(d_pass, "ambAvFinalData.csv")
  
#quick graph
ggplot(d_pass, aes(x = vignette, y = vignetteAnswer, fill = vignetteType)) + 
  geom_jitter(width = 0.15, height = 0.10) +
  stat_summary(fun.y=mean, geom="bar", alpha = 0.8) +
  scale_y_continuous(breaks = -3:3, minor_breaks = NULL, limits = (c(-3.5,3.5)))

#####FIT ORDINAL LOGISTIC MIXED EFFECTS MODEL#####
#recode dep variable to ordered factor
d_pass$vignetteAnswer.ordfac <- ordered(d_pass$vignetteAnswer, levels = c("-3", "-2", "-1", "0", "1", "2", "3"))

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


##try post-hoc analysis of just random intercept, is this a better AIC?
olmm.freq.randpred <- clmm(vignetteAnswer ~ 1|vignette, data = d_pass, link = "logit", nAGQ = 10)

## understand and interpret ##
##nopred## 
#think of them as thresholds odds of anything higher to everything lower. 
exp(olm.freq.nopred$zeta)
  #the odds of choosing anything 0+/1-
  1/exp(olm.freq.nopred$zeta)[3]
  
  #the odds of choosing anything 1+/0-
  1/exp(olm.freq.nopred$zeta)[4]
  
  #odds ratio to try to cancel out zero. model says 3.28 times more likely to choose greater than zero than less than zero
  1/exp(olm.freq.nopred$zeta)[4] / 1/exp(olm.freq.nopred$zeta)[3]
  #or maybe think it is the first. 
  exp(olm.freq.nopred$zeta)[4] / 1/exp(olm.freq.nopred$zeta)[3]


##vignetteType pred##
  ci <- confint(olm.freq.GLpred)
  exp(cbind(OR = coef(olm.freq.GLpred), t(ci)))
  
## create dataframe for plot ##
newdat <- data.frame(vignetteType = factor(c("L","G"), levels = c("L", "G")))
newdat <- cbind(newdat, predict(olm.freq.GLpred, newdat, type = "prob"))
newdat
##reshape df
ggdat <- gather(newdat, "AmbAv", "Prob", -vignetteType)
ggdat$AmbAv <- as.numeric(ggdat$AmbAv)

ggplot(ggdat, aes(x = vignetteType, y = Prob, col = AmbAv, group = AmbAv)) + geom_line(lwd = 1) +
  scale_x_discrete(expand = c(.025, 0)) +
  scale_colour_distiller(palette = "RdYlBu") +
  theme_classic()


## summarise the graph ## 0 is L, 1 is G
# probability of choosing 0 is the highest, and is more likely for loss (35%) than gain (32%)
#intestingly, 0 to -3 

##overall effect of gain or loss#
exp(olm.freq.GLpred$coefficients)
 # multiply by For a one unit increase in the regressor GorL (that is for a gain)
 #the odds of observing any category below a certain cutoff vs. observing any category above the same cutoff
 #are multiplied by 1.43 or increased by 43%


##mixed model
# estimate of vignette TypeG very similar, but not significant in this model (just above this). 
# intercepts, as discussed above which are about the where the boundaries in the graph are vary with a std of .378
str(olmm.freq)
olmm.freq$ranef
olmm.freq$condVar

ci <- confint(olmm.freq)
exp(cbind(OR = coef(olmm.freq), ci))

#use clmm2 - gives same results but allows to use predict function. 
olmm2.freq <-  clmm2(vignetteAnswer.ordfac ~ vignetteType, random = vignette, data = d_pass, link = "logistic", nAGQ = 10)
olmm2.freq

##prepare data frame
newdat.mm <- data.frame(vignetteType = factor(rep(c("G","L"), each = 84), levels = c("L", "G")),
                     vignette = factor(rep(order, each = 7), levels = levels(d_pass$vignette)),
                     vignetteAnswer.ordfac = ordered(c("-3", "-2", "-1", "0", "1", "2", "3"), levels = levels(d_pass$vignetteAnswer.ordfac)))

# use model to predict values
newdat.mm <- cbind(newdat.mm, predict(olmm2.freq, newdat.mm, type = "prob"))
newdat.mm
#prepare for graphing
colnames(newdat.mm) <- c("vignetteType", "vignette", "AmbAv", "Prob")
newdat.mm$AmbAv <- as.numeric(newdat.mm$AmbAv)

#graph
ggplot(newdat.mm, aes(x = vignette, y = Prob, col = AmbAv, group = AmbAv)) + geom_line(lwd = 1) +
  scale_x_discrete(expand = c(.025, 0)) +
  scale_colour_distiller(palette = "RdYlBu") +
  theme_classic() 





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

olmm.bayes <- brm(vignetteAnswer ~ (1|vignette), data = d_pass, family = cumulative(link = "logit"), 
                  refresh = 0, open_progress = FALSE) 

##urn analysis -- ###
##filter dataset to contain only urn vignettes
d_pass_urns <- d_pass %>% filter(vignette == "G10" | vignette == "L7")

##plot
ggplot(d_pass_urns, aes(x = vignette, y = vignetteAnswer, fill = vignetteType)) + 
  geom_jitter(width = 0.25, height = 0.10) +
  stat_summary(fun.y=mean, geom="bar", alpha = 0.8) +
  scale_y_continuous(breaks = -3:3, minor_breaks = NULL, limits = (c(-3.10,3.10))) +
  ggtitle("Urn Vignette Responses")

##urn analysis freq##
olm.freq.nopred.urns <-  polr(vignetteAnswer.ordfac ~ 1, data = d_pass_urns,
                              method = "logistic", Hess = TRUE) 
olm.freq.GLpred.urns <-  polr(vignetteAnswer.ordfac ~ vignetteType, data = d_pass_urns,
                              method = "logistic", Hess = TRUE) 

summary(olm.freq.nopred.urns)
summary(olm.freq.GLpred.urns)

exp(olm.freq.nopred.urns$zeta)

##no pred. 
# 0|-1
1/exp(olm.freq.GLpred.urns$zeta[3])

# 1|0
1/exp(olm.freq.GLpred.urns$zeta[4])

# prob of more than zero v less than zero - 4.48 times more likely to choose greater than 7
1/exp(olm.freq.GLpred.urns$zeta[4]) / 1/exp(olm.freq.GLpred.urns$zeta[3])


##GL pred
GorL   <- seq(from=0, to=1, by =1)
xbeta.urn <- GorL*(1.2)
logistic_cdf <- function(x) {
  return( 1/(1+exp(-x) ) )
}

p1 <- logistic_cdf( -3.197 - xbeta.urn )
p2 <- logistic_cdf( -1.696 - xbeta.urn ) - logistic_cdf( -3.197 - xbeta.urn )
p3 <- logistic_cdf( -1.162 - xbeta.urn ) - logistic_cdf( -1.696 - xbeta.urn )
p4 <- logistic_cdf( 0.319 - xbeta.urn ) - logistic_cdf( -1.162 - xbeta.urn )
p5 <- logistic_cdf( 0.895 - xbeta.urn ) - logistic_cdf( 0.319 - xbeta.urn )
p6 <- logistic_cdf( 2.42 - xbeta.urn ) - logistic_cdf( 0.895 - xbeta.urn )
p7 <- 1 - logistic_cdf( 2.242 - xbeta.urn )

plot(GorL, p1, type='l', ylab='Prob', ylim=range( c(0,.35)))
lines(GorL, p2, col='red')
lines(GorL, p3, col='blue')
lines(GorL, p4, col='green')
lines(GorL, p5, col='purple')
lines(GorL, p6, col='pink')
lines(GorL, p7, col='brown')
legend("topleft", lty=1, col=c("black", "red", "blue", "green", "purple", "pink", "brown"), 
       legend=c("-3", "-2", "-1", "0", "1", "2", "3"))

## summarise the graph ## 0 is L, 1 is G
# probability of choosing 2 is the highest, and is more likely for gain (42%) than gain (38%)
#intestingly, 1 to -3 are less likely for loss, more likely for gain, only 2 and 3 were more likely for gain. 

##GL predictor is significant here. 



####exploratory analysis -- Why did some vignetttes (G12, L5, L8, L9 not have amb av)###
#check optional responses
d_pass[d_pass$vignette == "G12",]$postquestion2
d_pass[d_pass$vignette == "L5",]$postquestion2
d_pass[d_pass$vignette == "L8",]$postquestion2
d_pass[d_pass$vignette == "L9",]$postquestion2

