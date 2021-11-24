var subjectID = ""; s1 = ""; s2 = "";
var exp_data = {};
var demographics = [];
var dummyxstart = 0;
var xstart = 0;
var vignetteList = ["G1", "L1", "G2", "L2", "G5", "L5", "G9", "L10", "G11", "L11"];
var xprob = [];
var yprob = [];
var conf = [];

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
        
    //SHow demogrphic page
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
        //showInstructionChecks;
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
        $("#inputx").prop('readonly', true).val(dummyxstart);
        $("#inputy").prop('readonly', true).val(100 - dummyxstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: dummyxstart,
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
        showVignette1(vignetteList[0]);
      } else {
        alert('Please answer the second question.');
        //showDummyVignette;
      }
    }
}

// ********** SHOWVIGNETTE 1: Takes participant to vignette
function showVignette1(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("2");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette1);
}

// ********** VALIDATEVIGNETTE 1: checks that they have answered the vignette
function validateVignette1() {
  
    conf[0] = $("input[name='vignetteconf']:checked").val();
    xprob[0] = $("#inputx").val();
    yprob[0] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[0] >= 0 && conf[0] <= 4) {
        hideElements();
        showVignette2(vignetteList[1]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 2: Takes participant to vignette
function showVignette2(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("3");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette2);
}

// ********** VALIDATEVIGNETTE 2: checks that they have answered the vignette
function validateVignette2() {
  
    conf[1] = $("input[name='vignetteconf']:checked").val();
    xprob[1] = $("#inputx").val();
    yprob[1] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[1] >= 0 && conf[1] <= 4) {
        hideElements();
        showVignette3(vignetteList[2]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 3: Takes participant to vignette
function showVignette3(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("4");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette3);
}

// ********** VALIDATEVIGNETTE 3: checks that they have answered the vignette
function validateVignette3() {
  
    conf[2] = $("input[name='vignetteconf']:checked").val();
    xprob[2] = $("#inputx").val();
    yprob[2] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[2] >= 0 && conf[2] <= 4) {
        hideElements();
        showVignette4(vignetteList[3]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 4: Takes participant to vignette
function showVignette4(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("5");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette4);
}

// ********** VALIDATEVIGNETTE 4: checks that they have answered the vignette
function validateVignette4() {
  
    conf[3] = $("input[name='vignetteconf']:checked").val();
    xprob[3] = $("#inputx").val();
    yprob[3] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[3] >= 0 && conf[3] <= 4) {
        hideElements();
        showVignette5(vignetteList[4]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 5: Takes participant to vignette
function showVignette5(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("6");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette5);
}

// ********** VALIDATEVIGNETTE 5: checks that they have answered the vignette
function validateVignette5() {
  
    conf[4] = $("input[name='vignetteconf']:checked").val();
    xprob[4] = $("#inputx").val();
    yprob[4] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[4] >= 0 && conf[4] <= 4) {
        hideElements();
        showVignette6(vignetteList[5]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 6: Takes participant to vignette
function showVignette6(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("7");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette6);
}

// ********** VALIDATEVIGNETTE 6: checks that they have answered the vignette
function validateVignette6() {
  
    conf[5] = $("input[name='vignetteconf']:checked").val();
    xprob[5] = $("#inputx").val();
    yprob[5] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[5] >= 0 && conf[5] <= 4) {
        hideElements();
        showVignette7(vignetteList[6]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 7: Takes participant to vignette
function showVignette7(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("8");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette7);
}

// ********** VALIDATEVIGNETTE 7: checks that they have answered the vignette
function validateVignette7() {
  
    conf[6] = $("input[name='vignetteconf']:checked").val();
    xprob[6] = $("#inputx").val();
    yprob[6] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[6] >= 0 && conf[6] <= 4) {
        hideElements();
        showVignette8(vignetteList[7]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 8: Takes participant to vignette
function showVignette8(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("9");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette8);
}

// ********** VALIDATEVIGNETTE 8: checks that they have answered the vignette
function validateVignette8() {
  
    conf[7] = $("input[name='vignetteconf']:checked").val();
    xprob[7] = $("#inputx").val();
    yprob[7] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[7] >= 0 && conf[7] <= 4) {
        hideElements();
        showVignette9(vignetteList[8]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 9: Takes participant to vignette
function showVignette9(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("10");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette9);
}

// ********** VALIDATEVIGNETTE 9: checks that they have answered the vignette
function validateVignette9() {
  
    conf[8] = $("input[name='vignetteconf']:checked").val();
    xprob[8] = $("#inputx").val();
    yprob[8] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[8] >= 0 && conf[8] <= 4) {
        hideElements();
        showVignette10(vignetteList[9]);
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}

// ********** SHOWVIGNETTE 10: Takes participant to vignette
function showVignette10(v) {
    
    vignettehtml = 'html/vignettes/vignette' + v + '.html';
    vignchanged = false;
    $('#instructions').show();
    $('#instructions').load(vignettehtml, function() {
        $('#v_num').text("11");
        $("#inputx").prop('readonly', true).val(xstart);
        $("#inputy").prop('readonly', true).val(100 - xstart);
        $( "#slider" ).slider({
          min: 0,
          max: 100,
          value: xstart,
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
    $('#next').click(validateVignette10);
}

// ********** VALIDATEVIGNETTE 10: checks that they have answered the vignette
function validateVignette10() {
  
    conf[9] = $("input[name='vignetteconf']:checked").val();
    xprob[9] = $("#inputx").val();
    yprob[9] = $("#inputy").val();
    
    // test for unchanged slider
    if (vignchanged === false) {
      alert('Please answer the first question. You must move the slider at least once to continue.');
      //showVignette;
    } else { 
      // test for unanswered conf question
      if (conf[9] >= 0 && conf[9] <= 4) {
        hideElements();
        saveParticipantData();
        showDebrief();
      } else {
        alert('Please answer the second question.');
        //showVignette;
      }
    }
}


// ********** SAVEPARTICIPANTDATA: saves all the participant-level data
function saveParticipantData() {
    
    exp_data["subject"] = subjectID;
    
    // * save demo dat
    for (i = 0; i < demographics.length; i++) {
        exp_data[demographics[i].name] = demographics[i].value; 
    }
    
    // * save dummy vignette details
    exp_data["dummyconf"] = dummyconf;
    exp_data["dummyxprob"] = dummyxprob;
    exp_data["dummyyprob"] = dummyyprob;
    
    // ** SAVE MAIN VIGNETTE DETAILS
    for (i = 0; i < vignetteList.length; i++) {
      
        // * save each vignette number
        exp_data["V".concat([i + 1])] = vignetteList[i]; 
        
        // * save each confidence rating
        exp_data["conf".concat([i + 1])] = conf[i]; 
        
        // * save each Xprob rating
        exp_data["xprob".concat([i + 1])] = xprob[i];
        
        // * save each yprob rating
        exp_data["yprob".concat([i + 1])] = yprob[i]; 
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
