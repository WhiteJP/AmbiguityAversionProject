# Data information

`exp1-data.csv` contains the data underlying the first experiment of the paper, 'Ambiguity aversion in qualitative contexts: The Role of Priors'. 

For more information on the data and the experimental paradigm leading to its collection please see the paper. 

## Variables

`subject` -- random ID generated for each participant. 

`condition` -- the condition each participant was assigned to.

`vignetteType` -- Whether the vignette presented to the participant was a 'gain' vignette or a 'loss' vignette

`vignetteNumber` --	The number of the vignette, from 1 to 12. 

`vignette` --  Combination of vignetteType and vignetteNumber fom G1-G12 and L1-L12. This variable uniquely codes each unique vignette. 

`answerOrder` -- The label and order that the risky and ambiguous options were presented. Coded as A = 'Risky' option labelled A and appeared first and vice versa for 'ambiguous 'option, B = 'Ambiguous' option labelled A and appeared first and vice versa for 'risky' option.

`dummyVignetteAnswer` -- Participant responses to the dummy vignette. 1 = Strongly prefer situation A, 4 = Indifferent, 7 = Strongly  prefer situation B. 

`vignetteAnswer` -- Participant responses to the  vignette. 1 = strongly prefer situation A, 4 = indifferent, 7 = strongly prefer situation B.

`gender` –- Self-reported gender. Coded as 'male', 'female', 'other', 'na' = 'prefer not to say'. 

`age` –- Self-reported age in years.

`postQuestion1` –- Whether participants answered the attention check question correctly. Coded as "correct" or "incorrect".

`postQuestion2` –- (Optional) Participant responses to free text question, 'Why did you choose the answer you did? What were you thinking when you made that answer?'

