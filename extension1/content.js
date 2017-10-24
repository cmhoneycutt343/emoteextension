//	entermenuparent - div object representing the "enter menu"
var entermenuparent = document.createElement( 'div' );
// t -- highlighted text buffer; also used to checks to open menu for open selections only
var t = '';


// entermenu.style.visibility = "hidden";

// makes new divs a parent of page DOM
document.body.appendChild( entermenuparent );
//set divs ID
entermenuparent.id = 'entermenu';

//cbhandl:entermenu-closebuttonhandler
function cbhandl()	{
	console.log('close button');
	entermenu.style.visibility = "hidden";
}
//ebhandle:entermenu-emotebuttonhandler
function ebhandl()	{
	console.log('emote button');
}

//on mouse click - get location of cursor
document.onmousedown = function(e)
{
    //calculate mouse position inside plugin
    var x = event.clientX - entermenu.offsetLeft;
    var y = event.clientY - entermenu.offsetTop; 
    //console.log(x);
    //console.log(y);
    
    //detect 'closebutton' click
    if ((x < 80) && (y < 40) && (x > 40) && (y > 0))	{
    	cbhandl();
    }	else if	((x < 40) && (y < 40) && (x > 0) && (y > 0))	{
    	ebhandl();
    }
};

//on text highlighter - get highlighted text
function gText(e) {
    t = (document.all) ? document.selection.createRange().text : document.getSelection();
    
    
    if(!(t==""))	{
    	entermenu.style.visibility = "visible";
    }	else	{
    	entermenu.style.visibility = "hidden";
    }
    
}

document.onmouseup = gText;
if (!document.all) document.captureEvents(Event.MOUSEUP);


















	
