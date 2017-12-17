//alert("background script is running");

/*--------sucessfully loads token------*/
// chrome.identity.getAuthToken({
//     interactive: false
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
chrome.storage.sync.set({'emotedfeeling': emotedfeeling, 'extravar': 'extravar'}, function() {
      //alert('Settings saved');
    });

// test function for between-script calling
function callmebackground()
    {
      alert("message from content.js");
    }

// message receiver handler
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    // message handler guts
    callmebackground();
    //sends a message back to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
    });
});

//alert("back end");
