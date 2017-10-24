/*--global variables--*/
//	div objects representing the "enter menu"
var entermenuparent = document.createElement( 'div' );
var emotemenuparent = document.createElement( 'div' );
// t -- highlighted text buffer; also used to checks to open menu for open selections only as a selection object
var t = 0;
//buffer is necessary to save initial highlighted text but allow for new text
var tstatebuffer = '';
// programstate - state machine variable:
// 0 - Idle Browsing
// 1 - Enter Menu
// 2 - Emote Menu
var programstate = 0;
// emote menu button position (format x, y, w, h)
// -save button
var	sbtn = [161, 245, 76, 26];

/*--create UI--*/
// makes new divs a child of page DOM
document.body.appendChild( entermenuparent );
document.body.appendChild( emotemenuparent );
//set divs ID
entermenuparent.id = 'entermenu';
emotemenuparent.id = 'emotemenu';

/*--Internal Event Handlers--*/
//cbhandl:entermenu-closebuttonhandler
function cbhandl()	{
	if (programstate==1||programstate==2)	{
		//console.log('close button');
		//closes all windows
		entermenu.style.visibility = "hidden";
		emotemenu.style.visibility = "hidden";
		//return to idle state
		programstate=0;
	}
}
//ebhandl:entermenu-emotebuttonhandler(enter menu only)
function ebhandl()	{
	if (programstate==1)	{
		//console.log('emote button');
		// close entermenu
		entermenu.style.visibility = "hidden";
		// open emotemenu
		emotemenu.style.visibility = "visible";
		// change program state to 'Emote Mode'
		programstate=2;
	}
}
//sbhandl:savemenu-savebuttonhandle(emote menu)
function sbhandl()	{
    emotemenu.style.visibility = "hidden"; 
    alert(tstatebuffer);
    programstate=0;
}

/*--Global Event Handlers--*/
/*--UpdateReq:programstate integration--*/
//on mouse click - get location of cursor
document.onmousedown = function(e) {
    if (programstate==0||programstate==1)	{
    	//calculate mouse position inside
    	var x = event.clientX - entermenu.offsetLeft;
    	var y = event.clientY - entermenu.offsetTop; 
    	//console.log(x);
    	//console.log(y);  
    	//'closebutton' click
    	if ((x < 80) && (y < 40) && (x > 40) && (y > 0))	{
    		cbhandl();
    	}	
    	//'emotebutton' click
    	else if	((x < 40) && (y < 40) && (x > 0) && (y > 0))	{
    		ebhandl();
    	}
    }
    if (programstate==2)	{
    	//calculate mouse position inside
    	var x = event.clientX - emotemenu.offsetLeft;
    	var y = event.clientY - emotemenu.offsetTop; 
    	//console.log(x);
    	//console.log(y);  
    	
    	/*--button detects--*/
    	//detect 'closebutton' click
    	if ((x < 392) && (y < 36) && (x > 366) && (y > 10))	{
    		cbhandl();
    	}
    	if ((x < (sbtn[0]+sbtn[2])) && (y < sbtn[1]+sbtn[3]) && (x > sbtn[0]) && (y > sbtn[1]))	{
    		sbhandl();
    	}
    }
}

//on text highlight - get highlighted text
document.onmouseup = function gText(e) {
	if (programstate==0||programstate==1)	{
    	t = document.getSelection().toString();
    	tstatebuffer = t;
    	console.log('highlighted selection copied copied');
    	if(!(t==""))	{
    		entermenu.style.visibility = "visible";
    		programstate=1;
    	}	else	{
    		entermenu.style.visibility = "hidden";
    		emotemenu.style.visibility = "hidden";
    		programstate=0;
    	}
    }
    if (programstate==2)	{
    	t = document.getSelection().toString();
    	if(!(t==""))	{
			tstatebuffer = t;
    	}
    }
}




















	
