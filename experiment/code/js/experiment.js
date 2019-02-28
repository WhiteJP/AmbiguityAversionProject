var subjectID = ""; s1 = ""; s2 = "";
var gainorloss = "";
var condition = "";
var exp_data = {};
var demographics = [];
var ord = "";
var vignetteNumber = "";
var vignetteAnswer = [];

// ********** START: this function runs automatically when the page is loaded
$(document).ready(function () {
    
    hideElements();
    s1 = Math.random().toString(36).replace('0.', '').substring(0,4);
    s1 = s1.concat("35");
    s2 = "yz";
    s2 = s2.concat(Math.random().toString(36).replace('0.', '').substring(0,3));
    subjectID = s1.concat(s2);
    var x = Math.floor(Math.random() * 2);
    var y = Math.floor(Math.random() * 2);
    var vignetteNumber = Math.floor((Math.random() * 2) + 1);
        if (x===0) {
            gainorloss = 'G';
        } else {
            gainorloss = 'L';
        } 
        if (y===0) {
            ord = 'A';
        } else {
            ord = 'B';
        } 
    condition = gainorloss + vignetteNumber + ord;
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
        if ((demographics[i].name == "age") && (/[^0-9]/.test(demographics[i].value))) {
            alert('Please only use numbers in age.');
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
    $('#next').click(showVignette);
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
    if (instructionChecks.length < 4) {
      alert('Please fill out all questions.');
      ok = false;
      
    } else {
      
      for (var i = 0; i < instructionChecks.length; i++) {
        // check for incorrect responses
        if(instructionChecks[i].value === "incorrect") {
            alert('At least one answer was incorrect; please read the instructions and try again.');
            ok = false;
            break;
        }
        // check for empty answers 
        if (instructionChecks[i].value === "") {
            alert('Please fill out all questions.');
            ok = false;
            break;    
        }
        // check that they got their savingsType correct
        if (instructionChecks[i].name === "question4" && Number(instructionChecks[i].value) != savingsType) {
            alert('At least one answer was incorrect; please read the instructions and try again.');
            ok = false;
            break;    
        }
      }
    }

    // goes to next section
    if (!ok) {
        showInstructions(); 
    } else {
        hideElements();
        showOneShotTask(); 
    }

// ********** SHOWVIGNETTE: Takes participant to vignette
function showVignette() {
    
    var vignettehtml = 'html/vignette' + condition + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml);
    $('#next').show();
    $('#next').click(validateVignette);
}

// ********** VALIDATEVIGNETTE: checks that they have answered the question
function validateVignette() {
  
    vignetteAnswer = $("input[name='choiceType']:checked").val();

    // test for empty answers
    if (vignetteAnswer=="aversion" || vignetteAnswer=="noaversion") {
      hideElements();
      saveParticipantData();
      showDebrief();
    } else { 
      alert('Please answer the question.');
      showVignette;
    }

}


// ********** SAVEPARTICIPANTDATA: saves all the participant-level data
function saveParticipantData() {
    
    var nameStr = []; valStr = [];
    exp_data["subject"] = subjectID;
    exp_data["condition"] = condition;
    exp_data["gainorloss"] = vignetteType;
    exp_data["vignetteNmber"]= vignetteNumber;
    exp_data["ord"] = answerOrder;
    exp_data["vignetteAnswer"] = vignetteAnswer;
    for (i = 0; i < demographics.length; i++) {
        exp_data[demographics[i].name] = demographics[i].value;
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
