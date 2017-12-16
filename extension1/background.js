//
alert("background script is running");

// chrome.browserAction.onClicked.addListener(function(tab) {
//    chrome.tabs.executeScript(null, {file: "content.js"});
// });

// chrome.identity.getAuthToken({
//     interactive: true
// }, function(token) {
//     if (chrome.runtime.lastError) {
//         alert(chrome.runtime.lastError.message);
//         console.log("a");
//         return;
//     }
//     var x = new XMLHttpRequest();
//     x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
//     x.onload = function() {
//         alert(x.response);
//     };
//     x.send();
// });
