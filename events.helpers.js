/*
	* A Generic Function for Preventing the Default Browser Action from Occurring
	*
	* @param e {Object} Event Object
*/
function stopDefault( e ) {
	// Prevent the default browser action (W3C)
	if ( e && e.preventDefault ) {
		e.preventDefault();
	} else {
		// IE 
		window.event.returnValue = false;
	}
	return false;
}

/*
	* A Generic Function for Stopping Event Bubbling
	*
	* @param event {Object} Event Object
*/
function stopBubble( event ) {
	// If an event object is provided, the this is a non-IE browser
	if ( event && event.stopPropagation ) {
		// and therefore it support the W3C stopPropagation() method
		event.stopPropagation();
	} else {
		// Otherwise, we need to sue the Internet Explorer way of cancelling event bubbling
		window.event.cancelBubble = true;
	}
}

/* DOM Binding: Universal by Dean Edwards, 2005 */
// Add Event/removeEvent helper functions

function addEvent( element, type, handler ) {
	// assign each event handler a unique ID
	if ( !handler.$$guid ) {
		handler.$$guid = addEvent.guid++;
	}

	// create a hash table of event types for the element
	if ( !element.events ) {
		element.events = {};
	}

	// create a hash table of event handlers for each element/event pair
	var handlers = element.events[ type ];
	if ( !handlers ) {
		handlers = element.events[ type ] = {};

		// store the existing event handler (if there is one)
		if ( element[ 'on' + type ]) {
			handlers[ 0 ] = element[ 'on' + type ];
		}
	}

	// store the event handler in the hash table
	handlers[ handler.$$guid ] = handler;

	// assign a global event handler to do all the work
	element[ 'on' + type ] = handleEvent;
};

// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent( element, type, handler ) {
	// delete the event handler from the hash table
	if ( element.events && element.events[ type ]) {
		delete element.events[ type ][ handler.$$guid ];
	}
};

function handleEvent( event ) {
	var returnValue = true;

	// grab the event object ( IE uses a global event object )
	event = event || fixEvent( window.event );

	// get a reference to the hash table of event handlers
	var handlers = this.events[ event.type ];

	// execute each event handler
	for ( var i in handlers ) {
		this.$$handleEvent = handlers[ i ];
		if ( this.$$handleEvent( event ) === false ) {
			returnValue = false;
		}
	}

	return returnValue;
};

// Add some 'mising' methods to IE's event object
function fixEvent( event ) {
	// add W3C standart event methods
	event.preventDefault  = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
}

fixEvent.preventDefault = function() {
	this.returnValue = false;
};

fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};