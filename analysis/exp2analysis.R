#load packages
library(here)
library(tidyverse)



# import data
loc <- here("analysis")
setwd(loc)
data <- read_csv("parsedrawresultsexp2.csv", col_types = "icffffiiiiiififc")
data <- data[,2:ncol(data)]
data

## mutate to get Oddsfav for each participant
data <- data %>% mutate(oddsFav = vignetteXprob/vignetteYprob)

# Y is favourable outcome in Loss vignettes, so take inverse
data$oddsFav[data$vignetteType == "L"] <- 1/data$oddsFav[data$vignetteType == "L"] 


## exclude participants

# first remove amy's testing data point
amy.testing <- grep("amy", d$postquestion2)
d_amyremoved <- d[-amy.testing,]

#check whether observations fail instruction checks
instr_fail <- d_amyremoved$postquestion1 == "incorrect" | d_amyremoved$dummyXprob <= 50

#remove data from main dataset and save for possible later analysis (was a particular question more confusing etc?)
d_removed <- d_amyremoved[instr_fail,]
d_pass <- d_amyremoved[!instr_fail,]

d_removed

### Get Final Data for Analysis ###

#load previous data
load("exp1d.Rda")
meanAAdata <- exp1d %>% group_by(vignetteType, vignetteNumber) %>% summarise(meanAA = mean(vignetteAnswer))


## summarise data to get mean Odds and meanCR
d <- data %>% group_by(vignetteType, vignetteNumber) %>% summarise(meanOddsFav = mean(oddsFav),
                                                              meanCR = mean(vignetteConfidence))

d <- left_join(d, meanAAdata, by = c("vignetteType", "vignetteNumber"))

order <- c(sprintf("G%d", seq(1:12)), sprintf("L%d", seq(1:12))) 
d$vignette <- paste0(d$vignetteType, d$vignetteNumber) %>% factor(levels = order)
d <- d[c(6, 1, 3:5)]

## Analysis ##

mods <- list()

#models for odds
mods[[1]] <- lm(meanAA ~ 1)
mods[[2]] <- lm(meanAA ~ vignetteType + 1)
mods[[3]] <- lm(meanAA ~ meanOddsfav + vignetteType + 1)
mods[[4]] <- lm(meanAA ~ meanOddsfav*vignetteType + 1)

#models for odds
mods[[5]] <- lm(meanAA ~ 1)
mods[[6]] <- lm(meanAA ~ meanCR + vignetteType + 1)
mods[[7]] <- lm(meanAA ~ meanCR*vignetteType + 1)


AICs <- map_dbl(mods, AIC)
BICs <- map_dbl(mods, BIC)
AICw <- map_dbl(mods, AIC)
BICw <- map_dbl(mods, AIC)

