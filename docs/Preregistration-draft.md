# Pre-registration draft

### 1. What's the main question being asked or hypothesis being tested in this study?

The aim of the present research is to ascertain whether ambiguity aversion arises in qualitative 'real-world' situations as opposed to the strictly quantitative, economic games/bets paradigms that are ordinarily used in the ambiguity aversion literature. Our main questions are:

1. Will ambiguity aversion be present when participants are presented with life-like vignettes which involve qualitative gains and losses in a variety of different every-day, qualitative contexts? Hypothesis: the degree of ambiguity version will vary depending on the scenario; it will not always or even most of the time be present 

2. Will there be differences in the degree of ambiguity aversion observed in response to the vignettes which involve losses and those which involve gains? Hypothesis: on balance, yes, there will be greater ambiguity aversion for gains scenarios than for loss scenarios. 

### 2. Describe the key dependent variable(s) specifying how they will be measured.

The key dependant variable is ambiguity aversion, that is, participant preference for risk over ambiguity. To measure this, participants will be shown a life-like vignette, and will be asked which of two possibilities corresponds to the situation they would prefer to be in. One of these possibilities will be characterised by risk (i.e. mathematically specified probability in which there is 50% chance of one outcome and 50% of the other, which we denote R), the other by ambiguity (uncertainty without mathematically specified probability, in which it is noted that one of the two outcomes will occur but the probabilities are unknown, which we denote A). 

Participant preferences will be measured on a 7 point Likert scale as follows:

1. Definitely would rather be in R
2. Probably would rather be in R
3. Slightly would rather be in R
4. No preference
5. Slightly would rather be in A
6. Probably would rather be in A
7. Definitely would rather be in A

This will then be recoded so that 1 = +3 = strong preference for risk over ambiguity, 4 = 0 = indifference, 7 = -3 = strong preference for ambiguity over risk.

### 3. How many and which conditions will participants be assigned to?

Participants will be randomly assigned to 1 of 24 vignettes, half of which are 'gain' scenarios and half of which are 'loss' scenarios. The order of the two possibilities (R and A) will also be randomised. Two of these 24 vignettes are constructed to be about urns as in the classical ambiguity aversion task.

### 4. Specify exactly which analyses you will conduct to examine the main question/hypothesis.

We will conduct both Bayesian and the analogous Frequentist statistical analyses.

We will run an ordinal logistic mixed effects regression (and Bayesian ordinal mixed effects regression) on our recoded dependent variable (see above). We will compare three models:
    (a) No predictors. Question is whether the intercept (with CI) is different from zero. If so, it suggests the presence of ambiguity aversion (if in the direction of R) or ambiguity preference (if in the direction of A) on aggregate.
    (b) Predictor including a main effect of condition. If this is preferred over (a) in AIC this suggests that people are systematically acting differently whether it's a gain or a loss.
    (c) Predictor including a main effect of order of the option. If this is preferred over (a) in AIC this suggests that people are systematically choosing either the first or the second option presented, regardless of its content. We do not expect this to happen; this is just a precautionary check.
    (d) Predictor including a main effect of condition plus a random intercept of question. If this is preferred over (b) in AIC this suggests that there is substantial variation in responses as a function of the situation/vignette.
    (e) Analyses (a) and (b) where the predictor is the Likert rating for only the two vignette questions involving urns. The purpose for this is to determine whether we successfully replicate the existing effect.


### 5. Any secondary analyses?

Depending on the results of the above we may undertake further post hoc analysis, but will clearly indicate that these are post hoc and exploratory.

### 6. How many observations will be collected or what will determine sample size?

We will run the experiment on 1200 people on Amazon Mechanical Turk who have been pre-screened for English language ability via the Adelaide Basic Qualification. A sample size of 1200 should average about 50 responses per vignette, although since allocation is random exact numbers are not guaranteed. 

### 7. Anything else you would like to pre-register? (e.g., data exclusions, variables collected for exploratory purposes, unusual analyses planned?)

There are two exclusion criteria: 

1. Before being presented with the vignette of interest, participants will be presented a 'dummy' vignette. In this dummy vignette, option B is clearly preferable to option A. Participants will be given the same Likert scale as for the vignette of interest. Participants that do not choose that they definitely, probably or slightly prefer B will be excluded on the grounds that they have failed to understand the task or are not paying attention. The vignette is shown below.

You are on holidays when you hear news that the river near your home town has experienced serious flooding. Which of the following situations would you rather be in? 

A. Your house is close to the river. 
B. Your house is far from the river on a hill. 


2. Secondly, following completion of the vignette of interest, participants will be asked the question, "what was the last question about"? Participants will be given a forced choice response, of which three answers are clearly incorrect, and one of which is clearly correct. Participants who get this questions incorrect will be excluded on the grounds that they failed to read the vignette carefully enough. 

### 8. Have any data been collected for this study already?

No, no data have been collected for this study yet.

