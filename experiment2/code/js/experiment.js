var subjectID = ""; s1 = ""; s2 = "";
var gainorloss = "";
var condition = "";
var exp_data = {};
var demographics = [];
var start100 = "";
var dummystart100 = "";
var vignetteNumber = "";
var vignetteAnswer = [];
var dummyVignetteAnswer = [];
var postQuestionsAnswers = [];
var correctpostquestionanswer = "";
var pqalist = {"G1":'It was about stocks, one of which was about to skyrocket in value.',
              "G2": 'You were unemployed and considering two job offers.',
              "G3": 'You had been offered a promotion at work with your choice of department.',
              "G4": 'It was about a romantic interest in a friend of yours.',
              "G5": 'You were a competitive runner considering the use of new training protocols.',
              "G6": 'It was about two parties, one of which your crush was attending.',
              "G7": 'You were buying a house and an amazing school had been planned for one of the neigbourhoods you were interesed in.',
              "G8": "You were on a blind date and there were two people who matched your date's description.",
              "G9": 'Your child was extremely talented in two endeavours, one of which was to receive a generous scholarship in the coming years.',
              "G10": 'You were about to randomly select a ball from an urn, with the chance to win $1000.',
              "G11": 'It was about trying to spot a wild bird while on vacation.',
              "G12": 'You were a student with upcoming exams considering study drugs.',
              "L1": 'It was about stocks, one of which was about to plummet in value.',
              "L2": 'You were bitten by a snake, but were unsure of which species.',
              "L3": 'You had an insect infestation in your house but you were unsure which insect species.',
              "L4": 'It was about a computer virus you had gotten.',
              "L5": 'You had acquired a pathogen, but were unsure which variant.',
              "L6": 'You were on a blind date and there were two people who matched your dates description.',
              "L7": 'You were about to randomly select a ball from an urn, with the chance to lose $1000.',
              "L8": 'You had left your car in an uncovered carpark, and a hailstorm threatened to damage it.',
              "L9": 'You were the five-term mayor of a city about to discuss your prospects for re-election.',
              "L10": 'You were a bank employee moving to a new city who was offered a transfer to either of two branches.',
              "L11": 'Your child was extremely talented in two endeavours, one of which was about to be discontinued at their school.',
              "L12": 'You had been offered a promotion at work with your choice of department.'
};
var decoy1 = "You were planning your upcoming holiday, deciding which of two destinations to go to.";
var decoy2 = "It was about a national sports event, and a bet you had placed on it.";
var decoy3 = "You had been experiencing back pain, and your doctor had advised you that it had two possible causes.";

// ********** START: this function runs automatically when the page is loaded
$(document).ready(function () {
    
    hideElements();
    s1 = Math.random().toString(36).replace('0.', '').substring(0,4);
    s1 = s1.concat("35");
    s2 = "yz";
    s2 = s2.concat(Math.random().toString(36).replace('0.', '').substring(0,3));
    subjectID = s1.concat(s2);
    var a = Math.floor(Math.random() * 2);
    var b = Math.floor(Math.random() * 2);
    startx = 0;
    starty = 0;
    vignetteNumber = Math.floor((Math.random() * 12) + 1);
        if (a===0) {
            gainorloss = 'G';
        } else {
            gainorloss = 'L';
        } 
        
        if (b===0) {
            start100 = 'x';
            startx = 100;
        } else {
            start100 = 'y';
            starty = 100;
        } 
        
    condition = gainorloss + vignetteNumber + start100;
    correctpostquestionanswer = pqalist[gainorloss + vignetteNumber];
    showDemographics();
});


// ********** SHOWDEMOGRAPHICS: get demographic details
function showDemographics() {
    
    hideElements();
    $('#demographics').show();
    $('#demographics').load('html/demographics.html');
    $('#next').show();
    $('#next').click(validateDemographics);
}


// ********** VALIDATEDEMOGRAPHICS: check to make sure demographic information is all okay
function validateDemographics() {
  
    demographics = $('#demo').serializeArray();
    var ok = true;
  
    for (var i = 0; i < demographics.length; i++) {
        // validate age
        if ((demographics[i].name == "age") && (/[^0-9]/.test(demographics[i].value)) || demographics[i].value < 18 || demographics[i].value > 100) {
            alert('Please only use numbers from 18 to 100 in age.');
            ok = false;
            break;
        }
        
        // test for empty answers
        if (demographics[i].value === "") {
            alert('Please fill out all fields.');
            ok = false;
            break;
        } 
    
    }
    
    if (!$("input[name='gender']:checked").val()) {
          alert('Please fill out all fields.');
          ok = false;
        }
    

    // goes to next section
    if (!ok) {
        showDemographics();
    } else {   
        showPlainLanguageStatement();
    }
}


// ********** SHOWPLAINLANGUAGESTATEMENT: displays plain language statement
function showPlainLanguageStatement() {

    hideElements();
    $('#instructions').show();
    $('#instructions').load('html/pls.html');
    $('#next').show();
    $('#next').click(showConsent);
}


// ********** SHOWCONSENT: displays consent form
function showConsent() {

    hideElements();
    $('#instructions').show();
    $('#instructions').load('html/consent.html');
    $('#next').show();
    $('#next').click(showInstructions);
}

// ********** SHOWINSTRUCTIONS: gives some introductory information 
function showInstructions() {
  
    hideElements();
    $('#instructions').show();
    $('#instructions').load('html/instructions.html');
    $('#next').show();
    $('#next').click(showInstructionChecks);
}

// ********** SHOWINSTRUCTIONCHECKS: asks the questions confirming they have read the instructions
function showInstructionChecks() {
  
    hideElements();
    $('#instructions').show();
    $('#instructions').load('html/instructionchecks.html');    
    $('#next').show();
    $('#next').click(validateInstructionChecks);
}


// ********** VALIDATEINSTRUCTIONCHECKS: makes sure they understood the instructions 
function validateInstructionChecks() {
  
    instructionChecks = $('#instr').serializeArray();

    var ok = true;
    var allanswers = true;
    if (instructionChecks.length < 2) {
      alert('Please complete all questions.');
      allanswers = false;
 
      
    } else {
      allanswers = true;
      for (var i = 0; i < instructionChecks.length; i++) {
        // check for incorrect responses
        if(instructionChecks[i].value === "incorrect") {
            alert('At least one answer was incorrect; please read the instructions and try again.');
            ok = false;
            break;
        }
      }
    }
    
    
    // goes to next section
    if (!allanswers) {
        showInstructionCheck;
    } else if(!ok) {
        showInstructions(); 
    } else {
        hideElements();
        showDummyVignette(); 
    }
}

// ********** SHOWDUMMYVIGNETTE: Takes participant to dummy vignette
function showDummyVignette() {
    
    dumchanged = false;
    $('#instructions').show();
    $('#instructions').load('html/dummyvignette.html', function() {
        $("#inputx").prop('readonly', true).val(startx);
        $("#inputy").prop('readonly', true).val(starty);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: startx,
          step: 1,
          slide: function(event, ui) {
             $("#inputx").val(ui.value);
             $("#inputy").val(100 - ui.value);
          }
          });
        $( "#slider" ).on("slidechange", function( event, ui ) {
          dumchanged = true;
        });
      });
    $('#next').show();
    $('#next').click(validateDummyVignette);
}

// ********** VALIDATEDUMMYVIGNETTE: checks that they have answered the dummy vignette
function validateDummyVignette() {

    dummyconf = $("input[name='dummyconf']:checked").val();
    dummyxprob = $("#inputx").val();
    dummyyprob = $("#inputy").val();
    
    // test for unchanged slider
    if (dumchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      showVignette;
    } else { 
      // test for unanswered conf question
      if (dummyconf >= 0 && dummyconf <= 4) {
        hideElements();
        showVignette();
      } else {
        alert('Please answer the second question.');
        showDummyVignette;
      }
    }
}

// ********** SHOWVIGNETTE: Takes participant to vignette
function showVignette() {
    
    var vignettehtml = 'html/vignettes/vignette' + gainorloss + vignetteNumber + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $("#inputx").prop('readonly', true).val(startx);
        $("#inputy").prop('readonly', true).val(starty);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: startx,
          step: 1,
          slide: function(event, ui) {
             $("#inputx").val(ui.value);
             $("#inputy").val(100 - ui.value);
          }
          });
        $( "#slider" ).on("slidechange", function(event, ui) {
          vignchanged = true;
        }); 
      });
    $('#next').show();
    $('#next').click(validateVignette);
}

// ********** VALIDATEVIGNETTE: checks that they have answered the vignette
function validateVignette() {
  
    vignetteconf = $("input[name='vignetteconf']:checked").val();
    vignettexprob = $("#inputx").val();
    vignetteyprob = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      showVignette;
    } else { 
      // test for unanswered conf question
      if (vignetteconf >= 0 && vignetteconf <= 4) {
        hideElements();
        showPostQuestions();
      } else {
        alert('Please answer the second question.');
        showVignette;
      }
    }
}

// ********** SHOWPOSTQUESTIONS: Takes participant to post-vignette questions
function showPostQuestions() {
    
    $('#instructions').show();
    $('#instructions').load('html/postquestions.html', function () {
        $('#correctpqanswer').text(correctpostquestionanswer);
        $('#decoy1').text(decoy1);
        $('#decoy2').text(decoy2);
        $('#decoy3').text(decoy3);
    });
    $('#next').show();
    $('#next').click(validatePostQuestions);
}
  
// ********** VALIDATEPOSTQUESTIONS: checks that they have answered the question
function validatePostQuestions() {

    postQuestionsAnswers = $('#postQuestions').serializeArray();

    // test for empty answers   
    if (!$("input[name='postQuestion1']:checked").val()) {
      alert('Please answer the first question.');
      showPostQuestions;
    } else { 
      saveParticipantData();
      showDebrief();
    }
  
}

// ********** SAVEPARTICIPANTDATA: saves all the participant-level data
function saveParticipantData() {
    
    var nameStr = []; valStr = [];
    exp_data["subject"] = subjectID;
    exp_data["condition"] = condition;
    exp_data["vignetteType"] = gainorloss;
    exp_data["vignetteNumber"]= vignetteNumber;
    exp_data["Start100"] = start100;
    exp_data["dummyConfidence"] = dummyconf;
    exp_data["dummyXprob"] = dummyxprob;
    exp_data["dummyYprob"] = dummyyprob;
    exp_data["vignetteConfidence"] = vignetteconf;
    exp_data["vignetteXprob"] = vignettexprob;
    exp_data["vignetteYprob"] = vignetteyprob;
    for (i = 0; i < demographics.length; i++) {
        exp_data[demographics[i].name] = demographics[i].value; 
    }
    for (i = 0; i < postQuestionsAnswers.length; i++) {
        exp_data[postQuestionsAnswers[i].name] = postQuestionsAnswers[i].value;
    }

    console.log(exp_data);
    saveData(exp_data);    
}

// ********** SHOWDEBRIEF: shows the debrief text for those interested
function showDebrief() {
    hideElements(); 
    $('#instructions').show();
    $('#instructions').load('html/debrief.html', function () {
        $('#subid').text(subjectID);
    });
}


// ********** SAVEDATA: writes that data to server
function saveData(args) {
    var data = args;
    (function (d) {
        $.post('submit', {"content": JSON.stringify(d)});
    })(data);
}


// ********** HIDEELEMENTS: hides all DOM elements from the screen and clears the canvas
function hideElements() {
  
  $('div').hide();  // hides all divs
  $(':button').hide(); // hides all buttons
  $(':button').unbind(); // unbinds all buttons
}
