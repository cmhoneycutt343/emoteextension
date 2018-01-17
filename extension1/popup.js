
// var app = chrome.runtime.getBackgroundPage();

function loginbuttonmessagetrig() {
    chrome.runtime.sendMessage("popup_login_request");
}

function logoutbuttonmessagetrig() {
    chrome.runtime.sendMessage("popup_logout_request");
}

document.getElementById('clickme').addEventListener('click', loginbuttonmessagetrig);
document.getElementById('clickme2').addEventListener('click', logoutbuttonmessagetrig);
