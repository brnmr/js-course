/*
  * @function checkRequired
  *
  * Helper Function for Checking to see if an input element has had information entered
  *
  * @param elem { HTML Element }
  *
*/
function checkRequired ( elem ) {
	if ( elem.type == 'checkbox' || elem.type == 'radio' ) {
		return getInputsByName( elem.name ).numChecked;
	} else {
		return elem.value.length > 0 && elem.value != elem.defaultValue;
	}
}

/*
  * @function checkRequired
  *
  * Helper Function for Finding All Input Elements that Have a Specified Name
  * (good for finding and dealing with checkboxes or radio buttons)
  *
  * @param name { String }
  *
*/
function getInputsByName( name ) {
	// The array of input elements that will be matched
	var results = [];

	// Keep track of how many of them were checked
	results.numChecked = 0;

	// Find all the input elements in the document
	var input = document.getElementsByTagName( 'input' );
	for ( var i = 0; i < input.length; i++ ) {
		// Find all the fields that have the specified name
		if ( input[ i ].name == name ) {
			results.push( input[ i ] );

			// Remember how many if the fields were checked
			if ( input[ i ].checked ) {
				results.numChecked++;
			}
		}
	}

	// Return the set of matched fields
	return results;
}

/*
  * @function checkEmail
  *
  * Checking Whether a Specific Input Element Has an E-mail Address in It
  *
  * @param elem { HTML Element }
  *
*/
function checkEmail( elem ) {
	// Make sure that something was entered and that it looks like a valid email
	return elem.value == '' || /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test( elem.value );
}

/*
  * @function checkURL
  *
  * Checking Whether an Input Element Has a URL in It
  *
  * @param elem { HTML Element }
  *
*/
function checkURL( elem ) {
	// Make sure some text was entered, and it's not default http:// text
	return elem.value == '' || !elem.value == 'http://' ||
		// Make sure that it looks like a valid URL
		/^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/.test( elem.value );
}

/*
  * @function checkURL
  *
  * Checking Whether a Field Contains a Phone Number
  *
  * @param elem { HTML Element }
  *
*/
function checkPhone( elem ) {
	// Check to see if we have something that looks like a valid number
	var m = /(\d{3}).*(\d{3}).*(\d{4})/.exec( elem.value );

	// If it is, seemingly, valid - force it into the specific
	// format that we desire: (123) 456-7890
	if ( m !== null ) {
		elem.value = '(' + m[ 1 ] + ') ' + m[ 2 ] + '-' + m[ 3 ]; 
	}
	return elem.value == '' || m !== null;
}

/*
  * @function checkDate
  *
  * Checking Whether a Field Has a Date in It
  *
  * @param elem { HTML Element }
  *
*/
function checkDate( elem ) {
	// Make sure that sth is entered, and that it looks like
	// a valid MM/DD/YYYY date
	return !elem.value || /^\d{2}\/\d{2}\/\d{2,4}$/.test(elem.value);
}