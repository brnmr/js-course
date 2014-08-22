/*
	Helper Functions for JS/CSS Interaction
	*/
/**
 * @function getStyle
 *
 * A Function for Finding the Actual Cimputed Value of a CSS Style
 * Property on an Element
 *
 * @param elem {HTML Element}
 * @param name {String} Style name
 *
 * @returns {String} the value of the style property
 **/
 function getStyle( elem, name ) {
	// If the property exists in style[], the it's been
	// set recently (and is current)
	if ( elem.style[ name ] ) {
		return elem.style[ name ];
	}
	// Otherwise, try to use IE's method
	else if ( elem.currentStyle ) {
		return elem.currentStyle[ name ];
	}
	// Or the W3C's method, if it exists
	else if ( document.defaultView && document.defaultView.getComputedStyle ) {
		// It uses the traditional 'text-align' style of rule writing,
		// instead of textAlign
		name = name.replace( /([A-Z])/g, '-$1' );
		name = name.toLowerCase();

		// Get the style object and get the value of the property (if it exists)
		var s = document.defaultView.getComputedStyle( elem, '' );
		return s && s.getPropertyValue( name );

	// Otherwise, we're using some other browser	
} else {
	return null;
}
}

/**
 * @function pageX
 *
 * Helper Function for Determining the 'x' offset (Horizontal, Left) of an Element Relative to the Entire Document 
 *
 * @param elem {HTML Element}
 *
 * @returns {String}
 *
 **/
 function pageX( elem ) {
 	// See if we're at the root element, or
 	return elem.offsetParent ?
 		// If we can still go ip, add the current offset and recurse upwards
 		elem.offsetLeft + pageX( elem.offsetParent ) :
 	
 		// Otherwise, just get the current offset
 		elem.offsetLeft;
 }

 /**
 * @function pageY
 *
 * Helper Function for Determining the 'y' offset (Vertical, Top) of an Element Relative to the Entire Document 
 *
 * @param elem {HTML Element}
 *
 * @returns {String}
 *
 **/
 function pageY( elem ) {
 	// See if we're at the root element, or
 	return elem.offsetParent ?
 		// If we can still go ip, add the current offset and recurse upwards
 		elem.offsetTop + pageY( elem.offsetParent ) :

 		// Otherwise, just get the current offset
 		elem.offsetTop;
 }

 /*
  * @function parentX
  *
  * Find the Horizontal Positioning of an Element Within Its parent
  *
  * @param elem {HTML Element}
  *
  * @returns {String}
  *
 */
 function parentX( elem ) {
 	// If the offsetParent is the element's parent, break early
 	return elem.parentNode == elem.offsetParent ?
 		elem.offsetLeft :

 		// Otherwise, we need to find the position relative to the netire
 		// page for both elements, and find the difference
 		pageX( elem ) - pageX( elem.parentNode );
 }

  /*
  * @function parentY
  *
  * Find the Vertical Positioning of an Element Within Its parent
  *
  * @param elem {HTML Element}
  *
  * @returns {String}
  *
 */
 function parentY( elem ) {
 	// If the offsetParent is the element's parent, break early
 	return elem.parentNode == elem.offsetParent ?
 		elem.offsetTop :

 		// Otherwise, we need to find the position relative to the netire
 		// page for both elements, and find the difference
 		pageY( elem ) - pageY( elem.parentNode );
 }

/*
  * @function posX
  *
  * Helper Function for Finding the left CSS Positioning of an Element
  *
  * @param elem {HTML Element}
  *
  * @returns {Number}
  *
*/
 function posX( elem ) {
 	// Get the computed style and get the number out of the value
 	return parseInt( getStyle( elem, 'left' ) );
 }

/*
  * @function posY
  *
  * Helper Function for Finding the top CSS Positioning of an Element
  *
  * @param elem {HTML Element}
  *
  * @returns {Number}
  *
*/
 function posY( elem ) {
 	// Get the computed style and get the number out of the value
 	return parseInt( getStyle( elem, 'top' ) );
 }

 /*
  * @function setX
  *
  * Helper Function for Setting the 'x' Position of an Element, Regardless of Its Current Position
  *
  * @param elem {HTML Element}
  * @param pos  {Number}
  *
*/
 function setX( elem, pos ) {
 	// Set the 'left' CSS property, using pixel unite
 	elem.style.left = pos + 'px';
 }

 /*
  * @function setY
  *
  * Helper Function for Setting the 'y' Position of an Element, Regardless of Its Current Position
  *
  * @param elem {HTML Element}
  * @param pos  {Number}
  *
*/
 function setY( elem, pos ) {
 	// Set the 'left' CSS property, using pixel unite
 	elem.style.top = pos + 'px';
 }

 /*
  * @function addX
  *
  * Helper Function for Adjusting the 'x' Position of an Element, Relative ot Its Current Position
  *
  * @param elem {HTML Element}
  * @param pos  {Number}
  *
*/
 function addX( elem, pos ) {
 	// Get the current x (horizontal) position and add the offset ti it
 	setX( posX( elem ) + pos );
 }

/*
  * @function addY
  *
  * Helper Function for Adjusting the 'y' Position of an Element, Relative ot Its Current Position
  *
  * @param elem {HTML Element}
  * @param pos  {Number}
  *
*/
 function addX( elem, pos ) {
 	// Get the current y (vertical) position and add the offset ti it
 	setY( posY( elem ) + pos );
 }

/*
  * @function getHeight
  *
  * Helper Function for Retreiving the Current Height of a DOM Element
  *
  * @param elem { HTML Element }
  *
  * @returns { Number }
  *
*/
function getHeight( elem ) {
	return parseInt( getStyle( elem, 'height') );
}

/*
  * @function getWidth
  *
  * Helper Function for Retreiving the Current Width of a DOM Element
  *
  * @param elem { HTML Element }
  *
  * @returns { Number }
  *
*/
function getWidth( elem ) {
	return parseInt( getStyle( elem, 'width') );
}

/*
  * @function fullHeight
  *
  * Helper Function for Finding the Full Potential (Possible) Height of a DOM Element,
  * Even if the Element is Hidden
  *
  * @param elem { HTML Element }
  *
  *
*/
// Find the full, possible, height of an element (not the actual,
// current, height)
function fullHeight( elem ) {
	// If the element is being displayed, then offsetHeight
	// should do the trick, barring that, getHeight() will work
	if ( getStyle( elem, 'display' ) != 'none' ) 
		return elem.offsetHeight || getHeight( elem );
	
	// Otherwise, we have to deal with an element with a display
	// of none, so we need to reset its CSS properties to get a more
	// accurate reading
	var old = resetCSS( elem, {
		display    : '',
		visibility : 'hidden',
		position   : 'absolute'
		} );

	// Figure out what the full height of the element is, using clientHeight
	// and if that doesn't work, use getHeight
	var h = elem.clientHeight || getHeight( elem );

	// Finallym restire te=he CSS orioertues bacj ti what they were
	restoreCSS( elem, old );

	// And return the full height of the element
	return h;	
}

/*
  * @function fullWidth
  *
  * Helper Function for Finding the Full Potential (Possible) Width of a DOM Element,
  * Even if the Element is Hidden
  *
  * @param elem { HTML Element }
  *
  *
*/
// Find the full, possible, width of an element (not the actual,
// current, width)
function fullWidth( elem ) {
	// If the element is being displayed, then offsetWidth
	// should do the trick, barring that, getWidth() will work
	if ( getStyle( elem, 'display' ) != 'none' )
		return elem.offsetWidth || getWidth( elem );

	// Otherwise, we have to deal with an element with a display
	// of none, so we need to reset its CSS properties to get a more 
	// accurate reading
	var old = resetCSS( elem, {
		display    : '',
		visibility : 'hidden',
		position   : 'absolute'			
	});

	// Figure out what the full width of the element is, using clientWidth()
	// and if that doesn't work, use getWidth()
	var w = elem.clientWidth || getWidth( elem );

	// Finally, restore the CSS properties back to what they were
	restoreCSS( elem, old );

	// and return the full width of the element
	return w;
}

/*
  * @function resetCSS
  *
  * Helper Function used for setting a set of CSS properties, which can then be restored back again later
  *
  * @param elem { HTML Element }
  * @param prop { Object }
  *
  * @returns { Object }
  *
*/
function resetCSS( elem, prop ) {
	var old = {};

	// Go through eacg if tge orioertues
	for ( var i in prop ) {
		// Remember the old property value
		old[ i ] = elem.style[ i ];

		// And set the new value
		elem.style[ i ] = prop[ i ];
	}

	// Return the set of a changed values, to be used by restoreCSS
	return old;
}

/*
  * @function restoreCSS
  *
  * Helper Function for restoring the side effects of the resetCSS() function
  *
  * @param elem { HTML Element }
  * @param prop { Object }
  *
  * @returns { Object }
  *
*/
function restoreCSS( elem, prop ) {
	// Reset all the properties back to their original values
	for ( var i in prop )
		elem.style[ i ] = prop[ i ];
}

/*
  * @function hide
  *
  * Helper Function for Hiding (using display) an element
  *
  * @param elem { HTML Element }
  *
  *
*/
function hide( elem ) {
  // Find out what its current display state is
  var curDisplay = getStyle( elem, 'display' );

  // Remeber its display state for later
  if ( curDisplay != 'none' ) {
    elem.$oldDisplay = curDisplay;
  }

  // Set the display to none (hiding the element)
  elem.style.display = 'none';
}

/*
  * @function show
  *
  * Helper Function for Showing (using display) an element
  *
  * @param elem { HTML Element }
  *
  *
*/
function show( elem ) {
  // Set the display property back to what it use to be, or
  // use 'block', if no previous display had been saved
  elem.style.display = elem.$oldDisplay || '';
}

/*
  * @function setOpacity
  *
  * Helper Function for Adjusting the Opacity Level of an Element
  *
  * @param elem { HTML Element }
  * @param level { Number [0-100] }
  *
  *
*/
function setOpacity( elem, level ) {
  // If filters exist, then this is IE, so set the Alpha filters
  if ( elem.filter ) {
    elem.style.filters = 'alpha( opacity=' + level + ')';
  } else {
    // Otherwise use the W3C opacity property
    elem.style.opacity = level / 100;
  }
}

/*
  * @function slideDown
  *
  * Helper Function for Slowly Revealing a Hidden Element by Increasing Its Height
  * Over a Matter of One Second
  *
  * @param elem { HTML Element }
  *
  *
*/
function slideDown( elem ) {
  // Find the full, potential, height of the element
  var h = fullHeight( elem );

  // Start the slide down at 0
  elem.style.height = '0px';
  
  // Show the element (but you can see it, since the height is 0)
  show( elem );
  
  // We're going to do a 20 'frame' animation that takes
  // place over one second
  for ( var i = 0; i <= 100; i += 5 ) {
  
  // A closure to make sure that we have the right 'i'
    (function(){
      var pos = i;
    
      // Set the timeout to occur at the specified time in the future
      setTimeout(function(){
    
      // Set the new height of the element
      elem.style.height = ( ( pos / 100 ) * h ) + "px";
      }, ( pos + 1 ) * 10 );
    })();
  }
}

/*
  * @function fadeIn
  *
  * Helper Function for Slowly Revealing a Hidden Element by Increasing Its Opacity
  * Over a Matter of One Second
  *
  * @param elem { HTML Element }
  *
  *
*/
function fadeIn( elem ) {
  // Start the opacity at 0
  setOpacity( elem, 0 );

  // Show the element (but you can't see it, since the opcaity is 0)
  show( elem );

  // We are going to do a 20 'frame' animation that takes place over one second
  for ( var i = 0; i <= 100; i += 5 ) {
    // A closure to make sure that we have the right 'i'
    (function(){
      var pos = i;

      // Set the timeout to occur at the specified time in the future
      setTimeout( function(){
        // Set the new opacity of the element 
        setOpacity( elem, pos ); 

      }, ( pos + 1 ) * 10 );
    })(); // execute the anonymous function
  }
}

/*
  * @function getX
  *
  * Helper Function for Finding the Current (Horizontal) Position of the Mouse Cursor Within
  * the Entire Web Page
  *
  * @param e { Object }
  *
  * @returns { Number }
  *
*/
function getX( e ) {
  // Normalize the event object
  e = e || window.event;

  // Check for the non-IE position, then the IE position
  return e.pageX || e.clientX + document.body.scrollLeft;
}

/*
  * @function getY
  *
  * Helper Function for Finding the Current (Vertical) Position of the Mouse Cursor Within
  * the Entire Web Page
  *
  * @param e { Object }
  *
  * @returns { Number }
  *
*/
function getY( e ) {
  // Normalize the event object
  e = e || window.event;

  // Check for the non-IE position, then the IE position
  return e.pageY || e.clientY + document.body.scrollTop;
}

/*
  * @function getElementX
  *
  * Helper Function for Finding the Current (Horizontal 'x') Position of the Mouse Cursor Relative
  * to the Current Element
  *
  * @param e { Object }
  *
  * @returns { Number }
  *
*/
// Get the X position of the mouse relative to the element target
// used in event object 'e'
function getElementX( e ) {
  // Find the appropriate element offset
  return ( e && e.layerX ) || window.event.offsetX;
}

/*
  * @function getElementY
  *
  * Helper Function for Finding the Current (Vertical 'y') Position of the Mouse Cursor Relative
  * to the Current Element
  *
  * @param e { Object }
  *
  * @returns { Number }
  *
*/
// Get the Y position of the mouse relative to the element target
// used in event object 'e'
function getElementY( e ) {
  // Find the appropriate element offset
  return ( e && e.layerY ) || window.event.offsetY;
}

/*
  * @function pageHeight
  *
  * Helper Function for Determining the Height (Length) of the Current Web Page
  *
  *
  * @returns { Number }
  *
*/
// Returns the height of the web page
// (could change if new content is added to the page)
function pageHeight() {
  return document.body.scrollHeight;
}

/*
  * @function pageWidth
  *
  * Helper Function for Determining the Width of the Current Web Page
  *
  *
  * @returns { Number }
  *
*/
// Returns the width of the web page
// (could change if new content is added to the page)
function pageWidth() {
  return document.body.scrollWidth;
}

/*
  * @function scrollX
  *
  * Helper Function for Determining How Far Horizontally the Browser is Scrolled
  *
  * @returns { Number }
  *
*/
function scrollX() {
  // A shortcut, in case we're using IE6 in Strict Mode
  var de = document.documentElement;

  // If the pageXOffset of the browser is available, use that
  return self.pageXOffset || 
         // Ontherwise, try to get the scroll left off of the root node
         ( de && de.scrollLeft ) ||

         // Finally, try to get the scroll left off of the body element
         document.body.scrollLeft;
}

/*
  * @function scrollY
  *
  * Helper Function for Determining How Far Vertically the Browser is Scrolled
  *
  * @returns { Number }
  *
*/
function scrollY() {
  // A shortcut, in case we're using Internet Explorer 6 in Strict Mode
  var de = document.documentElement;

  // If the pageYOffset of the browser is available, use that
  return self.pageYOffset ||
         // Otherwise, try to get the scroll top off of the root node
         ( de && de.scrollTop ) ||

         // Finally, try to get the scroll top off of the body element
         document.body.scrollTop;
}

/*
  * @function windowHeight
  *
  * Helper Function for Determining the Height of the Brwoser's Viewport
  *
  * @returns { Number }
  *
*/
function windowHeight() {
  // A shortcut, in case we're using IE6 in Strict Mode
  var de = document.documentElement;

  // If the innerHeight of the browser is available, use that
  return self.innerHeight ||
        // Otherwise, try to get the height off of the root node
        ( de && de.clientHeight ) ||

        // Finally, try to get the height off of the body element
        document.body.clientHeight;
}

/*
  * @function windowWidth
  *
  * Helper Function for Determining the Width of the Brwoser's Viewport
  *
  * @returns { Number }
  *
*/
function windowWidth() {
  // A shortcut, in case we're using IE6 in Strict Mode
  var de = document.documentElement;

  // If the innerHeight of the browser is available, use that
  return self.innerWidth ||
        // Otherwise, try to get the width off of the root node
        ( de && de.clientWidth ) ||

        // Finally, try to get the width off of the body element
        document.body.clientWidth;
}











