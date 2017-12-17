//alert("background script is running");

/*--------auto request token------*/
// chrome.identity.getAuthToken({
//     interactive: true
// }, function(token) {
//     if (chrome.runtime.lastError) {
//         alert(chrome.runtime.lastError.message);
//         return;
//     }
//     var x = new XMLHttpRequest();
//     x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
//     x.onload = function() {
//         alert(x.response);
//     };
//     x.send();
// });


// test storage variables
var emotedfeeling = 2;
var extravar

// put test variables into storage
chrome.storage.sync.set({
  'emotedfeeling': emotedfeeling,
  'extravar': 'extravar'
}, function() {
  //alert('Settings saved');
});

// test function for between-script calling
// function callmebackground() {
//   //alert("message from content.js");
//   chrome.identity.getAuthToken({
//     interactive: false
//   }, function(token) {
//     if (chrome.runtime.lastError) {
//       //alert(chrome.runtime.lastError.message);
//       return;
//     }
//     var x = new XMLHttpRequest();
//     x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
//     x.onload = function() {
//       //alert(x.response);
//       console.log("token received");
//     };
//     x.send();
//   });
// }

/*----message receiver handler-----*/
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  //determine what the message says
  switch (response) {
    case "credential_request":
      //verify the login
      verifylogin();
      break;
    default:
      alert("message: other");
  }
  // // message handler guts
  // callmebackground();
  // //sends a message back to content script
  // chrome.tabs.query({
  //   active: true,
  //   currentWindow: true
  // }, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {
  //     action: "open_dialog_box"
  //   }, function(response) {});
  // });
});



//makes token request and either calls server or return error
function verifylogin(){
    //alert("func:verifylogin called");
    chrome.identity.getAuthToken({
        interactive: false
    }, function(token) {
        if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
            alert("login failed");

            //send "login_failed" message to content.js
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                status: "login_failed"
              });
            });

            return;
        }
        var x = new XMLHttpRequest();
        //Debug: send token to known good server
        //x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
        // x.open('GET', 'http://emoteai.com:8000/xml' + token);
        x.open('GET', 'http://emoteai.com:8000/xml');
        x.onload = function() {
            alert(x.response);
            //alert('XML Received');
        };
        x.send();
    });

}

//parses JSON received from emoteai server and put it in storage for content.js
function putemotedata(){
    alert("func:putemotedata called");
}

//alert("back end");
