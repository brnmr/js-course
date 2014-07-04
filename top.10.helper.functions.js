/* 
	#10 AddEvent Function

	Description:

	Surely a staple to event attachment! Regardless to what version you use written by whatever developer, 
	it does what it says it does. And of course as you might of known, I've put together quite a handy 
	version myself recently of addEvent() with some help from the contest winner and Mark Wubben along with 
	a few minor syntax adjustments. But just to be fair to Scott Andrew, here is the original that started it all. 
*/
function addEvent( elm, evType, fn, useCapture ) {

	if ( elm.addEventListener ) {

		elm.addEventListener( evType, fn, useCapture );
		return true; 

	}
	else if ( elm.attachEvent ) {

		var r = elm.attachEvent( 'on' + evType, fn ); 
		return r; 

	}
	else {

		elm[ 'on' + evType ] = fn;

	}
}

/*
	#09 AddLoadEvent Function

	Description:

	Simple way to add events to trigger after the page has loaded. This of course attaches all your events to the 
	onload event handler which some still see as necessary, nevertheless it does exactly what it's supposed to, and does it well. 
*/
function addLoadEvent( fn ) {

	var oldonload = window.onload;

	if ( typeof window.onload != 'function' ) {

		window.onload = fn;

	}
	else {

		window.onload = function() {

			oldonload();
			fn();

		}

	}
}