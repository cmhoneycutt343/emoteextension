console.log("content script is running");

document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var div = document.createElement( 'div' );
var btnForm = document.createElement( 'form' );
var btn = document.createElement( 'input' );

//append all elements
document.body.appendChild( div );
//div.appendChild( btnForm );
//btnForm.appendChild( btn );
//set attributes for div
div.id = 'myDivId';
div.style.position = 'fixed';
div.style.top = '0%';
div.style.left = '90%';
div.style.width = '100%';   
div.style.height = '10%';
div.style.backgroundColor = 'red';
div.style.zIndex = '100000';
div.style.visibility = 'visible';

// 
// //set attributes for btnForm
// btnForm.action = '';
// 
// //set attributes for btn
// //"btn.removeAttribute( 'style' );
// btn.type = 'image';
// btn.value = '2pussies';
// btn.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvZbV9qlpC-niJyMSe75ffRzWRIIDGETkTPW53JuE4N6awiiJHYw';
// btn.style.position = 'fixed';
// btn.style.top = '0';

document.onkeydown = function() {
	var currentkey = event.key;
	console.log(event.key);
	if (currentkey == 'f')	{
		div.style.visibility = 'visible';
	}
	if (currentkey == 'd')	{
		div.style.visibility = 'hidden';
	}
};