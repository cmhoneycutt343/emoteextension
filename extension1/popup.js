
// var app = chrome.runtime.getBackgroundPage();

function hello() {
    chrome.runtime.sendMessage("popup_login_request");
}

document.getElementById('clickme').addEventListener('click', hello);
