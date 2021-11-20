var subjectID = ""; s1 = ""; s2 = "";
var exp_data = {};
var demographics = [];
var vignetteAnswer = [];
var dummyVignetteAnswer = [];
var vignetteList = ["G1", "L1", "G2", "L2", "G5", "L5", "G9", "L10", "G11", "L11"];
var ord = [];
var condition = [];

// create function which shuffles vignettes
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// create function to check that no pairs are within two from each other
function isPermuteOK(array){
  
  // Get positions of pairs and difference 
  
  // indexOf does partial match, and can't do regex.
  // Due to L1 and L11 and G! and G11, used .find method 
  // which can have regex text
  G1pos = array.findIndex(value => /G1$/.test(value)); 
  L1pos = array.findIndex(value => /L1$/.test(value)); 
  G1L1diff = Math.abs(G1pos - L1pos);
  
  G2pos = array.indexOf('G2');
  L2pos = array.indexOf('L2');
  G2L2diff = Math.abs(G2pos - L2pos);
  
  G5pos = array.indexOf('G5');
  L5pos = array.indexOf('L5');
  G5L5diff = Math.abs(G5pos - L5pos);
  
  // Check if any pairs are a problem
  G1L1check = G1L1diff > 3;
  G2L2check = G2L2diff > 3;
  G5L5check = G5L5diff > 3;
  
  // are all pairs ok? 
  allgood = G1L1check && G2L2check && G5L5check;
  return allgood;
  
}


// ********** START: this function runs automatically when the page is loaded
$(document).ready(function () {
    
    hideElements();
    s1 = Math.random().toString(36).replace('0.', '').substring(0,4);
    s1 = s1.concat("35");
    s2 = "yz";
    s2 = s2.concat(Math.random().toString(36).replace('0.', '').substring(0,3));
    subjectID = s1.concat(s2);

    
    // 1.randomly shuffle vignetteList
    // 2. check  that it fits constraints
    // 3. keep looping until it does 
    
    vignOrderOK = false;
    nchecks = 0; // get n attempts before array fits constraints
    
    while (!vignOrderOK) {
      vignetteList = shuffle(vignetteList);
      vignOrderOK = isPermuteOK(vignetteList);
      nchecks = nchecks + 1;
    }
    
    // ** generate random ordering and add to make condition.
    for(var i = 0; i < vignetteList.length; i++){
      x = Math.floor(Math.random() * 2);
      if (x===0) {
            ord[i] = 'A';
        } else {
            ord[i] = 'B';
        }
      condition[i] = vignetteList[i] + ord[i];
    }
  
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
    
      // check that gender was checked
    // for some reason it doesn't show up in demographics variable from serializeArray
    // a problem for another day as this solution works.
    if (!$("input[name='gender']:checked").val()) {
          alert('Please fill out all fields.');
          ok = false;
        }
  
    for (var i = 0; i < demographics.length; i++) {
        
        // test for empty answers for income, age and education
        if (demographics[i].value === "") {
            alert('Please fill out all fields.');
            ok = false;
            break;
        }
        
        // validate age
        if (demographics[i].name == "age" && 
            (demographics[i].value < 18 || demographics[i].value > 100)) {
            alert('Please only use numbers from 18 to 100 for age.');
            ok = false;
            break;
        }
        
        // years education
        if (demographics[i].name == "education" && 
            (demographics[i].value < 0 || demographics[i].value > 40)) {
            alert('Please only use numbers from 0 to 40 for years of education.');
            ok = false;
            break;
        }
    
    }
    

    // goes to next section
    if (!ok) {
        //showDemographics(); by removing this participants don't have to re-enter details
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
    $('#next').click(showInstructions2);
}
// ********** SHOWINSTRUCTIONS2: instructions continued
function showInstructions2() {
  
    hideElements();
    $('#instructions').show();
    $('#instructions').load('html/instructions2.html');
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
    if (instructionChecks.length < 3) {
      alert('Please fill out all questions.');
      showInstructionChecks();
      ok = fase;
      
    } else {
      
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
    if (!ok) {
        showInstructions(); 
    } else {
        hideElements();
        showDummyVignette(); 
    }
}

// ********** SHOWDUMMYVIGNETTE: Takes participant to dummy vignette
function showDummyVignette() {

    hideElements();
    $('#instructions').show();
    $('#instructions').load('html/dummyvignette.html');
    $('#next').show();
    $('#next').click(validateDummyVignette);
}

// ********** VALIDATEDUMMYVIGNETTE: checks that they have answered the dummy vignette
function validateDummyVignette() {

    dummyVignetteAnswer = $("input[name='dummyvignette']:checked").val();

    // test for empty answers
    if (dummyVignetteAnswer > 0 && dummyVignetteAnswer < 8) {
      hideElements();
      showVignette1(condition[0]);
    } else { 
      alert('Please answer the question.');
      //showDummyVignette; 
    }
}

// ********** SHOWVIGNETTE 1: Takes participant to vignette
function showVignette1(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("2");
    });
    $('#next').show();
    $('#next').click(validateVignette1);
}

// ********** VALIDATEVIGNETTE 1: checks that they have answered the vignette
function validateVignette1() {
  
    vignetteAnswer[0] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[0] > 0 && vignetteAnswer[0] < 8) {
      hideElements();
      showVignette2(condition[1]);
    } else { 
      alert('Please answer the question.');
      //showVignette1(condition[0]);
    }

}

// ********** SHOWVIGNETTE 2: Takes participant to vignette
function showVignette2(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("3");
    });
    $('#next').show();
    $('#next').click(validateVignette2);
}

// ********** VALIDATEVIGNETTE2: checks that they have answered the vignette
function validateVignette2() {
  
    vignetteAnswer[1] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[1] > 0 && vignetteAnswer[1] < 8) {
      hideElements();
      showVignette3(condition[2]);
    } else { 
      alert('Please answer the question.');
      //showVignette2(condition[1]);
    }

}

// ********** SHOWVIGNETTE 3: Takes participant to vignette
function showVignette3(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("4");
    });
    $('#next').show();
    $('#next').click(validateVignette3);
}

// ********** VALIDATEVIGNETTE 3: checks that they have answered the vignette
function validateVignette3() {
  
    vignetteAnswer[2] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[2] > 0 && vignetteAnswer[2] < 8) {
      hideElements();
      showVignette4(condition[3]);
    } else { 
      alert('Please answer the question.');
      //showVignette3(condition[2]);
    }

}

// ********** SHOWVIGNETTE 4: Takes participant to vignette
function showVignette4(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("5");
    });
    $('#next').show();
    $('#next').click(validateVignette4);
}

// ********** VALIDATEVIGNETTE 4: checks that they have answered the vignette
function validateVignette4() {
  
    vignetteAnswer[3] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[3] > 0 && vignetteAnswer[3] < 8) {
      hideElements();
      showVignette5(condition[4]);
    } else { 
      alert('Please answer the question.');
      //showVignette4(condition[3]);
    }

}

// ********** SHOWVIGNETTE 5: Takes participant to vignette
function showVignette5(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("6");
    });
    $('#next').show();
    $('#next').click(validateVignette5);
}

// ********** VALIDATEVIGNETTE 5: checks that they have answered the vignette
function validateVignette5() {
  
    vignetteAnswer[4] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[4] > 0 && vignetteAnswer[4] < 8) {
      hideElements();
      showVignette6(condition[5]);
    } else { 
      alert('Please answer the question.');
      //showVignette5(condition[4]);
    }

}

// ********** SHOWVIGNETTE 6: Takes participant to vignette
function showVignette6(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("7");
    });
    $('#next').show();
    $('#next').click(validateVignette6);
}

// ********** VALIDATEVIGNETTE 6: checks that they have answered the vignette
function validateVignette6() {
  
    vignetteAnswer[5] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[5] > 0 && vignetteAnswer[5] < 8) {
      hideElements();
      showVignette7(condition[6]);
    } else { 
      alert('Please answer the question.');
      //showVignette6(condition[5]);
    }

}

// ********** SHOWVIGNETTE 7: Takes participant to vignette
function showVignette7(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("8");
    });
    $('#next').show();
    $('#next').click(validateVignette7);
}

// ********** VALIDATEVIGNETTE 7: checks that they have answered the vignette
function validateVignette7() {
  
    vignetteAnswer[6] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[6] > 0 && vignetteAnswer[6] < 8) {
      hideElements();
      showVignette8(condition[7]);
    } else { 
      alert('Please answer the question.');
      //showVignette7(condition[6]);
    }

}

// ********** SHOWVIGNETTE 8: Takes participant to vignette
function showVignette8(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("9");
    });
    $('#next').show();
    $('#next').click(validateVignette8);
}

// ********** VALIDATEVIGNETTE 8: checks that they have answered the vignette
function validateVignette8() {
  
    vignetteAnswer[7] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[7] > 0 && vignetteAnswer[7] < 8) {
      hideElements();
      showVignette9(condition[8]);
    } else { 
      alert('Please answer the question.');
      //showVignette8(condition[7]);
    }

}

// ********** SHOWVIGNETTE 9: Takes participant to vignette
function showVignette9(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("10");
    });
    $('#next').show();
    $('#next').click(validateVignette9);
}

// ********** VALIDATEVIGNETTE 8: checks that they have answered the vignette
function validateVignette9() {
  
    vignetteAnswer[8] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[8] > 0 && vignetteAnswer[8] < 8) {
      hideElements();
      showVignette10(condition[9]);
    } else { 
      alert('Please answer the question.');
      //showVignette9(condition[8]);
    }

}

// ********** SHOWVIGNETTE 10: Takes participant to vignette
function showVignette10(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function () {
        $('#v_num').text("11");
    });
    $('#next').show();
    $('#next').click(validateVignette10);
}

// ********** VALIDATEVIGNETTE 10: checks that they have answered the vignette
function validateVignette10() {
  
    vignetteAnswer[9] = $("input[name='vignette']:checked").val();

    if (vignetteAnswer[9] > 0 && vignetteAnswer[9] < 8) {
      hideElements();
      saveParticipantData();
      showDebrief();
    } else { 
      alert('Please answer the question.');
      //showVignette10(condition[9]);
    }

}


// ********** SAVEPARTICIPANTDATA: saves all the participant-level data
function saveParticipantData() {
    
    exp_data["subject"] = subjectID;
    
    // * save demo dat
    for (i = 0; i < demographics.length; i++) {
        exp_data[demographics[i].name] = demographics[i].value; 
    }
    
    // * save dummy vignette answer dat
    exp_data["dummyVignetteAnswer"] = dummyVignetteAnswer;
    
    // * save each condition (vignette number + order)
    for (i = 0; i < condition.length; i++) {
        exp_data["V".concat([i + 1])] = condition[i]; 
    }
    // * save each answer
    for (i = 0; i < vignetteAnswer.length; i++) {
        exp_data["A".concat([i + 1])] = vignetteAnswer[i]; 
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
