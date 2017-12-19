//alert("background script is running");

var client_id = '1Jp6WTGWIELSeulZVcfz9lHoWg9aLgnPv6FxI4rg';
var redirectUri = chrome.identity.getRedirectURL("oauth2");
//var auth_url = "http://emoteai.com:8000/o/authorize?client_id=1Jp6WTGWIELSeulZVcfz9lHoWg9aLgnPv6FxI4rg&state=random_state_string&response_type=code";
var auth_urlimplicit = "http://emoteai.com:8000/o/authorize?client_id=" + client_id + "&redirect_uri=" + redirectUri + "&response_type=token" + "&state=random_state_string" + "&scope=read";

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
  alert(redirectUri);

  //start authentication webflow
  chrome.identity.launchWebAuthFlow({
    'url': auth_urlimplicit,
    'interactive': true
  }, function(redirecturl) {

    access_token = redirecturl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
    alert(access_token);

    $.ajax({
      url: 'http://emoteai.com:8000/secret',
      type: 'GET',


      beforeSend: function(xhr){
         xhr.setRequestHeader('Authorization', access_token);
      },
      success: function(data) {
         alert(data);
      },
      error: function() {
         alert('ajax fail');
      }
    });



    //send ajax implicit request
    // $.ajax({
    //   url: "http://emoteai.com:8000/secret",
    //   headers: {
    //     "X-Test-Header": "test-value"
    //   }
    // });

    // $.ajax({
    //     type: "GET",
    //     beforeSend: function(request) {
    //         request.setRequestHeader("Authority", authorizationToken);
    //       },
    //       url: "entities",
    //       data: "json=" + escape(JSON.stringify(createRequestObject)),
    //       processData: false,
    //       success: function(msg) {
    //           $("#results").append("The result =" + StringifyPretty(msg));
    //       }
    //     });

  });
}



//     $.ajax({
//       url: 'http://emoteai.com:8000/secret',
//       type: 'GET',
//       success: function(data) {
//          alert('ajax success');
//       },
//       error: function() {
//          alert('ajax fail');
//       }
//     })
//
// alert('after ajax');
// }
//




//parses JSON received from emoteai server and put it in storage for content.js
function putemotedata() {
  alert("func:putemotedata called");
};

function callfrompopup() {
  alert("func: callfrompopup");
};

//alert("back end");
