/*--global variables--*/
//	div objects representing the "enter menu"
var entermenuparent = document.createElement('div');
var emotemenuparent = document.createElement('div');
var emotenotesinputparent = document.createElement('div');
var emotespinnerparent = document.createElement('div');
// t -- highlighted text buffer; also used to checks to open menu for open selections only as a selection object
var t = 0;
//buffer is necessary to save initial highlighted text but allow for new text
var tstatebuffer = '';
//url storing buffer
var urlbuff = "";
// programstate - state machine variable [initialized at '3' to always wait for doc load]:
// 0 - Idle Browsing (Loggedin only)
// 1 - Enter Menu (Loggedin only)
// 2 - Emote Menu (Loggedin only)
// [ ] 3 - Waiting for document to load
// [ ] 4 - Waiting for credential check
// [ ] 5 - Not Logged In
var programstate = 3;
var emotemoods = ["Upset", "Annoyed", "Doubtful", "Nervous/Concerned", "Intrigued", "Motivated", "Amused", "Happy", "Content", "Agreed", "Relaxed", "Chill", "Burnt Out", "Over It", "Disapointed", "Sad"];
var currentmood = "";
//----------emote mode button coordinates-------//
//---format(X,Y,W,H)
// -close button
var emcbtn = [366, 9, 26, 27];
// -save button
var emsbtn = [161, 245, 76, 26];
// --mood wheel (starting at "upset" moving counter-clockwise
var ewbutA = [10, 135, 40, 47];
var ewbutB = [36, 80, 37, 50];
var ewbutC = [72, 36, 49, 44];
var ewbutD = [129, 9, 48, 50];
var ewbutE = [220, 9, 42, 50];
var ewbutF = [274, 36, 51, 44];
var ewbutG = [325, 80, 75, 50];
var ewbutH = [349, 130, 36, 52];
var ewbutI = [349, 233, 36, 48];
var ewbutJ = [316, 291, 43, 48];
var ewbutK = [274, 333, 42, 47];
var ewbutL = [220, 356, 42, 45];
var ewbutM = [135, 356, 42, 45];
var ewbutN = [85, 327, 44, 53];
var ewbutO = [27, 291, 58, 48];
var ewbutP = [10, 233, 40, 48];
// default hovertext for highlighted emote
var emotehovertext = "When you stumble back upon this emote, your notes from this time will appear here next time";
//*----highlight related
var preemoteregexraw = "";
var preemoteregex = "";
var emoteregex = new RegExp(preemoteregex, 'gim');

/*--Create UI--*/
// makes new divs a child of page DOM
document.body.appendChild(entermenuparent);
document.body.appendChild(emotemenuparent);
emotemenuparent.appendChild(emotenotesinputparent);
emotenotesinputparent.setAttribute("contenteditable", true);
//set divs ID
entermenuparent.id = 'entermenu';
emotemenuparent.id = 'emotemenu';
emotenotesinputparent.id = 'emotenotesinput';
/*--------------------------------------*/


/*--Program UI Event Handlers--*/
/*--Button Handlers--*/
//cbhandl:universal-closebuttonhandler
function cbhandl() {
    //console.log('close button');
    //closes all windows
    $("#entermenu").fadeOut();
    $("#emotemenu").fadeOut();
    $("#emotenotesinput").fadeOut();
    //return to idle state
    programstate = 0;
    //clears all marked text
    instance.unmark();
}
//ebhandl:entermenu-emotebuttonhandler(enter menu only)
function ebhandl() {
  if (programstate == 1) {
    //console.log('emote button');
    // close entermenu
    $("#entermenu").fadeOut();
    // open emotemenu
    // open emotenotesinput
    $("#emotemenu").fadeIn();
    $("#emotenotesinput").fadeIn();
    // copy raw string to buffer
    preemoteregexraw = t;
    // replace all special characters with literals
    var preemoteregex = preemoteregexraw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    // create new RegExp with 'i' modifier
    emoteregex = new RegExp(preemoteregex);
    //higlights text
    doHighLight();
    // Add the tool tip
    addToolTip();
    // change program state to 'Emote Mode'
    programstate = 2;

  }
}
//sbhandl:savemenu-savebuttonhandle(emote menu)
function sbhandl() {
  $("#emotemenu").fadeOut();
  $("#emotenotesinput").fadeOut();
  emotenotesinputobject = emotenotesinputparent.textContent;
  //total contents alert box
  alert("highlighted text:\n" +
    tstatebuffer +
    "\n\nuser notes:\n" +
    emotenotesinputobject +
    "\n\nassociated mood:\n" +
    currentmood);
  // reset current mood
  currentmood = "";
  programstate = 0;
}
/*--------------------------------------*/

/*--Button Detector--*/
//emoteclickhandl: takes x and y coors (emote menu mode) and determines which button was clicked
function emoteclickhandl(x, y) {

  //determins which button was pressed based on program state
	if (programstate==1){
		//'closebutton' click
		if ((x < 80) && (y < 40) && (x > 40) && (y > 0)) {
		  cbhandl();
		}
		//'emotebutton' click
		else if ((x < 40) && (y < 40) && (x > 0) && (y > 0)) {
		  ebhandl();
		}
	}

	if (programstate==2){
		if ((x < (emcbtn[0] + emcbtn[2])) && (y < emcbtn[1] + emcbtn[3]) && (x > emcbtn[0]) && (y > emcbtn[1])) {
	    cbhandl();
	  }
	  //'savebutton' click
	  if ((x < (emsbtn[0] + emsbtn[2])) && (y < emsbtn[1] + emsbtn[3]) && (x > emsbtn[0]) && (y > emsbtn[1])) {
	    sbhandl();
	  }
	  // ------ emote wheel buttons
	  if ((x < (ewbutA[0] + ewbutA[2])) && (y < ewbutA[1] + ewbutA[3]) && (x > ewbutA[0]) && (y > ewbutA[1])) {
	    //console.log('A');
	    currentmood = emotemoods[0];
	  }
	  if ((x < (ewbutB[0] + ewbutB[2])) && (y < ewbutB[1] + ewbutB[3]) && (x > ewbutB[0]) && (y > ewbutB[1])) {
	    //console.log('B');
	    currentmood = emotemoods[1];
	  }
	  if ((x < (ewbutC[0] + ewbutC[2])) && (y < ewbutC[1] + ewbutC[3]) && (x > ewbutC[0]) && (y > ewbutC[1])) {
	    //console.log('C');
	    currentmood = emotemoods[2];
	  }
	  if ((x < (ewbutD[0] + ewbutD[2])) && (y < ewbutD[1] + ewbutD[3]) && (x > ewbutD[0]) && (y > ewbutD[1])) {
	    //console.log('D');
	    currentmood = emotemoods[3];
	  }
	  if ((x < (ewbutE[0] + ewbutE[2])) && (y < ewbutE[1] + ewbutE[3]) && (x > ewbutE[0]) && (y > ewbutE[1])) {
	    //console.log('E');
	    currentmood = emotemoods[4];
	  }
	  if ((x < (ewbutF[0] + ewbutF[2])) && (y < ewbutF[1] + ewbutF[3]) && (x > ewbutF[0]) && (y > ewbutF[1])) {
	    //console.log('F');
	    currentmood = emotemoods[5];
	  }
	  if ((x < (ewbutG[0] + ewbutG[2])) && (y < ewbutG[1] + ewbutG[3]) && (x > ewbutG[0]) && (y > ewbutG[1])) {
	    //console.log('G');
	    currentmood = emotemoods[6];
	  }
	  if ((x < (ewbutH[0] + ewbutH[2])) && (y < ewbutH[1] + ewbutH[3]) && (x > ewbutH[0]) && (y > ewbutH[1])) {
	    //console.log('H');
	    currentmood = emotemoods[7];
	  }
	  if ((x < (ewbutI[0] + ewbutI[2])) && (y < ewbutI[1] + ewbutI[3]) && (x > ewbutI[0]) && (y > ewbutI[1])) {
	    //console.log('I');
	    currentmood = emotemoods[8];
	  }
	  if ((x < (ewbutJ[0] + ewbutJ[2])) && (y < ewbutJ[1] + ewbutJ[3]) && (x > ewbutJ[0]) && (y > ewbutJ[1])) {
	    //console.log('J');
	    currentmood = emotemoods[9];
	  }
	  if ((x < (ewbutK[0] + ewbutK[2])) && (y < ewbutK[1] + ewbutK[3]) && (x > ewbutK[0]) && (y > ewbutK[1])) {
	    //console.log('K');
	    currentmood = emotemoods[10];
	  }
	  if ((x < (ewbutL[0] + ewbutL[2])) && (y < ewbutL[1] + ewbutL[3]) && (x > ewbutL[0]) && (y > ewbutL[1])) {
	    //console.log('L');
	    currentmood = emotemoods[11];
	  }
	  if ((x < (ewbutM[0] + ewbutM[2])) && (y < ewbutM[1] + ewbutM[3]) && (x > ewbutM[0]) && (y > ewbutM[1])) {
	    //console.log('M');
	    currentmood = emotemoods[12];
	  }
	  if ((x < (ewbutN[0] + ewbutN[2])) && (y < ewbutN[1] + ewbutN[3]) && (x > ewbutN[0]) && (y > ewbutN[1])) {
	    //console.log('N');
	    currentmood = emotemoods[13];
	  }
	  if ((x < (ewbutO[0] + ewbutO[2])) && (y < ewbutO[1] + ewbutO[3]) && (x > ewbutO[0]) && (y > ewbutO[1])) {
	    //console.log('O');
	    currentmood = emotemoods[14];
	  }
	  if ((x < (ewbutP[0] + ewbutP[2])) && (y < ewbutP[1] + ewbutP[3]) && (x > ewbutP[0]) && (y > ewbutP[1])) {
	    //console.log('P');
	    currentmood = emotemoods[15];
	  }
	}
}
/*--------------------------------------*/

/*--Mouse Event Handlers--*/
//on mouse click - get location of cursor
document.onmousedown = function(e) {
	if (programstate == 1 || programstate == 2 || programstate == 5) {
    //calculate mouse position inside
		if (programstate == 1){
			var x = event.clientX - entermenu.offsetLeft;
    	var y = event.clientY - entermenu.offsetTop;
		}
		if (programstate == 2){
			var x = event.clientX - emotemenu.offsetLeft;
    	var y = event.clientY - emotemenu.offsetTop;
		}
		// if (programstate == 5){
		// 	var x = event.clientX - emotemenu.offsetLeft;
    // 	var y = event.clientY - emotemenu.offsetTop;
		// }
    console.log(x);
    console.log(y);
		emoteclickhandl(x,y);
  }
  if (programstate == 3 || programstate == 4 || programstate == 0) {
    //calculate mouse position inside "emote menu"
  }
}
//on text highlight - get highlighted text
document.onmouseup = function gText(e) {
  if (programstate == 0 || programstate == 1) {
    t = document.getSelection().toString();
    tstatebuffer = t;
    console.log('highlighted selection copied copied');
		//if 't' is not empty
		if (!(t == "")) {
      //fade-in menu
      $("#entermenu").fadeIn();
      programstate = 1;
    } else {
      cbhandl();
    }
  }
  if (programstate == 2 || programstate == 3 || programstate == 4 || programstate == 5) {
    //t = document.getSelection().toString();
    if (!(t == "")) {
      //tstatebuffer = t;
    }
  }
}
/*--------------------------------------*/









/*---------Highlighting Engine----------*/
//creates an variable 'instance' which is a mark method that contains
var instance = new Mark(document.querySelector("body"));

//given 'emote regex' it finds this in the current page
function doHighLight() {
  console.log(emoteregex);
  instance.markRegExp(emoteregex, {
    "acrossElements": false,
    "className": "emotehighlightmark",
    "debug": true,
    "iframes": true
  });
}

function addToolTip() {
  // set hovertext for emoted quote here
  console.log("inaddToolTip");
  //add the appropriate text into the highlighted text's hover
  $(".emotehighlightmark").attr('title', emotehovertext);
  //create the tooltip
  $(".emotehighlightmark").tooltip({
    classes: {
      "ui-tooltip": "highlight"
    }
  });
}
/*--------------------------------------*/




//calls to background.js to check authenitcation status
function calltoken(){
    //alert("func:calltoken called");
    //chrome.runtime.sendMessage('credential_request');
}

//is called if background.js is unable to gain credentials
function loginfailhandl(){
    alert("func:loginfailhandl called");
}

//gets data after AJAX response and highlights text if page was already emoted
function loadprevemote(){
    alert("func:loadprevemote called");
}

//on load...
window.onload = function () {
    //alert("page is loaded!");
    //put program into 'waiting for login credentials' state
    programstate = 0;
    // loadeds the tab
    chrome.runtime.sendMessage('tab_loaded')
    // calls token to check credentials
    calltoken();
}








//------*---dEBUG message handler breakout*------key press debug function
// document.onkeydown = function() {
//   if (event.key == "j") {
//     messagetester();
//   }
// }

// message test func
function messagetester() {
  // reads test variables
  chrome.storage.sync.get(['emotedfeeling', 'extravar'], function(items) {
    console.log(items.emotedfeeling);
    console.log(items.extravar);
  });
  // sends message to background script
  chrome.runtime.sendMessage('Hello World!');
}

//message handler
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    //determine message received from background.js
    switch (request.status) {
      case "login_failed":
        loginfailhandl();
        break;
      default:
        alert("other message from background.js");
    }
});
