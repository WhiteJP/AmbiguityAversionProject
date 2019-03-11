# Pre-registration draft

### 1. What's the main question being asked or hypothesis being tested in this study?

The aim of the present research is to ascertain whether ambiguity aversion arises in qualitative 'real-world' situations as opposed to the strictly quantitative, economic games/bets paradigms that are ordinarily used in the ambiguity aversion literature. Our main questions are:

1. Will ambiguity aversion be present when participants are presented with life-like vignettes which involve qualitative gains and losses in a variety of different every-day, qualitative contexts? Hypothesis: no 

2. Will there be differences in the degree of ambiguity aversion observed in response to the vignettes which involve losses and those which involve gains? Hypothesis: yes, there will be greater ambiguity aversion for gains scenarios than for loss scenarios. 

### 2. Describe the key dependent variable(s) specifying how they will be measured.

The key dependant variable is participant preference for ambiguity over risk, or vice versa. To measure this, participants will be shown a life-like vignette, followed by two different possibilities for what the underlying situation in the vignette is (A and B). One of these possibilities will be characterised by risk (i.e. mathematically specified probability), the other by ambiguity (uncertainty without mathematically specified probability). This will be measured on a 7 point Likert scale as follows:

1. Definitely prefer risk situation, 
2. Probably prefer risk situation,
3. slightly prefer risk situation,
4. no preference,
5. slightly prefer ambiguous situation,
6. probably prefer ambiguous situation,
7. definitely prefer ambiguous situation. 

This will then be recoded so that +3 = strong preference for risk over ambiguity, 0 = indifference, -3 = strong preference for ambiguity over risk.

[JPW note: I think we may need to change the wording of our Likert scale. Currently the different options don't get to the strength or degree of the participants' preference, but rather the epistemic certainty thereof. I think we should we consider using "strongly prefer", "moderately prefer", and "mildly prefer." But maybe I am grasping at straws here.]

### 3. How many and which conditions will participants be assigned to?

Participants will be randomly assigned to 1 of 24 vignettes, half of which are 'gain' scenarios and half of which are 'loss' scenarios. The order of the two possibilities of the underlying situation of the vignette (A and B) will also be randomised. 

### 4. Specify exactly which analyses you will conduct to examine the main question/hypothesis.

We will conduct both Bayesian and Frequentist statistics in relation to our hypothesis. 

#### 1. Bayesian Analyses

We will run an ordinal logistic mixed effects regression on our recoded dependent variable (see above). We will compare three models:
    A. No predictors. Question is whether the intercept (with CI) is different from zero. If so, it suggests the presence of ambiguity aversion (if in the direction of A) or ambiguity preference (if in the direction of B) on aggregate.
    B. Predictor including a main effect of condition. If this is preferred over (a) in AIC this suggests that people are systematically acting differently whether it's a gain or a loss.
    c. Predictor including a main effect of condition plus a random intercept of question. If this is preferred over (b) in AIC this suggests that there is substantial variation in responses as a function of the situation/vignette.


#### Frequentist Analyses

[JPW: I didn't get your thoughts on exactly what frequentist stats we will do, will we do the exact same things as for the Bayesian stats except with their corresponding frequentist version? Is it worth also doing more traditional/simple/boring frequentist analysis, like a 2-way ANOVA with Gain/Loss and vignette number as our two variables (or 3-way ANOVA if we include the order of the options too)?]

### 5. Any secondary analyses?

1. We will do analyses 1A and 1B above but just for two of our vignettes which replicate the common "urn paradigm" found in the ambiguity aversion literature: one which is a gain scenario and one which is a loss scenario. This will be done to see if the general ambiguity aversion phenomenon replicates when it is presented as this kind of vignette.

2. We will also run a t-test (both Bayesian and frequentist) to compare whether the order of the two possibilities presented to participants affects their responses.  

3. We also may undertake further exploratory analysis, but will clearly indicate when this is done.

[JPW: I suspect that we will include the urn questions in the main analyses too, or will they always be considered separately?]

### 6. How many observations will be collected or what will determine sample size?

We will collect 40-50 observations per vignette, meaning our total sample will be 960-1200. 

[JPW note: DO we need to justify how we came to this number? Should we be more specific with the numbers to reduce researcher degrees of freedom? Although this would probably require recoding parts of the experiment, because currently there is no mechanism that will ensure that there is the same number per condition]

### 7. Anything else you would like to pre-register? (e.g., data exclusions, variables collected for exploratory purposes, unusual analyses planned?)

There are two exclusion criteria: 

1. Before being presented with the vignette of interest, participants will be presented a 'dummy' vignette. In this dummy vignette, option B is clearly preferable to option A. Participants will be given the same Likert scale as for the vignette of interest. Participants that do not choose that they definitely, probably or slightly prefer B will be excluded. 

2. Secondly, following completion of the vignette of interest, participants will be asked the question, "what was the last question about"? Participants will be given a forced choice response, of which three answers are clearly incorrect, and one of which is clearly correct. Participants who get this questions incorrect will be excluded. 

### 8. Have any data been collected for this study already?

No, no data have been collected for this study yet.

