/** 
 * @function tag
 * 
 * A Function for Locating Elements by Tag Name Within an HTML DOM Document
 *
 * @param name   {Element}   element, default `document`
 * @param elem   {String}    tag name
 *
 * @returns          {Array}     Elements collection
**/

function tag( name, elem ) {
	// If the context element is not provided, search the whole document
	return ( elem || document ).getElementsByTagName( name );
}

/** 
 * @function hasAttribute
 * 
 * Determining Whether an Element Has a Certain Attribute
 *
 * @param elem   {Element}   element, default `document`
 * @param name   {String}    class name
 *
 * @returns          {Boolean}     true/false
**/
function hasAttribute ( elem, name ) {
	return elem.getAttribute( name ) !== null;
}

/** 
 * @function attr
 * 
 * Getting and Setting the Values of Element Attributes
 *
 * @param elem   {Element}   element
 * @param name   {String}    attribute name
 * @param value  {String}    attribute value
 *
 * @returns          {Boolean}     true/false
**/
function attr( elem, name, value ) {
	// Make sure that a valid name was provided
	if ( !name || name.constructor != String ) return '';

	// Figure out if the name is one of the weird naming cases
	name = {
		'for'   : 'htmlFor',
		'class' : 'className'
	}[ name ] || name;

	// If the user is setting a value, also
	if ( typeof value != 'undefined' ) {
		// Set the quick way first
		elem[ name ] = value;

		// If we can, use setAttribute()
		if ( elem.setAttribute ) {
			elem.setAttribute( name, value );
		}
	}

	// Return the value of the attribute
	return elem[ name ] || elem.getAttribute( name ) || '';
}
/** 
 * @function cleanWhitespace
 * 
 * A Workaround for the White-Space Bug in XML Documents
 *
 * @param element   {Element}   element, default `document`
 *
**/
function cleanWhitespace( element ) {
	// If no element is provided, do the whole HTML document
	element = element || document;

	// Use the first child as a starting point
	var cur = element.firstChild;

	// Go unitl there are no more child nodes
	while ( cur !== null ) {

		// If the node is a text node, and it contains nothing but whitespace
		if( cur.nodeType == 3 && ! /\S/.test( cur.nodeValue ) ) {
			// Remove the text node
			element.removeChild( cur );

			// Otherwise, if it's an element
		} else if ( cur.nodeType == 1 ) {
			// Recurse down through the document
			cleanWhitespace( cur );
		}

		cur = cur.nextSibling; // Move through the child nodes
	}
}

/** 
 * @function prev
 * 
 * A Function for Finding the Previous Sibling Element in Relation to an Element
 *
 * @param elem   {Element}   HTML element
 *
**/
function prev( elem ) {
	do {
		elem = elem.previousSibling;
	} while ( elem && elem.nodeType != 1 );
	return elem;
}

/** 
 * @function prev
 * 
 * A Function for Finding the Next Sibling Element in Relation to an Element
 *
 * @param elem   {Element}   HTML element
 *
**/
function next( elem ) {
	do {
		elem = elem.nextSibling;
	} while ( elem && elem.nodeType != 1 );
	return elem;
}

/** 
 * @function first
 * 
 * A Function for Finding the First Child Element of an Element
 *
 * @param elem   {Element}   HTML element
 *
**/
function first( elem ) {
	elem = elem.firstChild;
	return elem && elem.nodeType != 1 ? next( elem ) : elem;
}

/** 
 * @function last
 * 
 * A Function for Finding the Last Child Element of an Element
 *
 * @param elem   {Element}   HTML element
 *
**/
function last( elem ) {
	elem = elem.lastChild;
	return elem && elem.nodeType != 1 ? prev( elem ) : elem;
}

/** 
 * @function parent
 * 
 * A Function for Finding the the Parent of an Element
 *
 * @param elem   {Element}   HTML element
 *
**/
function parent( elem, num ) {
	num = num || 1;
	for ( var i = 0; i < num; i += 1 ) {
		if ( elem !== null ) {
			elem = elem.parentNode;
		}
	}
	return elem;
}

/** 
 * @function hasClass
 * 
 * A Function That Searches fo All Elements That Have a Particular Class Name
 *
 * @param name   {String}   class name
 * @param type   {Element}   HTML element
 *
**/
function hasClass( name, type ) {
	var r = [];

	// Locate the class name (allows for multiple class names)		
	var re = new RegExp( '(^|\\s)' + name + '(\\s|$)' );

	// Limit search by type, or look through all elements
	var e = document.getElementsByTagName( type || '*' );

	for( var j = 0; j < e.length; j++ ) {
		// If the element has the class, add it to return
		var str = e[ j ].getAttribute( 'class' );
		if( re.test( str ) ) {
			r.push( e[ j ] );
		}
	}
	return r;
}

/** 
 * @function text
 * 
 * A Generic Function for Treiving the Text Contents of an Element
 *
 * @param element   {Element}   HTML element
 *
**/
function text( element ) {
	var txt = '';

	// If an element was passed, get its children,
	// otherwise assume it's an array
	element = element.childNodes || element;

	// Look through all child nodes
	for ( var j = 0; j < element.length; j++ ) {
		// If it's not an element, append its text value
		// Otherwise, recurse through all the element's children
		txt += element[ j ].nodeType != 1 ? element[ j ].nodeValue : text( element[ j ].childNodes );
	}

	// Return the matched text
	return txt;
}

/** 
 * @function create
 * 
 * A Generic Function for Creating a New DOM Element
 *
 * @param elem 	{Element}	HTML element
 *
 * @returns		{Element}	HTML Element
**/
function create( elem ) {

	//return document.createElementNS ? document.createElementNS( 'http://www.w3.org/1999/xhtml', elem ) : document.createElement( elem );

	if ( document.createElementNS ) {
		return document.createElementNS( 'http://www.w3.org/1999/xhtml', elem );
	}
	return document.createElement( elem );
}
