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

/*
  * @function validateForm
  *
  * Functions for Performing Form Validation and Triggering the Display of Error Messages
  *
  * @param form { HTML Element }
  * @param load { Boolean }
  *
*/
// A function for validating all fields within a form.
// The form argument should be a reference to a form element
// The load argument should be a boolean referring to the fact that 
// the validation function is being run on page load, versus dynamically 
function validateForm( form, load ) {
	var valid = true;true

	// Go through all the field elements in form
	// form.elements is an array of all fields in a form
	for ( var i = 0; i < form.elements.length; i++ ) {

		// Hide any error message, if they are being shown
		hideErrors( form.elements[ i ] );

		// Check to see if the field contains valid contents, or not
		if ( ! validateField( form.elements[ i ], load ) ) {
			valid = false;
		}
	}

	// Return false if a field does not have valid contents
	// true if all fields are valid
	return valid;
}

// Validate a single field's contents
function validateField( elem, load ) {
	var errors = [];

	// Go through all the possible validation techniques
	for ( var name in errMsg ) {
		// See if the field has the class specified by the error type
		var re = new RegExp( "(^|\\s)" + name + "(\\s|$)" );

		// Check to see if the element has the class and that it passes the validation test
		if ( re.test( elem.className ) && !errMsg[ name ].test( elem, load ) ) {
			// if it fails the validation, add the error message to list
			errors.push( errMsg[ name ].msg );
		}
	}

	// Show the error messages, if they exist
	if ( errors.length ) {
		showErrors( elem, errors );
	}

	// Return false if the field fails any of the validation routines
	return errors.length > 0;
}

// Hide any validation error messages that are currently shown
function hideErrors( elem ) {
	// Find the next element after the current field
	var next = elem.nextSibling;

	// If the next element is a ul and has a class of errors
	if ( next && next.nodeName == 'UL' && next.className == 'errors' ) {
		// Remove it (which is our means of hiding)
		elem.parentNode.removeChild( next );
	}
}

// Show a set of errors messages for a specific field within a form
function showErrors( elem, errors ) {
	// Find the next element after the field
	var next = elem.nextSibling;

	// If the field isn't one of our special error-holders
	if ( next && ( next.nodeName != 'UL' || next.className != 'errors' ) ) {
		// We need to make one instead
		next = document.createElement( 'ul' );
		next.className = 'errors';

		// and then insert into the correct place in the DOM
		elem.parentNode.insertBefore( next, elem.nextSibling );
	}

	// Now that we have a reference to the rror holder UL
	// We then loop through all the error messages
	for ( var i = 0; i < errors.length; i++ ) {
		// Create a new li wrapper for each
		var li = document.createElement( 'li' );
		li.innerHTML = errors[ i ];

		// And insert into DOM
		next.appendChild( li );
	}
}

// Waiting Until a Form is Submitted to Run the Form Validation Function
function watchForm( form ) {
	addEvent( form, 'submit', function() {
		// make sure that the form's contents validate correctly
		return validateForm( form );
	});
}

// Watching Fields for a Change Before Running Any Field Validation Functions
function watchFields( form ) {
	// Go through all the field elements in form
	for ( var i = 0; i < form.elements.length; i++ ) {
		// and attach a 'change' event handler (which watches for a user
		// to lose focus of an input element)
		addEvent( form.elements[ i ], 'change', function(){
			// Once the focus has been lost, re-validate the field
			return validateField( this );
		} );
	}
}