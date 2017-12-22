//alert("background script is running");


//client ID
var client_id = '1Jp6WTGWIELSeulZVcfz9lHoWg9aLgnPv6FxI4rg';
// generate URI for token
var redirectUri = chrome.identity.getRedirectURL("oauth2");
// authorization url to request token
var auth_urlimplicit = "http://emoteai.com:8000/o/authorize?client_id=" + client_id + "&redirect_uri=" + redirectUri + "&response_type=token" + "&state=random_state_string" + "&scope=read";
var mycurrenturl = "default";
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
    case "popup_login_request":
      //verify the login
      verifylogin();
      break;
    case "tab_loaded":
      credentialping();
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
function verifylogin() {
  //alert("func:verifylogin called");
  //alert(redirectUri);

  chrome.tabs.query({
      active: true,
      currentWindow: true
          }, function(tabs) {
            var tab = tabs[0];
            mycurrenturl = tab.url;
            //alert(mycurrenturl);
        });

  /*--------start authentication webflow----*/
    chrome.identity.launchWebAuthFlow({
      'url': auth_urlimplicit,
      'interactive': true
    }, function(redirecturl) {





      //alert(redirecturl);
      //parse token from url
      access_token = redirecturl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      alert(access_token);

      //alert(mycurrenturl);

      checkURL(mycurrenturl);



      // receives "secret data" with ajax via token






    }
  );
}

//parses JSON received from emoteai server and put it in storage for content.js
function putemotedata() {
  alert("func:putemotedata called");
};

//
function checkURL(thisurl) {
  $.ajax({
    url: 'http://emoteai.com:8000/secret',
    type: 'GET',
    data: {
      url: thisurl ,
    },
    beforeSend: function(xhr){
       xhr.setRequestHeader('Authorization', access_token);
    },
    success: function(data) {
       //alert with data is authcode request works
       alert(data);
    },
    error: function() {
       //alert with fail if issue
       alert('ajax fail');
    }
  });
}


function credentialping() {
  alert("in func: credentialping");
}
//alert("back end");
