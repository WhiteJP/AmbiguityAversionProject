# Experiment 2 Preregistration Draft

### 1. Have any data been collected for this study already?

No, no data have been collected for this study yet.

### 2. What's the main question being asked or hypothesis being tested in this study?

This experiment is a follow up to our previous experiment (AsPredicted Submission #20731, 'Ambiguity Aversion: A Vignette Study -- University of Melbourne 2019'). 

The aim of the present experiment includes the 2 aims mentioned for experiment 1. However, we seek to add:  
    
3.  Can the degree of ambiguity aversion shown in relation to life-like vignettes which involve qualitative gains and losses be predicted by the prior probabilities participants assign to the vignette outcomes under ambiguity. 

Hypothesis: There will be less ambiguity aversion (and possibly even ambiguity seeking) for vignettes in which participants assign greater prior probability under ambiguity to the more positive outcome (whether this be a neutral outcome in comparison to a loss, or a gain in comparison to a neutral outcome) than to the more negative outcome. 

### 3. Describe the key dependent variable(s) specifying how they will be measured.

The key dependent variable, ambiguity aversion, has already been measured in our previous experiment (see AsPredicted Submission #20731 for details) so that +3 = strong preference for risk over ambiguity, 0 = indifference, -3 = strong preference for ambiguity over risk. This variable was collected in relation to 24 different vignettes. In this experiment, the dependent variable will be the arithmetic mean of this Ambiguity Aversion variable for each of these 24 vignettes (meanAA). 

In this experiment we will be collecting people's estimates of the prior probabilities they assign to each of two outcomes in each of these vignettes. To collect this information, participants will be shown the exact same vignettes as in experiment 1. In each of these vignettes, there are two outcomes. Participants will be advised that one (but not both) of these outcomes must occur but the exact probabilities are unknown. Participants will then be asked to guess what the probabilities of these outcomes are. Participants will assign a whole percentage value (from 0% to 100%) to each of these outcomes. Participants responses will be forced to add to 100% in real time. 

This information will be recoded as just one variable: odds ratio of favourable outcome compared to unfavourable outcome. This variable will simply be computed as:

<center> ORfav = P(favourable outcome) / P(unfavourable outcome) </center>

For each vignette, the mean of all participant's odds ratios will be used as an Independent variable in this study (meanORfav). 

### 4. How many and which conditions will participants be assigned to?

Participants will be randomly assigned to 1 of 24 vignettes, half of
which are 'gain' scenarios and half of which are 'loss' scenarios (vignetteType). 

### 5. Specify exactly which analyses you will conduct to examine the main question/hypothesis.

We will conduct the following Frequentist statistical analyses:

We will run the following OLS Multiple linear regressions at the group level (i.e. each data point corresponds to each of the 24 vignettes):

1. meanAA ~ 1
2. meanAA ~ vignetteType 
3. meanAA ~ meanORfav + vignetteType 
4. meanAA ~ meanORfav + vignetteType + meanOR*vignetteType

AIC comparisons will be made to see whether each added parameter improves the model. 

We will also conduct Bayesian analogues to the above analysis. 


[IDEA -- could maybe run a Spearman's correlation analysis between meanAA and meanAAfav --- this could help the possible problem that we are taking the mean of an ordinal variable and using that as our main DV with ordinary regression. ??? ]

### 6. Any secondary analyses?

In addition to the main variables being collected (discussed above) we are also collecting a confidence variable. Here, participants will answer on a Likert scale from 1 = "Not at all confident" to 5 = "Extremely confident" how confident they are in their assigned probabilities. Further post-hoc analyses involving this variable may be undertaken. This variable may be used as a broad proxy for the uncertainty surrounding their prior-probability point estimates, to allow for estimation of their whole prior distributions rather than mere point-estimates. 

We may also undertake further post-hoc analysis in relation to our data, but will clearly indicate that these are post hoc and exploratory.


### 7. How many observations will be collected or what will determine sample size?

We will run the experiment on 1200 people on Amazon Mechanical Turk who
have been pre-screened for English language ability via the Adelaide
Basic Qualification. A sample size of 1200 should average about 50
responses per vignette, although since allocation is random exact
numbers are not
guaranteed.

### 8. Anything else you would like to pre-register? (e.g., secondary analyses, variables collected for exploratory purposes, unusual analyses planned?)

There are two exclusion criteria:

1.  Before being presented with the vignette of interest, participants will be presented a 'dummy' vignette. In this dummy vignette, situation A is much more likely than situation B.  Participants will be given the same sliding scale to make their response as in the actual vignettes, which indicate how likely they believe each situation is. Participants that assign a probability for situation A that is 50% or less will be excluded on the grounds that they have failed to understand the task or are not paying attention. The vignette is shown below.

You are planning on attending an outdoor, uncovered event this afternoon and you are interested in knowing whether it will rain. The weather forecast from multiple sources says that it is very likely to rain. Further, you look out the window and see heavy, dark, threatening rain clouds overhead. Both of these pieces of information lead you to believe that it is much more likely to rain than it is not to rain. 

If you had to guess, what is the probability that it will rain and that it will not rain?

2.  Secondly, following completion of the vignette of interest,
    participants will be asked the question, "what was the last question
    about"? Participants will be given a forced choice response, of
    which three answers are clearly incorrect, and one of which is
    clearly correct. Participants who get this questions incorrect will
    be excluded on the grounds that they failed to read the vignette
    carefully enough.
