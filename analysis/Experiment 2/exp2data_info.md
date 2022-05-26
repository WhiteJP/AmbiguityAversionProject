# Data information

`exp2-data.csv` contains the data underlying the second experiment of the paper, 'Ambiguity aversion in qualitative contexts: the Role of Priors'. 

For more information on the data and the experimental paradigm leading to its collection please see the paper. 

## Variables

`subject` -- random ID generated for each participant. 

`condition` -- the condition each participant was assigned to.

`vignettType` -- Whether the vignette presented to the participant was a 'gain' vignette or a 'loss' vignette

`vignetteNumber` --  The number of the vignette, from 1 to 12. 

`Start100` -- Variable indicating for which outcome, x or y, the slider bar started at 100%. coded as 'x' or 'y'.  

`vignette` --  Combination of vignetteType and vignetteNumber fom G1-G12 and L1-L12. This variable uniquely codes each unique vignette. 

`dummyConfidence` -- Participant confidence rating for the dummy vignette / comprehension check. Coded as 0 = 'Not at all confident' to 4 = "Extremely condifent'.  

`dummyXprob` -- Probability participant assigned to outcome X occuring (0-100) for the dummy vignette / comprehension check.

`dummyYprob` -- Probability participant assigned to outcome Y occuring (0-100) for the dummy vignette / comprehension check.

`vignetteConfidence` -- Participant confidence rating for their randomly assigned vignette. Coded as 0 = 'Not at all confident' to 4 = "Extremely condifent'.  

`vignetteXprob` -- Probability participant assigned to outcome X occuring (0-100) for their randomly assigned vignette.

`vignetteYprob` -- Probability participant assigned to outcome Y occuring (0-100) for their randomly assigned vignette.

`gender` –- Self-reported gender. Coded as 'male', 'female', 'other', 'na' = 'prefer not to say'. 

`age` –- Self-reported age in years.

`postQuestion1` –- Whether participants answered the attention check question correctly. Coded as "correct" or "incorrect".

`postQuestion2` –- (Optional) Participant responses to free text question, 'Why did you choose the answer you did? What were you thinking when you made that answer?'

